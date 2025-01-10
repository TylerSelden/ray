import * as Maths from "./maths.js";

export let fov = 60;
export let renderDistance = 720;
export let rayDistance = Maths.pythag(renderDistance, renderDistance);
export let rayFactor = .5;

export let minimapZoom = 2;

// graphics factor
// game resolution || aspect ratio
