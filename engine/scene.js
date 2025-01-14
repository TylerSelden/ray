let name = "Dev map";
let blockSize = 32;

// A more varied ASCII representation, with different terrain types
let ascii = `
#######
#     #
#     #
#     #
#     #
#     #
#     #
#######


........
.      .
.      .
.      .
.      .
.      .
..    ..
 ..  ..
  .  .
  .  ...
  .  
  ......
`.split('\n');

// Add new textures and colors for different types of terrain
let textureMap = {
  ' ': {
    color: "rgba(0, 0, 0, 0)",
    solid: false
  },
  '.': {
    color: "rgba(255, 255, 255, 1)",
    solid: true
  },
  '#': {
    color: "rgba(0, 0, 255, 1)",
    solid: true
  },
  '+': {
    color: "rgba(0, 255, 0, 1)",
    solid: true
  },
  '&': {
    color: "rgba(255, 255, 0, 1)",
    solid: true
  },
  '%': {
    color: "rgba(255, 0, 0, 1)",
    solid: true
  }
}

function blockAt(x, y) {
  if (ascii[y] === undefined || ascii[y][x] === undefined || textureMap[ascii[y][x]] === undefined) return textureMap[' '];
  return textureMap[ascii[y][x]];
}

export { name, blockSize, ascii, textureMap, blockAt };

