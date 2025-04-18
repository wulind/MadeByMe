import { extend, useThree } from "@react-three/fiber";
// import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { EffectComposer, RenderPass, ShaderPass } from "three-stdlib";

import { useDistortionPass } from "./postprocessing/DistortionPass";
import { useRipplePass } from "./postprocessing/RipplePass";

extend({ EffectComposer, RenderPass, ShaderPass });

export const Effect = () => {
  // const dist_datas = useControls("Distortion", {
  //   progress: { value: 1, min: 0, max: 1, step: 0.01 },
  //   scale: { value: 1, min: 0, max: 1, step: 0.01 },
  // });

  const composer = useRef<EffectComposer>(null);
  const distortionPass = useRef(useDistortionPass());

  const { ripplePass, update: updateRipple } = useRipplePass();

  const { gl, scene, camera, size, clock } = useThree();

  useEffect(() => {
    const composerInstance = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);

    composerInstance.addPass(renderPass);
    composerInstance.addPass(distortionPass.current);
    composerInstance.addPass(ripplePass);
    composer.current = composerInstance;

    gl.autoClear = false;
    gl.setAnimationLoop(() => {
      distortionPass.current.uniforms.u_time.value =
        clock.getElapsedTime() * 0.2;
      distortionPass.current.uniforms.u_progress.value = 1;
      distortionPass.current.uniforms.u_scale.value = 1;

      updateRipple(gl);
      composerInstance.render();
    });

    return () => {
      gl.setAnimationLoop(null);
    };
  }, [gl, scene, camera]);

  useEffect(() => {
    composer.current?.setSize(size.width, size.height);
  }, [size]);

  return null;
};
