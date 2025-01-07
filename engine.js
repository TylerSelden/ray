let player = {
  x: 32,
  y: 32,
  a: 0,
  w: 16,
  h: 16
}
let maps = {}

let current = {
  keys: {}
}

let canvas, ctx, dcanvas, dctx;

let draw = {
  rect: function(x, y, w, h, c) {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
  },
  line: function(x1, y1, x2, y2, c, w) {

  }
}

let ddraw = {
  rect: function(x, y, w, h, c) {
    dctx.fillStyle = c;
    dctx.fillRect(x, y, w, h);
  },
  line: function(x1, y1, x2, y2, c, w) {

  }
}

function init(dev) {
  canvas = document.getElementById("main");
  ctx = canvas.getContext("2d");
  if (dev) {
    dcanvas = document.getElementById("dev");
    dctx = dcanvas.getContext("2d");
  }

  window.addEventListener("keydown", (evt) => {
    current.keys[evt.key] = true;
  });
  window.addEventListener("keyup", (evt) => {
    delete current.keys[evt.key];
  });

  render();
  console.log("Engine initialized!");
}

function logic() {

}

function render() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  dcanvas.width = dcanvas.offsetWidth;
  dcanvas.height = dcanvas.offsetHeight;

  draw.rect(0, 0, canvas.width / 2, canvas.height, "red");
  ddraw.rect(0, 0, dcanvas.width, dcanvas.height, "green");

  requestAnimationFrame(render);
}

export { init };
