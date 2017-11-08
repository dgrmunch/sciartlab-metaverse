/*

 "*------------------------------------------------------------------------------*"
 "|                                                                              |"
 "|   ███████╗ ██████╗██╗ █████╗ ██████╗ ████████╗    ██╗      █████╗ ██████╗    |"
 "|   ██╔════╝██╔════╝██║██╔══██╗██╔══██╗╚══██╔══╝    ██║     ██╔══██╗██╔══██╗   |"
 "|   ███████╗██║     ██║███████║██████╔╝   ██║       ██║     ███████║██████╔╝   |"
 "|   ╚════██║██║     ██║██╔══██║██╔══██╗   ██║       ██║     ██╔══██║██╔══██╗   |"
 "|   ███████║╚██████╗██║██║  ██║██║  ██║   ██║       ███████╗██║  ██║██████╔╝   |"
 "|   ╚══════╝ ╚═════╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚══════╝╚═╝  ╚═╝╚═════╝    |"
 "|                                                                              |"
 "|                      SciartLab Music VR Components                           |"
 "|                                                                              |"
 "|                    **********  VR Experiments *******                        |"
 "|                    xmunch components (xm) for a-frame                        |"
 "|                                                                              |"
 "|                     Twitter:  @dgrmunch  | @sciartlab                        |"
 "|                     Website:  http://www.sciartlab.com]                      |"
 "|                                                                              |"
 "*------------------------------------------------------------------------------*"

* Description: It requires a-frame and sciart-aframe-components

*/

//MAPPINGS FOR KEYBOARD 

var KEYBOARD_1 = 49;
var KEYBOARD_2 = 50;
var KEYBOARD_3 = 51;
var KEYBOARD_4 = 52;
var KEYBOARD_5 = 53;
var KEYBOARD_6 = 54;
var KEYBOARD_7 = 55;
var KEYBOARD_8 = 56;
var KEYBOARD_9 = 57;
var KEYBOARD_0 = 48;
var KEYBOARD_q = 81;
var KEYBOARD_w = 87;
var KEYBOARD_e = 69;
var KEYBOARD_r = 82;
var KEYBOARD_t = 84;
var KEYBOARD_y = 89;
var KEYBOARD_u = 85;
var KEYBOARD_i = 73;


/* MAPPINGS FOR MAKEY MAKEY

These mappings only will work if the device is reprogrammed with Arduino software 
adding the following map to the file settings.h 

int keyCodes[NUM_INPUTS] = {
  '1',  // 49
  '2',  // 50
  '3',  // 51
  '4',  // 52
  '5',  // 53
  '6',  // 54
  '7',  // 55
  '8',  // 56
  '9',  // 57
  '0',  // 48 
  'q',  // 81
  'w',  // 87
  'e',  // 69
  'r',  // 82
  't',  // 84
  'y',  // 89
  'u',  // 85
  'i'   // 73
  }

*/

 var MAKEY_0 = 54; //Click mapping
 var MAKEY_1 = 55;
 var MAKEY_2 = 56;
 var MAKEY_3 = 57;
 var MAKEY_4 = 48;
 var MAKEY_5 = 81;
 var MAKEY_6 = 87;
 var MAKEY_7 = 49;
 var MAKEY_8 = 53;
 var MAKEY_9 = 51;
 var MAKEY_10 = 50;
 var MAKEY_11 = 52;
 var MAKEY_12 = 69;
 var MAKEY_13 = 82;
 var MAKEY_14 = 84;
 var MAKEY_15 = 89;
 var MAKEY_16 = 85;
 var MAKEY_17 = 73;

 var map = {};

  //KEY LISTENERS  
  document.onkeydown = function(e) {  
    if(map[e.keyCode] != undefined)
        document.querySelector('#'+map[e.keyCode]).emit('started');
  }

  document.onkeyup = function(e) {  
      if(map[e.keyCode] != undefined)
        document.querySelector('#'+map[e.keyCode]).emit('stopped');
  }


  AFRAME.registerComponent('oscillator', {
    schema: {
      position: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
      scale: {type: 'vec3', default: {x: 0.2, y: 0.2, z: 0.2}},
      type: {type: 'string', default: 'sine'},
      freq: {type: 'number', default: 200},
      color: {type: 'color', default: 'lightgreen'}
    },
    init: function () {
      
      //Add actions
      let start = function (gain, entity) {
        entity.setAttribute('status','on');
        gain.gain.value = 1;
      };
    
      let stop = function (gain, entity){
        entity.setAttribute('status','off');
        gain.gain.value = 0;
      };
      
      
      this.el.setAttribute('status',  'off');
      this.el.setAttribute('color',  this.data.color);
      
      //Add geometry
      switch(this.data.type){
        case 'sawtooth' : this.oscEl = document.createElement('a-torus'); break;
        case 'sine' : this.oscEl = document.createElement('a-octahedron'); break;
        case 'square' : this.oscEl = document.createElement('a-box'); break;
        case 'triangle' : this.oscEl = document.createElement('a-tetrahedron'); break;

      }


    this.oscEl.setAttribute('position', this.data.position);
      this.oscEl.setAttribute('color', this.data.color);
      this.oscEl.setAttribute('opacity', '0.2');
      this.oscEl.setAttribute('class', 'box');
      this.oscEl.setAttribute('scale',  this.data.scale);
      this.el.appendChild(this.oscEl); 
      
      //Add audio gain
      let gain = window.audioContext.createGain();
      gain.gain.value = 0;
      gain.connect(window.audioContext.destination);
   
      //Add audio oscillator
      let oscillator = window.audioContext.createOscillator();
      oscillator.type = this.data.type;
      oscillator.frequency.value = this.data.freq;
      oscillator.start();
      oscillator.connect(gain);
        
      //Add listeners
      this.el.addEventListener('click', function(){
        if(this.getAttribute('status') == 'off')
          this.emit('started');
        else 
          this.emit('stopped');
      }); 
      
      this.el.addEventListener('started', function(){
        start(gain, this);
        let geometry = this.getChildren()[this.getChildren().length-1];
        //geometry.setAttribute('color', this.getAttribute('color'));
        geometry.setAttribute('opacity', '1.0');
      }); 
      
      this.el.addEventListener('stopped', function(){
        stop(gain, this);
        let geometry = this.getChildren()[this.getChildren().length-1];
        geometry.setAttribute('opacity', '0.2');
      }); 
      
    } 
  });

AFRAME.registerPrimitive('a-oscillator', {
  defaultComponents: {
    oscillator: {
    }
  },
  mappings: {
    position: 'oscillator.position',
    scale: 'oscillator.scale',
    type: 'oscillator.type',
    color: 'oscillator.color',
    freq: 'oscillator.freq'
  }
});



console.log('SciartLab Music VR Components loaded. More info: http://www.sciartlab.com | @dgrmunch');


//VENDOR: External code included in our package for compatibility issues
    
// Fix iOS Audio Context by Blake Kus https://gist.github.com/kus/3f01d60569eeadefe3a1
// MIT license
(function() {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	if (window.AudioContext) {
		window.audioContext = new window.AudioContext();
	}
	var fixAudioContext = function (e) {
		if (window.audioContext) {
			// Create empty buffer
			var buffer = window.audioContext.createBuffer(1, 1, 22050);
			var source = window.audioContext.createBufferSource();
			source.buffer = buffer;
			// Connect to output (speakers)
			source.connect(window.audioContext.destination);
			// Play sound
			if (source.start) {
				source.start(0);
			} else if (source.play) {
				source.play(0);
			} else if (source.noteOn) {
				source.noteOn(0);
			}
		}
		// Remove events
		document.removeEventListener('touchstart', fixAudioContext);
		document.removeEventListener('touchend', fixAudioContext);
	};
	// iOS 6-8
	document.addEventListener('touchstart', fixAudioContext);
	// iOS 9
	document.addEventListener('touchend', fixAudioContext);
})();
    
