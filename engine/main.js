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
  "ArrowRight": () => { Player.turn(3) }
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
    document.body.requestPointerLock();
  });
  document.body.addEventListener("mousemove", (evt) => {
    Player.turn(evt.movementX / 10);
  });

  render();
  console.log("Engine initialized!");
}

function logic() {
  // handle inputs
  for (let i in binds) if (current.keys[i]) binds[i]();
  Player.move(Player.s);

  // actually start raycasting here (wow)
  Rays.list[0] = new Rays.Ray(Player.x, Player.y, Player.a, Scene.blockSize);
}

window.player = Player;
window.maths = Maths;

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

  Rays.list[0].nextHit();

  requestAnimationFrame(render);
}

export { init };
