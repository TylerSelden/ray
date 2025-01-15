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

function line(x1, y1, x2, y2, c, w) {
  if (w) ctx.lineWidth = w;
  ctx.strokeStyle = c;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}


function gridLines() {
  ctx.strokeStyle = "rgba(200, 200, 200, .7)";
  let oX = -Global.x % Global.tbs;
  let oY = -Global.y % Global.tbs;

  for (let i = oX; i < canvas.width; i += Global.tbs) {
    if (-Global.x > i) continue;
    line(i, -Global.y, i, canvas.height, "rgba(200, 200, 200, .7)");
  }
  for (let j = oY; j < canvas.height; j += Global.tbs) {
    if (-Global.y > j) continue;
    line(-Global.x, j, canvas.width, j, "rgba(200, 200, 200, .7)");
  }
}

function texColor(tex) {
  return Global.Scene.textureMap[tex].color;
}



function drawMap() {
  // currently hovered box
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";

  let x = Global.mx * Global.tbs - Global.x;
  let y = Global.my * Global.tbs - Global.y;
  ctx.fillRect(x, y, Global.tbs, Global.tbs);


  // oh boy
  let data = Global.Scene.data;
  let w = Math.max(Global.zoom, 1) / 2;
  let l = 8 * Global.zoom;
  for (let i = 0; i < data.length; i++) {
    if (!data[i]) continue;
    for (let j = 0; j < Global.Scene.data[i].length; j++) {
      let block = Global.Scene.data[i][j];
      if (!block || block === "    ") continue;

      let x = j * Global.tbs - Global.x;
      let y = i * Global.tbs - Global.y;
      let h = Global.tbs / 2;
      let hx = x + h;
      let hy = y + h;
      let fx = x + Global.tbs;
      let fy = y + Global.tbs;

      line(x, y + w, fx, y + w, texColor(block[0]), w * 2);
      line(hx, y + w, hx, y + w - l, texColor(block[0]), w * 2);

      line(fx - w, y, fx - w, fy, texColor(block[1]), w * 2);
      line(fx - w, hy, fx - w + l, hy, texColor(block[1]), w * 2);

      line(x + w, y, x + w, fy, texColor(block[2]), w * 2);
      line(x + w, hy, x + w - l, hy, texColor(block[2]), w * 2);

      line(x, fy - w, fx, fy - w, texColor(block[3]), w * 2);
      line(hx, fy - w, hx, fy - w + l, texColor(block[3]), w * 2);
    }
  }
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
