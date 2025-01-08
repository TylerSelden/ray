function toRad(a) {
  return a * (Math.PI / 180);
}
function toDeg(a) {
  return a * (180 / Math.PI);
}

function sin(a) {
  return Math.sin(toRad(a));
}
function cos(a) {
  return Math.cos(toRad(a));
}
function tan(a) {
  return Math.tan(toRad(a));
}

function vecX(x, a, d) {
  return x + (d * cos(a));
}
function vecY(y, a, d) {
  return y + (d * sin(a));
}

function angleOf(x1, y1, x2, y2) {
  let dX = x2 - x1;
  let dY = y2 - y1;
  let theta = toDeg(Math.atan2(dY, dX));
  return theta - 180;
}

function pythag(d1, d2) {
  return Math.sqrt(d1 * d1 + d2 * d2);
}

export { toRad, toDeg, sin, cos, tan, vecX, vecY, angleOf, pythag };
