import * as Maths from "./maths.js";

let x = 29;
let y = 96;
let a = 85;
let r = 8;
let s = 2;
let fov = 60;

let moved = false;

let dX = 0;
let dY = 0;

function turn(d) {
  a += d;
  while (a < 0) a += 360;
  while (a > 360) a -= 360;

  moved = true;
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

  moved = true;
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

function resetMoved() {
  moved = false;
}

export { x, y, a, r, s, fov, moved, resetMoved, turn, move, go };
