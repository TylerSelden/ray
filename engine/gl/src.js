export let standard = {
  vtx: `#version 300 es

in vec4 a_position;

void main() {
  gl_Position = a_position;
}
`,
  frg: `#version 300 es

precision mediump float;
uniform vec4 u_color;

out vec4 FragColor;

void main() {
  FragColor = u_color;
}
`,
  locs: function(gl, program) {
    return {
      a_position: gl.getAttribLocation(program, "a_position"),
      u_color: gl.getUniformLocation(program, "u_color")
    }
  }
};
export let rays = {
  vtx: `#version 300 es

in vec4 a_position;

uniform float u_playerAngle;
uniform float u_blockSize;
uniform float u_fov;
uniform float u_renderDist;

uniform sampler2D u_zbuffer;

out float v_depth;
out vec3 v_color;

float height(float d) {
  if (abs(d) > u_renderDist) return 0.0;

  d = d * cos(a_position[3]);
  float h = (u_blockSize / d) * u_fov;

  return h;
}

void main() {
  vec4 data0 = texelFetch(u_zbuffer, ivec2(0, gl_VertexID / 8), 0);
  
  v_depth = height(a_position[2]);

  v_color = data0.rgb;

  gl_Position = vec4(a_position[0], a_position[1] + v_depth, 0, 1);
  v_depth = abs(v_depth);
}
`,
  frg: `#version 300 es

precision mediump float;

in float v_depth;
in vec3 v_color;

out vec4 FragColor;

void main() {
  FragColor = vec4(v_color[0] * v_depth, v_color[1] * v_depth, v_color[2] * v_depth, 1);
}
`,
  locs: function(gl, program) {
    return {
      a_position: gl.getAttribLocation(program, "a_position"),

      u_playerAngle: gl.getUniformLocation(program, "u_playerAngle"),
      u_blockSize: gl.getUniformLocation(program, "u_blockSize"),
      u_fov: gl.getUniformLocation(program, "u_fov"),
      u_renderDist: gl.getUniformLocation(program, "u_renderDist"),

      u_zbuffer: gl.getUniformLocation(program, "u_zbuffer")
    }
  }
}

