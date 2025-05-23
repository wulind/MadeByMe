import { extend } from "@react-three/fiber";
import { useMemo } from "react";
import { ShaderPass } from "three-stdlib";

extend({ ShaderPass });

export const useDistortionPass = () => {
  const pass = useMemo(() => {
    const shader = {
      uniforms: {
        tDiffuse: { value: null },
        u_time: { value: 0 },
        u_progress: { value: 0 },
        u_scale: { value: 1 },
      },
      vertexShader,
      fragmentShader,
    };
    const pass = new ShaderPass(shader);
    return pass;
  }, []);

  return pass;
};

const vertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = `
uniform sampler2D tDiffuse;
uniform float u_time;
uniform float u_progress;
uniform float u_scale;
varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;

  vec2 p = 2.0 * v_uv - 1.0; // -1 ~ 1
  p += 0.1 * cos(u_scale * 3.7 * p.yx + 1.4 * u_time + vec2(2.2, 3.4));
  p += 0.1 * cos(u_scale * 3.0 * p.yx + 1.0 * u_time + vec2(1.2, 3.4));
  p += 0.3 * cos(u_scale * 5.0 * p.yx + 2.6 * u_time + vec2(4.2, 1.4));
  p += 0.3 * cos(u_scale * 7.5 * p.yx + 3.6 * u_time + vec2(12.2, 3.4));

	uv.x = mix(v_uv.x, length(p), u_progress);
  uv.y = mix(v_uv.y, 0.5 * length(p) + 0.15, u_progress);

  vec4 color = texture2D(tDiffuse, uv);

  gl_FragColor = color;
  // gl_FragColor = vec4(vec3(length(p)), 1.0);
}
`;
