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

* Description: Basic JS Library to develop the SciArtLab Metaverse components.

*/


// FUNCTIONS AND UTILS 

//This function will load an a-scene HTML content and will add it
//to the specified entity
function processSceneContent(html, selector){
  var child = document.createElement('a-entity');
  child.innerHTML = html;
  document.querySelector(selector).appendChild(child);

}

//This will be used as a callback function after calling a REST API in the xm-
function processJson(json, params){

  var obj = JSON.parse(json);
  var menu_name = params[0];
  var x = params[1];
  var y = params[2];
  var z = params[3];

  //We select the scene to append the new entities
  var sceneEl = document.querySelector('a-scene');

  //We create a reference entity with absolute coordinates
  var refEl = document.createElement('a-entity');
  refEl.setAttribute('position',  {y: y, x: x, z: z});
  refEl.setAttribute('id', menu_name+'_refEl');

  //Append the reference entity to the scene
  sceneEl.appendChild(refEl);

  //We will load the research lines of the SciArt Lab create the menu elements    
  for(var i = 0; i< obj.elements.length; i++){

    //We create a container for the entity and the associated elements (texts, lights, info, etc...)
    var entityContainerEl = document.createElement('a-entity');
    entityContainerEl.setAttribute('id', menu_name+'_elementContainer_'+i);

    //The position in the 3D space will be relative to the refEl
    entityContainerEl.setAttribute('position',  {y: 0, x: (i * 3) + 5, z: 0});

    //We create one entity for each research line
    var entityEl = document.createElement('a-entity');
    entityEl.setAttribute('id', menu_name+'_element_'+i);

    //These entities will be cubes (boxes)
    entityEl.setAttribute('geometry', {
            primitive: 'box',
            height: 1,
            width: 1
          });

    //The texture of each box will be the image_url specified in the JSON
    //IMPORTANT: Due to the CORS policy use resources URLs with HTTPS
    entityEl.setAttribute('material', {src: obj.elements[i].image_url});

    //The position in the 3D space will be relative to the entityContainer
    entityEl.setAttribute('position',  {y: 0, x: 0, z: 0});

    //In case there is a url we attach the href and the onclick event to open
    //the link when the user is looking to the entity
    if(obj.elements[i].url != '' && obj.elements[i].url != undefined){
      entityEl.setAttribute('href',  obj.elements[i].url);
      entityEl.setAttribute('onclick', "goToPage('"+entityEl.getAttribute('href')+"')");
    }

    //Sphere on top with context information on hover
    var infoEl = document.createElement('a-sphere');
    infoEl.setAttribute('id', menu_name+'_info_'+i);
    infoEl.setAttribute('radius', '0.1');
    infoEl.setAttribute('color', 'yellow');
    infoEl.setAttribute('opacity', '1');
    infoEl.setAttribute('position', {y: 1.5, x: 0, z: 0}); //Relative to the box
    infoEl.setAttribute('event-set__enter','_event: mouseenter; _target: #'+menu_name+'_infoText_'+i+'; visible: true');
    infoEl.setAttribute('event-set__leave','_event: mouseleave; _target: #'+menu_name+'_infoText_'+i+'; visible: false');

    //Append the new info element to the entityContainerEl
    entityContainerEl.appendChild(infoEl);

    //Context information which will be displayed when the sphere is hovered
    var infoTextEl = document.createElement('a-text');
    infoTextEl.setAttribute('id', menu_name+'_infoText_'+i);
    infoTextEl.setAttribute('value', obj.elements[i].description);
    infoTextEl.setAttribute('align', 'center');
    infoTextEl.setAttribute('color', 'yellow');
    infoTextEl.setAttribute('visible', 'false');
    infoTextEl.setAttribute('position', {y: 2, x: 0, z: 2}); //Relative to the box

    //Append the new info element to the entityContainerEl
    entityContainerEl.appendChild(infoTextEl);

    //Add a light on the top of the element
    var lightEl = document.createElement('a-light');
    lightEl.setAttribute('id', menu_name+'_light_'+i);
    lightEl.setAttribute('type', 'point');
    lightEl.setAttribute('shadowCameraVisible', 'true');
    lightEl.setAttribute('color', 'purple');
    lightEl.setAttribute('intensity', '0.2');
    lightEl.setAttribute('position', {y: 2, x: 0, z: 0}); //Relative to the box

    //Append the new light to the entityContainerEl
    entityContainerEl.appendChild(lightEl);

    //Append the new entity to the container and that one to the reference entity
    entityContainerEl.appendChild(entityEl);
    refEl.appendChild(entityContainerEl);

    //In case there is any name, add it on the top of the link.
    if(obj.elements[i].name != '' && obj.elements[i].name != undefined){

      var nameEl = document.createElement('a-text');

      nameEl.setAttribute('width', '3');
      nameEl.setAttribute('align', 'center');
      nameEl.setAttribute('color', 'white');
      nameEl.setAttribute('value', obj.elements[i].name);
      nameEl.setAttribute('position',  {y: 1, x: 0, z: 0}); //Relative to the box
      entityContainerEl.appendChild(nameEl);

      infoEl.setAttribute('event-set__enter','_event: mouseenter; _target: #'+menu_name+'_infoText_'+i+'; visible: true');
      infoEl.setAttribute('event-set__leave','_event: mouseleave; _target: #'+menu_name+'_infoText_'+i+'; visible: false');


    }

  }

}

//Basic HTTP Get to request REST APIs or JSON files
function httpGet(url, callback, params){
  
    console.log("Http GET to url: "+url)
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText, params);
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

//GoToPage to redirect to URL
function goToPage(url){
  
    console.log("Go to page: "+url);
    window.location=url;
}


//This function goes to the scene called "scene_"+sceneId
  function goToScene(sceneId) {
    
    var scenes = document.getElementsByClassName("scene");
    console.log('The current space has '+scenes.length+' scenes.');
    
    for (var i = 0; i < scenes.length; i++){
      scenes[i].setAttribute('visible', 'false');
    }
    
    console.log('Show scene '+sceneId);
    
    document.getElementById('scene_'+sceneId).setAttribute('visible', 'true');
    
  }

console.log('SciartLab Metaverse Library loaded. More info: http://www.sciartlab.com | @dgrmunch');