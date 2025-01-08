import * as Maths from "./maths.js";

class Ray {
  constructor(x, y, a) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.sin = Maths.sin(a);
    this.cos = Maths.cos(a);
    this.tan = Maths.tan(a);
  }

  getDistX(blockSize) {
    if (cos < 0) return Math.floor((this.x - 1) / blockSize) * blockSize;
    return Math.ceil((this.y + 1) / blockSize) * blockSize;
  }
  getDistY(blockSize) {
    if (sin < 0) return Math.floor((this.y - 1) / blockSize) * blockSize;
    return Math.ceil((this.y + 1) / blockSize) * blockSize;
  }

  nextHit(blockSize) {
  }
}

let list = [];

export { Ray, list };
