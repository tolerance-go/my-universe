import * as THREE from "three";
import { createRoot } from "react-dom/client";
import { useRef, useState } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { FirstPersonControls } from "./core/FirstPersonControls";
import "./index.css";

// 立方体组件
function Box(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((_state, delta) => (ref.current.rotation.x += delta));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

// 星体组件 - 用于营造宇宙感
function Star(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_state, delta) => {
    ref.current.rotation.x += delta * 0.2;
    ref.current.rotation.y += delta * 0.1;
  });
  return (
    <mesh {...props} ref={ref}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
}

// 创建宇宙场景
function UniverseScene() {
  const objects = [];

  // 添加一些立方体作为漂浮物体
  for (let i = 0; i < 15; i++) {
    const x = (Math.random() - 0.5) * 40;
    const y = (Math.random() - 0.5) * 40;
    const z = (Math.random() - 0.5) * 40;
    objects.push(<Box key={`box-${i}`} position={[x, y, z]} />);
  }

  // 添加星星
  for (let i = 0; i < 100; i++) {
    const x = (Math.random() - 0.5) * 100;
    const y = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 100;
    objects.push(<Star key={`star-${i}`} position={[x, y, z]} />);
  }

  return <>{objects}</>;
}

// 使用说明组件
function Instructions() {
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        color: "white",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: "10px",
        borderRadius: "5px",
        zIndex: 1000,
      }}
    >
      <h3>宇宙漂浮体验</h3>
      <p>点击画面锁定鼠标指针</p>
      <p>WASD 或 方向键：移动</p>
      <p>鼠标：环顾四周</p>
      <p>空格键：上升</p>
      <p>左Shift：下降</p>
      <p>ESC：解锁鼠标</p>
      <p>在无限宇宙中自由漂浮！</p>
    </div>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <Instructions />
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{
        width: "100vw",
        height: "100vh",
        display: "block",
        backgroundColor: "#000011", // 深太空色
      }}
      className="h-screen w-screen block"
    >
      {/* 第一视角控制器 */}
      <FirstPersonControls />

      {/* 宇宙光照 - 更柔和的环境光 */}
      <ambientLight intensity={0.2} color="#ffffff" />
      <directionalLight
        position={[20, 20, 20]}
        intensity={0.3}
        color="#ffffff"
      />

      {/* 宇宙场景 */}
      <UniverseScene />

      {/* 深太空雾效 */}
      <fog args={["#000011", 30, 100]} />
    </Canvas>
  </>
);
