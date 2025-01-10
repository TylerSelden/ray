import * as Canvas from "./canvas.js";
import * as Scene from "./scene.js";
import * as Maths from "./maths.js";
import * as Player from "./player.js";
import * as Rays from "./rays.js";
import * as Settings from "./settings.js";
import * as Utils from "./utils.js";


// engine state things
let current = {
  keys: {}
}
let binds = {
  'w': () => { Player.go.forward() },
  'a': () => { Player.go.left() },
  's': () => { Player.go.backward() },
  'd': () => { Player.go.right() },
  "ArrowLeft": () => { Player.turn(-3) },
  "ArrowRight": () => { Player.turn(3) }
}
let zbuffer = [];

function init() {
  Canvas.init();

  // set up events for keys and mouse
  window.addEventListener("keydown", (evt) => { current.keys[evt.key] = true });
  window.addEventListener("keyup", (evt) => { delete current.keys[evt.key] });
  document.body.addEventListener("click", (evt) => { if (document.body.requestPointerLock) document.body.requestPointerLock() });
  document.body.addEventListener("mousemove", (evt) => { if (document.pointerLockElement) Player.turn(evt.movementX / 10) });

  // make rays
  Rays.init(Canvas.canvas.width * Settings.rayFactor, Player.x, Player.y, Player.a, Settings.fov);
}

function logic() {
  // handle inputs
  for (let i in binds) if (current.keys[i]) binds[i]();
  Player.move(Player.s);

  // move player
  if (Player.moved) {
    Rays.update(Player.x, Player.y, Player.a, Settings.fov);
    Player.resetMoved();
  }

  // get ray distances
  for (let i in Rays.list) zbuffer[i] = Rays.list[i].getDist();

  render();
}


function render() {
  Canvas.resize();
  // eventually, reset ray count
  Canvas.draw.clear();

  // draw map on dev canvas
  for (let i in Scene.ascii) {
    for (let j in Scene.ascii[i]) {
      Canvas.ddraw.rect(Scene.blockSize * i, Scene.blockSize * j, Scene.blockSize, Scene.blockSize, Scene.blockAt(i, j).color);
    }
  }

  // player on dev canvas
  Canvas.ddraw.circle(Player.x, Player.y, Player.r, "yellow");
  Canvas.ddraw.line(Player.x, Player.y, Maths.vecX(Player.x, Player.a, 16), Maths.vecY(Player.y, Player.a, 16), 3, "yellow");

  // render walls
  let inc = Canvas.canvas.width / zbuffer.length;
  let c = Canvas.canvas.height / 2;
  for (let i in zbuffer) {
    let h = Utils.colHeight(zbuffer[i].d, zbuffer[i].a);
    let block = Scene.blockAt(zbuffer[i].mapX, zbuffer[i].mapY);
    Canvas.draw.rect(inc * i, c - h / 2, inc, h, block.color);
  }

  requestAnimationFrame(logic);
}

export { init, logic, render };
