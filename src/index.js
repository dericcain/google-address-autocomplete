/**
 * @export
 * @class AddressAutocomplete
 * @author Deric Cain <deric.cain@gmail.com>
 */
export default class AddressAutocomplete {
  /**
   * Creates an instance of AddressAutocomplete.
   * @param {string} element - This should be in the form of either '.address' or '#address'
   * @param {function} callback - This callback will have the result passed as the first param
   * @throws Error - If we don't have a valid element
   * @memberof AddressAutocomplete
   */
  constructor(element, callback) {
    // Can take element as '.class-name' or '#id-name'
    this.element = document.querySelector(element);

    // If we do not find the element, then we need to throw an error
    if (!this.element) {
      throw new Error(
        "The element you specified is not a valid element. You should attach an input using a class '.some-class' or an ID '#some-id'."
      );
    }

    this.callback = callback;

    // We are binding the context of 'this' to this class instance
    this.extractAddress = this.extractAddress.bind(this);
    this.getUsersLocation = this.getUsersLocation.bind(this);
    this.handle();
  }

  /**
   * This takes care of make everything happen
   *
   * @memberof AddressAutocomplete
   */
  handle() {
    // When the document is ready, we need to fire everything off.
    document.addEventListener('readystatechange', () => {
      this.initializeAutocomplete();
      this.element.addEventListener('focus', this.getUsersLocation);
    });
  }

  /**
   * This method takes care of getting the autocomplete up and running
   *
   * @memberof AddressAutocomplete
   */
  initializeAutocomplete() {
    this.autocomplete = new google.maps.places.Autocomplete(this.element, {
      types: ['geocode'],
    });
    this.autocomplete.addListener('place_changed', this.extractAddress);
  }

  /**
   * Here, we are taking care of getting the address from the results.
   *
   * @memberof AddressAutocomplete
   */
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

    // Need to loop over the results and create a friendly object
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

    const result = Object.assign({}, addressObject, {
      formattedAddress: formatted_address,
    });

    // This is where we check for the callback and then call it, passing our resutls
    this.callback(result);
  }

  /**
   * This will help us narrow down the results of the autocomplete to a user's location
   *
   * @memberof AddressAutocomplete
   */
  getUsersLocation() {
    // Using feature detection to make sure the browser supports geolocation
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
