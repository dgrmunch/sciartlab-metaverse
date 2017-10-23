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
 "|                      SciartLab Metaverse Components                          |"
 "|                                                                              |"
 "|                    **********  VR Experiments *******                        |"
 "|                    xmunch components (xm) for a-frame                        |"
 "|                                                                              |"
 "|                     Twitter:  @dgrmunch  | @sciartlab                        |"
 "|                     Website:  http://www.sciartlab.com]                      |"
 "|                                                                              |"
 "*------------------------------------------------------------------------------*"

* Description: It requires a-frame and sciart-lab-vr-basic.js

*/

  
AFRAME.registerComponent('xm-json-to-menu', {
    schema: {
      id: {type: 'string'},
      url: {type: 'string'},
      x: {type: 'number'},
      y: {type: 'number'},
      z: {type: 'number'}

    },
    init: function () {

      var params = [this.data.id, this.data.x, this.data.y, this.data.z];

      //Load the JSON with the information of the new entities
      httpGet(document.querySelector(this.data.url).getAttribute('src'),processJson,params);

    }
  });

  
AFRAME.registerComponent('xm-content-from-file', {
    schema: {
      url: {type: 'string'}
    },
    init: function () {
      //Load the scene content from a plain text file
      httpGet(document.querySelector(this.data.url).getAttribute('src'),processSceneContent,"#"+this.el.id);

    }
  });




console.log('SciartLab Metaverse Components loaded. More info: http://www.sciartlab.com | @dgrmunch');