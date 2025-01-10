import * as Raycaster from "./engine/main.js";

window.onerror = function(msg, url, linenumber) {
  alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
  return true;
}

window.onload = function() {
  if (window.location.search.includes("dev=false")) document.getElementById("dev").classList.add("hidden");
  Raycaster.init();
  Raycaster.logic();
}
