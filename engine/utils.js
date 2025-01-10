import * as Settings from "./settings.js";
import * as Maths from "./maths.js";
import * as Scene from "./scene.js";
import * as Canvas from "./canvas.js";
import * as Player from "./player.js";

function colHeight(d, a) {
  if (d > Settings.renderDistance) return 0;

  d = d * Maths.cos(a - Player.a);
  return Scene.blockSize * Canvas.canvas.height / d * (2 * Maths.tan(Settings.fov / 2));
}

export { colHeight };
