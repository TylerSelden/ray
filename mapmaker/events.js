let lastTouch = null;
let mouseDown = false;

let keys = {};
let binds = {
  'w': () => { Global.y -= (10 * Global.zoom) },
  'a': () => { Global.x -= (10 * Global.zoom) },
  's': () => { Global.y += (10 * Global.zoom) },
  'd': () => { Global.x += (10 * Global.zoom) },
  'q': () => { zoom(Global.zoom - .1) },
  'e': () => { zoom(Global.zoom + .1) },
  'x': () => { Global.zoom = 1 },
  "ArrowUp": () => { Global.place(0) },
  "ArrowRight": () => { Global.place(1) },
  "ArrowLeft": () => { Global.place(2) },
  "ArrowDown": () => { Global.place(3) }
}


function useBinds() {
  for (let i in keys) {
    if (keys[i] && binds[i]) binds[i]();

    let n = parseInt(i) + 1;
    if (!isNaN(n) && keys[i]) {
      let children = Array.from(document.getElementById("rightToolbar").children);

      if (children[n]) Global.select(children[n].id);
    }
  }
  setTrueVals();
}

function zoom(d) {
  const newZoom = Math.max(d, 0.5);
  const factor = newZoom / Global.zoom;

  Global.x = -Global.mouse.x - factor * (-Global.mouse.x - Global.x);
  Global.y = -Global.mouse.y - factor * (-Global.mouse.y - Global.y);

  Global.zoom = newZoom;

  setTrueVals();
}

function setTrueVals() {
  Global.tx = Global.x / Global.zoom;
  Global.ty = Global.y / Global.zoom;
  Global.cx = Global.tx + Global.mouse.x / Global.zoom;
  Global.cy = Global.ty + Global.mouse.y / Global.zoom;
  Global.mx = Math.max(Math.floor(Global.cx / Global.Scene.blockSize), 0);
  Global.my = Math.max(Math.floor(Global.cy / Global.Scene.blockSize), 0);
  Global.tbs = Global.Scene.blockSize * Global.zoom;
}

function createListeners(canvas) {
  canvas.addEventListener("mousedown", (evt) => { mouseDown = true; });
  window.addEventListener("mouseup", (evt) => { mouseDown = false; });
  canvas.addEventListener("wheel", (evt) => {
    zoom(Global.zoom - evt.deltaY / 500);

    setTrueVals();
  });
  canvas.addEventListener("mousemove", (evt) => {
    Global.mouse.x = evt.clientX;
    Global.mouse.y = evt.clientY;
    if (mouseDown) {
      Global.x -= evt.movementX;
      Global.y -= evt.movementY;
    }
    setTrueVals();
  });
  
  window.addEventListener("keydown", (evt) => { keys[evt.key] = true });
  window.addEventListener("keyup", (evt) => { keys[evt.key] = false });

  // touchscreen stuff
  canvas.addEventListener("touchmove", (evt) => {
    const touch = evt.touches[0];
    if (lastTouch !== null) {
      Global.x -= touch.clientX - lastTouch.clientX;
      Global.y -= touch.clientY - lastTouch.clientY;
    }
    lastTouch = touch;
    setTrueVals();
  });
  canvas.addEventListener("touchend", (evt) => { lastTouch = null; })
}



export { createListeners, useBinds };
