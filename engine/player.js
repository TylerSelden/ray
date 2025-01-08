import * as Maths from "./maths.js";

let x = 32;
let y = 32;
let a = 45;
let r = 8;
let s = 2;

let dX = 0;
let dY = 0;

function turn(d) {
  a += d;
  while (a < 0) a += 360;
  while (a > 360) a -= 360;
}

function move(d) {
  

  dX = 0;
  dY = 0;
}

let go = {
  forward: function() {
    dY += 2;
  },
  right: function() {
    dX += 2;
  },
  backward: function() {
    dY -= 2;
  },
  left: function() {
    dX -= 2;
  }
}

export { x, y, a, r, s, turn, move, go };
