/**
 * =====================================
 *             Card Scanner
 * =====================================
 *
 * Author.......: Michael Rouse
 * Language.....: JavaScript
 * Date.........: March 2016
 *
 * Description..: Monitors a webpage for input from a card scanner, or other similar hardware that
 *                emulates keyboard input
 */
(function(){
  var CardScannerMonitor = function(options, callback){
    // Do not break the window scope
    if (this === window)
    {
      return new CardScannerMonitor(options, callback);
    }

    // Set default options
    options = (options !== undefined) ? options : {prefix: '', suffix: ''};
    options['prefix'] = (options['prefix'] !== undefined) ? options['prefix'] : '';
    options['suffix'] = (options['suffix'] !== undefined) ? options['suffix'] : '';

    // Default callback function
    callback = (callback !== undefined) ? callback : function(value) { console.log('Read data from card: ' + value);};

    if (typeof callback !== 'function')
    {
      console.log('Callback must be a function!');
      return;
    }

    // Array for recording information, and remembering what state the function is in
    var data = {
      recording:    false,
      calling_back: false,

      prefix:       options['prefix'],
      suffix:       options['suffix'],

      read_string:  '',
      read_prefix:  '',
      read_suffix:  ''
    };

    // Preserve 'this'
    var me = this;

    /**
     * Function.....: Keypress
     * Author.......: Michael Rouse
     * Parameters...: event - the keypress event
     * Description..: The State Machine that records keypresses and watches for the preffix, suffix,
     *                etc.
     */
    this.keypress = function(event){
      // Get a readable character from the keypress
      var char_value = String.fromCharCode(event.which);

      // If the script is recording keystrokes, save them to data.read_string
      if (data.recording)
      {
        // Watch for the suffix
        if (data.suffix != '' && (data.suffix).charAt((data.read_suffix).length) == char_value)
        {
          // Recording possible suffix
          data.read_suffix += char_value;

          // Check to see if the suffix has been completed
          data.calling_back = (data.read_suffix == data.suffix); // True if suffix is completed
          data.recording = !(data.calling_back); // False if calling_back is true
        }
        else
        {
          // Allows enter to work as suffix if no suffix is entered
          data.calling_back = (data.suffix == '' && event.which == 13);

          // Entered key was not part of suffix, add it to running string
          data.read_string += data.read_suffix + ((event.which != 13) ? char_value : ''); // Do not put in the enter key
          data.read_suffix = '';
        }
      }
      else
      {
        // Not recording yet, watch for prefix to be entered
        if ((data.prefix).charAt((data.read_prefix).length) == char_value)
        {
          // Entered key was apart of the prefix, record it
          data.read_prefix += char_value;

          // Start recording if prefix is complete
          data.recording = (data.read_prefix == data.prefix);
        }
      }

      // Perform calling back function if needed
      if (data.calling_back)
      {
        // Call the function
        callback(data.read_string);

        // Reset stuff
        data.recording = data.calling_back = false;
        data.read_string = data.read_prefix = data.read_suffix = '';
      }

    }; // End this.keypress


    // Add keypress event to the page
    window.addEventListener('keypress', function(e){
      me.keypress(e);
    });

    return this;
  };

  // Initialize the card scanner function
  if (!window.CardScannerMonitor)
  {
    window.CardScannerMonitor = CardScannerMonitor;
  }
}());
