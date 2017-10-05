# Google Address Autocomplete
> A library that attaches Google address autocomplete to a text input.

## Dependencies
- [Google Places Library](https://maps.googleapis.com/maps/api/js?key=YOU_GOOGLE_API_KEY_GOES_HERE&libraries=places)
## Installation
```bash
npm install google-address-autocomplete
```

## Usage
Once you have it installed, you can then use it in your JS files like so:

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <label for="my-input-id-or-class-name">Enter the first address here</label>
  <!-- Here we are giving our input and ID so we can tell autocomplete where to work -->
  <input type="text" id="my-input-id-or-class-name" name="my-input-id-or-class-name" />

  <!-- This is the one external dependency that is needed in order to make this package work -->
  <script src="https://maps.googleapis.com/maps/api/js?key=YOU_GOOGLE_API_KEY_GOES_HERE&libraries=places"></script>
  <script src="js/your-compiled-script-here.js"></script>
</body>
</html>
```

```JavaScript
import AddressAutocomplete from 'google-address-autocomplete';

// Use a callback here to get the results
new AddressAutocomplete('#my-input-id-or-class-name', results => {
  const addressObject = results;

  // This is what the results object looks like
  results = {
    cityName: "Birmingham",
    country: "United States",
    countryAbbr: "US",
    formattedAddress: "123 Shades Crest Rd, Birmingham, AL 35226, USA",
    state: "Alabama",
    stateAbbr: "AL",
    streetName: "Shades Crest Road",
    streetNumber: "123",
    zipCode: "35226",
  };
});
```

## Contributing
See [the contributing guide](./CONTRIBUTING.ms)

## Issues
If you find an issue, submit it and let's fix it!