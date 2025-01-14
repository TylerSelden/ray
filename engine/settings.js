import * as Maths from "./maths.js";

export let fov = 60;
export let renderDistance = 720;
export let rayDistance = Maths.pythag(renderDistance, renderDistance);
export let rayFactor = 1;
export let light = 300;
export let aspectRatio = 16/9;

export let minimapZoom = 2;

// graphics factor
// game resolution || aspect ratio
