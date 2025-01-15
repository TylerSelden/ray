import * as Global from "./global.js";
import * as Events from "./events.js";
import * as Canvas from "./canvas.js";
import * as Scene from "./scene.js";

let canvas, ctx;

window.onerror = function(msg, url, linenumber) {
  alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
  return true;
}

window.onload = init;

function init() {
  Canvas.init();
  Events.createListeners(Canvas.canvas);
  Scene.makeTexBtns();

  loop();
}

function loop() {
  Events.useBinds();

  Canvas.resize();
  Canvas.gridLines();

  Canvas.drawMap();
  Canvas.displayInfo();

  requestAnimationFrame(loop);
}
