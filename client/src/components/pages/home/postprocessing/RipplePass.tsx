import { useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { ShaderPass } from "three-stdlib";

import { RippleRenderer } from "./ripple";

extend({ ShaderPass });

export const useRipplePass = () => {
  const rippleTexture = useTexture("/textures/brush.png");

  const effect = useMemo(
    () => new RippleRenderer(rippleTexture),
    [rippleTexture],
  );

  const shader = useMemo(
    () => ({
      uniforms: {
        tDiffuse: { value: null },
        u_displacement: { value: null },
      },
      vertexShader,
      fragmentShader,
    }),
    [],
  );

  const ripplePass = useMemo(() => new ShaderPass(shader), [shader]);

  useEffect(() => {
    return () => effect.dispose();
  }, [effect]);

  // You’ll update this in your render loop
  const update = (gl: any) => {
    effect.update(gl, ripplePass.uniforms.u_displacement);
  };

  return { ripplePass, update };
};

// --------------------------------------------------------
const vertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = `
uniform sampler2D tDiffuse;
uniform sampler2D u_displacement;
varying vec2 v_uv;

float PI = 3.141592653589;

void main() {
  vec2 uv = v_uv;

  vec4 disp = texture2D(u_displacement, uv);
  float theta = disp.r * 2.0 * PI;
  vec2 dir = vec2(sin(theta), cos(theta));
  uv += dir * disp.r * 0.1;

  vec4 color = texture2D(tDiffuse, uv);

  gl_FragColor = color;
}
`;
