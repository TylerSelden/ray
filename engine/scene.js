let name = "Dev map";
let blockSize = 32;

let ascii = `#####
## ##
#   #
#   #
#####`.split('\n');

let textureMap = {
  ' ': "rgba(0, 0, 0, 0)",
  '.': "white",
  '#': "blue"
}

export { name, blockSize, ascii, textureMap };
