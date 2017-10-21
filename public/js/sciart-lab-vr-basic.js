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
 "|                                                                              |"
 "|                     Twitter:  @dgrmunch  | @sciartlab                        |"
 "|                     Website:  http://www.sciartlab.com]                      |"
 "|                                                                              |"
 "*------------------------------------------------------------------------------*"

* Description: Basic JS Library to develop the SciArtLab Metaverse components.

*/

//Basic HTTP Get to request REST APIs or JSON files
function httpGet(url, callback){
  
    console.log("Http GET to url: "+url)
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

//GoToPage to redirect to URL
function goToPage(url){
  
    console.log("Go to page: "+url);
    window.location=url;
}

//HoverLink (TODO)
function hoverLink(){
  
    console.log("Hover");
    console.log(this);
}