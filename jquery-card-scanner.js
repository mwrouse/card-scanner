/* 
 * JQuery Card Scanner 
 * 
 * Author: Michael Rouse
 *   Date: 2016
 * 
 *    URL: http://github.com/mwrouse/card-scanner
 *
 */
(function($){
	$.fn.cardscanner = function(options, callback){
		// Set Default Options
		if (options === undefined){ options = {prefix: '', suffix: '', redirect: ''}; }
		if (options['prefix'] === undefined) { options['prefix'] = ''; }
		if (options['suffix'] === undefined) { options['suffix'] = ''; }
		
		// Default callback function if needed
		if (callback === undefined) { callback = function(value){ console.log('Read data from card: ' + value); }; }
		
		// Array with all the variables this function needs
		var data = {
						recording: false,
				
						prefix: options['prefix'], 
						suffix: options['suffix'],

						read_string: '',
						read_prefix: '',
						read_suffix: ''
					};
		
		// Keypress event
		$(this).keypress(function(event){
			var char_val = String.fromCharCode(event.which);
			
			// If the script is recording the keystrokes, save them in data['read_string']
			if (data.recording)
			{
				// Watch for the suffix
				if ((data.suffix).charAt((data.read_suffix).length) == char_val)
				{
					// Record the possible suffix
					data.read_suffix += char_val;
					
					// Check to see if the suffix was completed 
					if (data.read_suffix == data.suffix)
					{
						// Suffix has been completed								
						// Call the callback function
						callback(data.read_string);
						
						// Reset
						data.recording = false;
						data.read_string = '';
						data.read_prefix = '';
						data.read_suffix = '';
					}
				}
				else 
				{
					// Suffix was not correct, add the attempted suffix to the read string (and the newest typed character) and then erase it
					data.read_string += data.read_suffix + char_val;								
					data.read_suffix = '';
				}
			}
			else 
			{
				// Not recording, check for the prefix
				// Count strings for the prefix, detect when the prefix has been completed
				if ((data.prefix).charAt((data.read_prefix).length) == char_val)
				{ 
					data.read_prefix += char_val; 
					
					// Start recording if the prefix has been completed
					data.recording = (data.read_prefix == data.prefix);
				}
			}
			
		}); // End keypress
	};
})(jQuery);