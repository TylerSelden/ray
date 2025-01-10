let name = "Dev map";
let blockSize = 32;

// A more varied ASCII representation, with different terrain types
let ascii = `
 #.#   #   # #
 #.#   #.#.#.#
     #.#.#.#  
#.# #     #.# 
 #.#.#.#.#.#  
`.split('\n');

// Add new textures and colors for different types of terrain
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
  },
  '+': {
    color: "green",
    solid: true
  },
  '&': {
    color: "yellow",
    solid: true
  },
  '%': {
    color: "red",
    solid: true
  }
}

// Function to add some random terrain variation (like obstacles or paths)
function randomizeMap() {
  for (let y = 0; y < ascii.length; y++) {
    for (let x = 0; x < ascii[y].length; x++) {
      if (Math.random() < 0.05) {  // 5% chance to replace terrain
        let randChar = ['#', '.', '%', '&', '+'][Math.floor(Math.random() * 5)];
        ascii[y] = ascii[y].substring(0, x) + randChar + ascii[y].substring(x + 1);
      }
    }
  }
}

// Apply the randomization to the map
randomizeMap();

function blockAt(x, y) {
  if (ascii[y] === undefined || ascii[y][x] === undefined) return textureMap[' '];
  return textureMap[ascii[y][x]];
}

export { name, blockSize, ascii, textureMap, blockAt };

