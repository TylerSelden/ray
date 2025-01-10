import * as Maths from "./maths.js";
import * as Canvas from "./canvas.js";
import * as Scene from "./scene.js";
import * as Settings from "./settings.js";

// to prevent edge cases (or CoRnEr CaSeS hAhAhAhAhA)
const EPSILON = 1e-9;

let list = [];

class Ray {
  constructor(x, y, a) {
    this.x = x;
    this.y = y;
    this.ox = x;
    this.oy = y;
    this.a = a;

    this.sin = Maths.sin(a);
    this.cos = Maths.cos(a);
    this.tan = Maths.tan(a);
    this.d = 0;
  }

  update(x, y, a) {
    this.x = x;
    this.y = y;
    this.ox = x;
    this.oy = y;

    // no need to re-calculate all of the trig values if a didn't change
    let cA = this.a !== a;
    this.a = a;

    if (cA) {
      this.sin = Maths.sin(a);
      this.cos = Maths.cos(a);
      this.tan = Maths.tan(a);
    }
  }
  
  roundX() {
    if (this.cos < 0) return (Math.floor((this.x - EPSILON) / Scene.blockSize) * Scene.blockSize) - this.x;
    return (Math.ceil((this.x + EPSILON) / Scene.blockSize) * Scene.blockSize) - this.x;
  }
  roundY() {
    if (this.sin < 0) return (Math.floor((this.y - EPSILON) / Scene.blockSize) * Scene.blockSize) - this.y;
    return (Math.ceil((this.y + EPSILON) / Scene.blockSize) * Scene.blockSize) - this.y;
  }

  // along horizontal line
  nextVert() {
    let y = this.roundY();
    let x = y / this.tan + this.x;
    y += this.y;
    let d = Maths.dist(this.x, this.y, x, y);

    return { x, y, d };
  }
  // along vertical line
  nextHoriz() {
    let x = this.roundX();
    let y = x * this.tan + this.y;
    x += this.x;
    let d = Maths.dist(this.x, this.y, x, y);

    return { x, y, d };
  }

  getDist() {
    // reset values
    this.x = this.ox;
    this.y = this.oy;
    this.d = 0;
    let mapX, mapY;

    while (this.d < Settings.rayDistance) {
      let nH = this.nextHoriz();
      let nV = this.nextVert();

      // get shorter distance and go there
      let n = (nH.d < nV.d) ? nH : nV;

      this.x = n.x;
      this.y = n.y;
      this.d += n.d;

      // get correct block coords
      mapX = Math.floor(this.x / Scene.blockSize);
      mapY = Math.floor(this.y / Scene.blockSize);
      if (nH.d < nV.d) {
        if (this.cos < 0) mapX--;
      } else {
        if (this.sin < 0) mapY--;
      }

      if (Scene.blockAt(mapX, mapY).solid) break;
    }
    return { mapX, mapY, a: this.a, d: this.d };
  }
}

function init(num, x, y, a, fov) {
  let bA = a - (fov / 2);
  let iA = (fov / num);
  for (let i = 0; i < num; i++) {
    list.push(new Ray(x, y, bA + iA * i));
  }
}

function update(x, y, a, fov) {
  let bA = a - (fov / 2);
  let iA = (fov / list.length);
  for (let i in list) {
    list[i].update(x, y, bA + iA * i);
  }
}

export { Ray, list, init, update };
