import * as Maths from "./maths.js";

let x = 32;
let y = 32;
let a = 30;
let r = 8;
let s = 2;

let dX = 0;
let dY = 0;

function turn(d) {
  a += d;
  while (a < 0) a += 360;
  while (a > 360) a -= 360;
}

function move() {
  let d = Maths.pythag(dX, dY);
  if (d === 0) return;
  
  dX /= d;
  dY /= d;
  x += dX * Maths.cos(a) - dY * Maths.sin(a);
  y += dX * Maths.sin(a) + dY * Maths.cos(a);

  dX = 0;
  dY = 0;
}

let go = {
  forward: function() {
    dX += s;
  },
  right: function() {
    dY += s;
  },
  backward: function() {
    dX -= s;
  },
  left: function() {
    dY -= s;
  }
}

export { x, y, a, r, s, turn, move, go };
