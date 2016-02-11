jQuery Card Scanner 
====================

This is a simple script that allows your website to use a card scanner or an rfid reader to read the data from cards and perform an action on that data.

There are no advanced features so you don't have to worry about over complicating things, simply tell the script what will proceed the card data (prefix) and come after the card data (suffix), and then what you want to do once card data has been read.


#Usage
Make sure to include jQuery and jquery-card-scanner.js into your website.

```javascript
$(function(){
	$(document).cardscanner({
								prefix: ';',
								suffix: '2?'
							},
							function(value){
								console.log('The data read from the card scanner was: ' + value);
							}
						   );
});
```

Or, as something like this: 
```javascript
$(function(){
	var options = { prefix: ';', suffix: '2?' };
	$(document).cardscanner(options, callback_function);
});

function callback_function(card_data)
{
	console.log('The data on the card is: ' + card_data);
}
```

Just be sure to tell define the prefix, suffix, and callback function.

If no suffix is defined, the Enter key will be the suffix.