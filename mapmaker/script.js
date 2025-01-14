import * as Global from "./global.js";
import * as Events from "./events.js";
import * as Canvas from "./canvas.js";

let canvas, ctx;

window.onerror = function(msg, url, linenumber) {
  alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
  return true;
}

window.onload = function() {
  init();
  loop();
}


let current = {
  lastTouch: null
}


function init() {
  Canvas.init();
  Events.createListeners(Canvas.canvas);
}

function loop() {
  Events.useBinds();

  Canvas.resize();
  Canvas.gridLines();

  Canvas.drawMap();
  Canvas.displayInfo();

  requestAnimationFrame(loop);
}
