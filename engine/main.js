import * as Canvas from "./canvas.js";
import * as Scene from "./scene.js";
import * as Maths from "./maths.js";
import * as Player from "./player.js";
import * as Rays from "./rays.js";

let current = {
  keys: {}
}
let binds = {
  'w': () => { Player.go.forward() },
  'a': () => { Player.go.left() },
  's': () => { Player.go.backward() },
  'd': () => { Player.go.right() },
  "ArrowLeft": () => { Player.turn(-3) },
  "ArrowRight": () => { Player.turn(3) },
  'm': () => {
    alert(JSON.stringify(Rays.list[0]))
  }
}



function init() {
  Canvas.init();

  window.addEventListener("keydown", (evt) => {
    current.keys[evt.key] = true;
  });
  window.addEventListener("keyup", (evt) => {
    delete current.keys[evt.key];
  });
  document.body.addEventListener("click", (evt) => {
    if (document.body.requestPointerLock) document.body.requestPointerLock();
  });
  document.body.addEventListener("mousemove", (evt) => {
    if (document.pointerLockElement) Player.turn(evt.movementX / 10);
  });

  Rays.init(Canvas.canvas.width, Player.x, Player.y, Player.a, Player.fov);

  render();
  console.log("Engine initialized!");
}

let zbuffer = [];
function logic() {
  // handle inputs
  for (let i in binds) if (current.keys[i]) binds[i]();
  Player.move(Player.s);

  // actually start raycasting here (wow)
  if (player.moved) {
    Rays.update(Player.x, Player.y, Player.a, Player.fov);
    Player.resetMoved();
  }
  
  for (let i in Rays.list) {
    zbuffer[i] = Rays.list[i].getDist();
  }
}

window.player = Player;
window.maths = Maths;

function colHeight(d, rD) {
  if (d > rD) return 0;

  let h = Canvas.canvas.height * (1 - d / rD);
  return Math.max(0, Math.floor(h));
}

function render() {
  Canvas.resize();

  // remove later
  logic();

  // draw map on dev canvas
  for (let i in Scene.ascii) {
    for (let j in Scene.ascii[i]) {
      Canvas.ddraw.rect(Scene.blockSize * i, Scene.blockSize * j, Scene.blockSize, Scene.blockSize, Scene.blockAt(i, j).color);
    }
  }
  // player on dev canvas
  Canvas.ddraw.circle(Player.x, Player.y, Player.r, "yellow");
  Canvas.ddraw.line(Player.x, Player.y, Maths.vecX(Player.x, Player.a, 16), Maths.vecY(Player.y, Player.a, 16), 3, "yellow");

  let inc = Canvas.canvas.width / zbuffer.length;
  for (let i in zbuffer) {
    let h = colHeight(zbuffer[i].d, 256)
    Canvas.draw.rect(inc * i, Canvas.canvas.height / 2 - h / 2, inc, h, Scene.blockAt(zbuffer[i].mapX, zbuffer[i].mapY).color);
  }
  
  requestAnimationFrame(render);
}

export { init };
