let canvas, dcanvas, ctx, dctx;

function init() {
  canvas = document.getElementById("main");
  ctx = canvas.getContext("2d");
  dcanvas = document.getElementById("dev");
  dctx = dcanvas.getContext("2d");

  resize();
}

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  dcanvas.width = dcanvas.offsetWidth;
  dcanvas.height = dcanvas.offsetHeight;
}

let draw = {
  rect: function(x, y, w, h, c) {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
  },
  line: function(x1, y1, x2, y2, w, c) {
    ctx.lineWidth = w;
    ctx.strokeStyle = c;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  },
  circle: function(x, y, r, c) {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 7);
    ctx.fill();
  }
}
let ddraw = {
  rect: function(x, y, w, h, c) {
    dctx.fillStyle = c;
    dctx.fillRect(x, y, w, h);
  },
  line: function(x1, y1, x2, y2, w, c) {
    dctx.lineWidth = w;
    dctx.strokeStyle = c;
    dctx.beginPath();
    dctx.moveTo(x1, y1);
    dctx.lineTo(x2, y2);
    dctx.stroke();
  },
  circle: function(x, y, r, c) {
    dctx.fillStyle = c;
    dctx.beginPath();
    dctx.arc(x, y, r, 0, 7);
    dctx.fill();
  }
}

export { canvas, dcanvas, ctx, dctx, init, resize, draw, ddraw };
