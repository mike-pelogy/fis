import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const fragmentShader = `
varying vec2 vUv;

vec3 colorA = vec3(0.912,0.191,0.652);
vec3 colorB = vec3(1.000,0.777,0.052);

void main() {
  vec3 color = mix(colorA, colorB, vUv.x);

  gl_FragColor = vec4(color,1.0);
}
`;

const vertexShader = `
void main() {
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}`;

function Plane(props) {
  const meshRef = useRef();
  useFrame((_, delta) => {});
  return (
    <mesh {...props} ref={meshRef}>
      <planeGeometry />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
      />
    </mesh>
  );
}

export default function FunBackground() {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Plane position={[-1.2, 0, 0]} />
    </Canvas>
  );
}
