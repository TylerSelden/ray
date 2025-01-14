import * as Src from "./src.js";

function createShader(gl, type, src) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;

  alert(`Shader compile error: ${gl.getShaderInfoLog(shader)}`);
  gl.deleteShader(shader);
}

function createProgram(gl, vtx, frg) {
  let program = gl.createProgram();
  gl.attachShader(program, vtx);
  gl.attachShader(program, frg);
  gl.linkProgram(program);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;

  console.error(`Program link error: ${gl.getProgramInfoLog(program)}`);
  gl.deleteProgram(program);
}

function generatePrograms(gl) {
  let programs = {};
  let locs = {};

  for (let i in Src) {
    let vtx = createShader(gl, gl.VERTEX_SHADER, Src[i].vtx);
    let frg = createShader(gl, gl.FRAGMENT_SHADER, Src[i].frg);
    programs[i] = createProgram(gl, vtx, frg);

    locs[i] = Src[i].locs(gl, programs[i]);
  }

  return { programs, locs };
}

export { generatePrograms };
