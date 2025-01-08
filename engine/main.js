import * as Canvas from "./canvas.js";
import * as Scene from "./scene.js";
import * as Maths from "./maths.js";
import * as Player from "./player.js";


let current = {
  keys: {}
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
  if (current.keys.ArrowUp || current.keys.w) Player.move.foreward(2);
  if (current.keys.ArrowDown || current.keys.s) Player.move.backward(2);
}

function render() {
  Canvas.resize();

  // remove later
  logic();

  // draw map on dev canvas
  for (let i in Scene.ascii) {
    for (let j in Scene.ascii[i]) {
      Canvas.ddraw.rect(Scene.blockSize * i, Scene.blockSize * j, Scene.blockSize, Scene.blockSize, Scene.textureMap[Scene.ascii[j][i]]);
    }
  }
  // player on dev canvas
  Canvas.ddraw.circle(Player.x, Player.y, Player.r, "yellow");
  Canvas.ddraw.line(Player.x, Player.y, Maths.vecX(Player.x, Player.a, 16), Maths.vecY(Player.y, Player.a, 16), 3, "yellow");

  requestAnimationFrame(render);
}

export { init };
