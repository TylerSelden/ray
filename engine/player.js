import * as Maths from "./maths.js";

let x = 32;
let y = 32;
let a = 45;
let r = 8;
let s = 2;


function turn(d) {
  a += d;
  while (d < 0) d += 360;
  while (d > 360) d -= 360;
}
let move = {
  foreward: function(d) {
    x += d * Maths.cos(a);
    y += d * Maths.sin(a);
  },
  backward: function(d) {
    x -= Maths.vecX(0, a, d);
    y -= Maths.vecY(0, a, d);
  }
}

export { x, y, a, r, s, turn, move };
