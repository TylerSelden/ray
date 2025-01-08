let name = "Dev map";
let blockSize = 32;

let ascii = ` #.# 
     
     
     
 #.# `.split('\n');

let textureMap = {
  ' ': {
    color: "rgba(0, 0, 0, 0)",
    solid: false
  },
  '.': {
    color: "white",
    solid: true
  },
  '#': {
    color: "blue",
    solid: true
  }
}

function blockAt(x, y) {
  if (ascii[y] === undefined || ascii[y][x] === undefined) return textureMap[' '];
  return textureMap[ascii[y][x]];
}

export { name, blockSize, ascii, textureMap, blockAt };
