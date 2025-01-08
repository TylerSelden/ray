import * as Maths from "./maths.js";
import * as Canvas from "./canvas.js";
import * as Scene from "./scene.js";

class Ray {
  constructor(x, y, a, blockSize) {
    this.x = x;
    this.y = y;
    this.ox = x;
    this.oy = y;
    this.a = a;
    this.blockSize = blockSize;

    this.sin = Maths.sin(a);
    this.cos = Maths.cos(a);
    this.tan = Maths.tan(a);
    this.d = 0;
  }

  roundX() {
    if (this.cos < 0) return (Math.floor((this.x - 1) / this.blockSize) * this.blockSize) - this.x;
    return (Math.ceil((this.x + 1) / this.blockSize) * this.blockSize) - this.x;
  }
  roundY() {
    if (this.sin < 0) return (Math.floor((this.y - 1) / this.blockSize) * this.blockSize) - this.y;
    return (Math.ceil((this.y + 1) / this.blockSize) * this.blockSize) - this.y;
  }
  nextVert() {
    let y = this.roundY();
    let x = y / this.tan + this.x;
    y += this.y;
    let d = Maths.dist(this.x, this.y, x, y);

    return { x, y, d };
  }
  nextHoriz() {
    let x = this.roundX();
    let y = x * this.tan + this.y;
    x += this.x;
    let d = Maths.dist(this.x, this.y, x, y);

    return { x, y, d };
  }

  close(a, b, margin) {
    return Math.abs(a % b) <= margin || Math.abs(b % a) <= margin;
  }

  nextHit() {
    let mapX, mapY;
    while (this.d < 300) {
      let nH = this.nextHoriz();
      let nV = this.nextVert();

      let n = (nH.d < nV.d) ? nH : nV;

      this.x = n.x;
      this.y = n.y;
      this.d += n.d;


      // FIX THIS PLEASEEEE
      mapX = Math.floor(this.x / this.blockSize);
      mapY = Math.floor(this.y / this.blockSize);
      if (nH.d < nV.d) {
        if (this.cos < 0) mapX--;
      } else {
        if (this.sin < 0) mapY--;
      }

      if (Scene.blockAt(mapX, mapY).solid) break;
    }
    Canvas.ddraw.line(this.ox, this.oy, this.x, this.y, 2, "red");
    Canvas.ddraw.rect(mapX * this.blockSize, mapY * this.blockSize, this.blockSize, this.blockSize, "rgba(255, 255, 0, 0.25)");
  }
}

let list = [];

export { Ray, list };
