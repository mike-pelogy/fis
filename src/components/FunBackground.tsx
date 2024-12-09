import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Color } from "three";

const fragmentShader = `
varying vec2 vUv;

uniform float u_time;
uniform float u_rand;

uniform vec3 u_colorBlue;
uniform vec3 u_colorTeal;
uniform vec3 u_colorPurple;

vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main() {
  float strength = cnoise((vUv - (u_time / 30.0)) * 2.75);
  float strength2 = cnoise((vUv * 5.0) + u_time / 15.0 * u_rand);
  float strength3 = cnoise((vUv * 4.0) + u_time / 10.0);
  float strength4 = cnoise((vUv * 7.0) - u_time / 3.0 * u_rand);

  vec3 mixedColor = mix(u_colorTeal, u_colorBlue, strength);
  vec3 mixedColor11 = mix(mixedColor, u_colorBlue, strength3);
  vec3 mixedColor22 = mix(mixedColor, u_colorPurple, strength2);
  vec3 mixedFinal = mix(mixedColor11, mixedColor22, strength4);

  gl_FragColor = vec4(mixedFinal, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`;

function Plane(props) {
  const meshRef = useRef();

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_rand: {
        value: Math.random(),
      },
      // these colors are at 25%
      // blue
      u_colorBlue: { value: new Color("#BBD6FA") },
      // teal
      u_colorTeal: { value: new Color("#C6F5FF") },
      // purple
      u_colorPurple: { value: new Color("#C2CAF1") },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      meshRef.current.material.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  const viewport = useThree((state) => state.viewport);
  return (
    <mesh {...props} ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function FunBackground() {
  return (
    <Canvas orthographic>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <Plane position={[0, 0, 0]} scale={1.0} />
    </Canvas>
  );
}
