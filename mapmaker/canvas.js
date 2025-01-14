let canvas, ctx;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d"); //  :( i cant use webgl...
  
  resize();
}

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function gridLines() {
  ctx.strokeStyle = "rgba(200, 200, 200, .7)";
  const bS = Global.Scene.blockSize * Global.zoom;
  let oX = -Global.x % bS;
  let oY = -Global.y % bS;

  for (let i = oX; i < canvas.width; i += bS) {
    if (-Global.x > i) continue;
    ctx.beginPath();
    ctx.moveTo(i, -Global.y);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let j = oY; j < canvas.height; j += bS) {
    if (-Global.y > j) continue;
    ctx.beginPath();
    ctx.moveTo(-Global.x, j);
    ctx.lineTo(canvas.width, j);
    ctx.stroke();
  }
}

function drawMap() {
  // currently hovered box
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";

  let x = Global.mx * Global.Scene.blockSize * Global.zoom - Global.x;
  let y = Global.my * Global.Scene.blockSize * Global.zoom - Global.y;
  ctx.fillRect(x, y, Global.Scene.blockSize * Global.zoom, Global.Scene.blockSize * Global.zoom);
}

function displayInfo() {
  ctx.fillStyle = "white";
  ctx.font = "18px Courier New";

  let x = Global.tx.toFixed(2);
  let y = Global.ty.toFixed(2);
  let cX = Global.cx.toFixed(2);
  let cY = Global.cy.toFixed(2);


  ctx.fillText(`@${Global.zoom.toFixed(2)}x: (${x}, ${y}), (${cX}, ${cY}), [${Global.mx}, ${Global.my}]`, 5, canvas.height - 10)
}

export { canvas, ctx, init, resize, gridLines, displayInfo, drawMap };
