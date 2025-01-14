import * as Shaders from "./shaders.js";
import * as Settings from "../settings.js";
import * as Maths from "../maths.js";
import * as Player from "../player.js";
import * as Utils from "./utils.js";

let canvas, dcanvas, gl, dgl;

function init() {
  canvas = document.getElementById("main");
  gl = canvas.getContext("webgl2");
  dcanvas = document.getElementById("dev");
  dgl = dcanvas.getContext("webgl2");

  if (!gl) alert("WebGL is not supported by your browser.");

  resize();

  initGL();
}

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);

  dcanvas.width = dcanvas.offsetWidth;
  dcanvas.height = dcanvas.offsetHeight;
  dgl.viewport(0, 0, dcanvas.width, dcanvas.height);
}


let locs = {};
let programs;

function initGL() {
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  let tmp = Shaders.generatePrograms(gl);
  
  programs = tmp.programs;
  locs = tmp.locs;
}



let draw = {
  rays: function(zbuffer, blockSize) {
    gl.useProgram(programs.rays);
    // create depth texture
    let arr = [];
    for (let i of zbuffer) {
      //arr.push(Maths.toRad(i.a - Player.a));
      arr.push(i.r || 0);
      arr.push(i.g || 0);
      arr.push(i.b || 0);
      arr.push(i.d);
    }
    Utils.RGBA32FTex(gl, gl.TEXTURE0, arr);

    gl.uniform1i(locs.rays.u_zbuffer, 0);


    let positions = [];
    for (let i = -1; i < 1; i += (2 / zbuffer.length)) {
      let z = zbuffer[Math.floor((i + 1) / 2 * zbuffer.length)];
      let a = Maths.toRad(z.a - Player.a);
      positions.push(i);
      positions.push(0);
      positions.push(z.d);
      positions.push(a);

      positions.push(i);
      positions.push(0);
      positions.push(-z.d);
      positions.push(a);
    }

    gl.uniform1f(locs.rays.u_blockSize, blockSize);
    gl.uniform1f(locs.rays.u_fov, 2 * Math.tan(Maths.toRad(Settings.fov / 2)));
    gl.uniform1f(locs.rays.u_renderDist, Settings.renderDistance);

    let buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf); 
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(locs.rays.a_position);
    gl.vertexAttribPointer(locs.rays.a_position, 4, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.LINES, 0, positions.length / 4);
  },
  rect: function() {

  },
  clear: function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
}

let ddraw = {};

export { canvas, dcanvas, init, resize, draw, ddraw };
