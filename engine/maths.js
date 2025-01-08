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

export { toRad, toDeg, sin, cos, tan, vecX, vecY };
