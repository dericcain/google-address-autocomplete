export default class AddressAutocomplete {
  constructor(element, callback) {
    this.element = document.querySelector(element);

    if (!this.element) {
      throw new Error(
        `The element you specified is not a valid element. You should attach an input using a class '.some-class' or an ID '#some-id'.`
      );
    }

    this.callback = callback;
    this.extractAddress = this.extractAddress.bind(this);
    this.getUsersLocation = this.getUsersLocation.bind(this);
    this.handle();
  }

  // When the document is ready, we need to fire everything off.
  handle() {
    document.onreadystatechange = () => {
      this.init();
      this.element.addEventListener('focus', this.getUsersLocation);
    };
  }

  init(element) {
    this.autocomplete = new google.maps.places.Autocomplete(this.element, {
      types: ['geocode'],
    });
    this.autocomplete.addListener('place_changed', this.extractAddress);
  }

  extractAddress() {
    const componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name',
    };

    const {
      address_components,
      formatted_address,
    } = this.autocomplete.getPlace();
    const addressObject = {
      streetNumber: '',
      streetName: '',
      cityName: '',
      stateAbbr: '',
      zipCode: '',
    };

    for (let i = 0; i < address_components.length; i++) {
      const addressType = address_components[i].types[0];
      if (componentForm[addressType]) {
        switch (addressType) {
          case 'street_number':
            addressObject.streetNumber = address_components[i].long_name;
            break;
          case 'route':
            addressObject.streetName = address_components[i].long_name;
            break;
          case 'locality':
            addressObject.cityName = address_components[i].long_name;
            break;
          case 'administrative_area_level_1':
            addressObject.stateAbbr = address_components[i].short_name;
            addressObject.state = address_components[i].long_name;
            break;
          case 'postal_code':
            addressObject.zipCode = address_components[i].long_name;
            break;
          case 'country':
            addressObject.countryAbbr = address_components[i].short_name;
            addressObject.country = address_components[i].long_name;
            break;
          default:
            break;
        }
      }
    }

    const result = Object.assign({}, addressObject, {formattedAddress: formatted_address});

    this.callback && this.callback(result);
  }

  getUsersLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy,
        });
        this.autocomplete.setBounds(circle.getBounds());
      });
    }
  }
}
