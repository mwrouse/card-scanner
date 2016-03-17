# JavaScript Card Scanner
This library allows you to use hardware card scanners that simulate keyboard input on your websites.

There are no advanced features, so you don't have to worry about over complicating things.

## Usage
To get started, you need to know how your card scanner returns data, as in what is the suffix and prefix that it puts around the data read from the card.

This information is important, if you're not sure, try running a sample card with a notepad window open, or read the documentation for your specific card reader.

Once you know this, you can initialize the card scanner monitor script this way:
```javascript
window.CardScannerMonitor({prefix: 'your-prefix-here', suffix: 'your-suffix-here'}, function(data){
	// Perform what you need to with the data here
	console.log(data);
});
```
The function takes two parameters, the first one is an object with the prefix and suffix as elements of the object.

If no suffix is defined, then the Enter key will be used as a suffix.

The second is a function, this function gets performed when the script has read the suffix (all data has been entered). This function should have one parameter, which represents the data read from the card, without the suffix and prefix attached.

## Example
[View a CodePen Example](http://codepen.io/mwrouse/full/eZdWzE)

Use 'abc' as your prefix, and ';' as your suffix on the demo.

## License
Distributed under the [MIT License](https://raw.githubusercontent.com/mwrouse/card-scanner/master/LICENSE).
