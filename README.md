jQuery Card Scanner 
====================

This is a simple script that allows your website to use a card scanner or an rfid reader to read the data from cards and perform an action on that data.

There are no advanced features so you don't have to worry about over complicating things, simply tell the script what will proceed the card data (prefix) and come after the card data (suffix), and then what you want to do once card data has been read.


#Usage
```javvascript
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