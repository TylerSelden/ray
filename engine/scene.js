let name = "Dev map";
let blockSize = 32;



let data = [
  ["    ", " .  ", "   #"],
  ["  . ", " .. ", "   #"],
  ["#   ", "#   ", "%&+#"],
]


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

function blockAt(x, y, dir) {
  if (!data[y] || !data[y][x]) return textureMap[' '];
  if (!data[y][x][dir]) return data[y][x];

  return textureMap[data[y][x][dir]];
}

export { name, blockSize, data, textureMap, blockAt };

