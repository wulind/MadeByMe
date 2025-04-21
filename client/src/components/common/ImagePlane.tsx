import { Plane, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface ImagePlaneProps {
  images: string[];
}

export const ImagePlane = (props: ImagePlaneProps) => {
  const path = (name: string) => `/images/${name}`;
  const textures = useTexture(
    props.images.map((imgSrc: string) => {
      return path(imgSrc);
    }),
  );

  const material = (texture: THREE.Texture) =>
    new THREE.ShaderMaterial({
      uniforms: {
        u_texture: { value: texture },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

  return (
    <>
      {textures.map((texture, i) => (
        <Plane
          key={i}
          args={[1, 0.8]}
          material={material(texture)}
          scale={0.95}
          position={[i - 1, 0, 0]}
        />
      ))}
    </>
  );
};

const vertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = `
uniform sampler2D u_texture;
varying vec2 v_uv;

void main() {
  vec4 color = texture2D(u_texture, v_uv);
  gl_FragColor = color;
}
`;
