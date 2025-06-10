import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// 第一视角控制器组件
export function FirstPersonControls() {
  const { camera, gl } = useThree();
  
  // 移动状态
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
  });

  // 鼠标控制状态
  const mouseState = useRef({
    isLocked: false,
  });

  // 移动速度和鼠标灵敏度
  const moveSpeed = 8;
  const mouseSensitivity = 0.002;
  
  // 移动方向向量
  const direction = useRef(new THREE.Vector3());
  const frontVector = useRef(new THREE.Vector3());
  const sideVector = useRef(new THREE.Vector3());

  // 欧拉角用于旋转
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));

  // 鼠标事件处理
  useEffect(() => {
    const handlePointerLock = () => {
      gl.domElement.requestPointerLock();
    };

    const handlePointerLockChange = () => {
      mouseState.current.isLocked = document.pointerLockElement === gl.domElement;
      
      // 设置光标样式
      gl.domElement.style.cursor = mouseState.current.isLocked ? 'none' : 'pointer';
    };

    const handlePointerLockError = () => {
      console.log('指针锁定失败');
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!mouseState.current.isLocked) return;

      const { movementX, movementY } = event;
      
      euler.current.setFromQuaternion(camera.quaternion);
      euler.current.y -= movementX * mouseSensitivity;
      euler.current.x -= movementY * mouseSensitivity;
      
      // 限制垂直旋转角度（防止翻转）
      euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x));
      
      camera.quaternion.setFromEuler(euler.current);
    };

    // 处理ESC键解锁
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape' && mouseState.current.isLocked) {
        document.exitPointerLock();
      }
    };

    // 点击画布锁定鼠标
    gl.domElement.addEventListener('click', handlePointerLock);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('pointerlockerror', handlePointerLockError);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      gl.domElement.removeEventListener('click', handlePointerLock);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('pointerlockerror', handlePointerLockError);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [camera, gl]);

  // 键盘移动事件处理
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          moveState.current.forward = true;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          moveState.current.left = true;
          break;
        case 'ArrowDown':
        case 'KeyS':
          moveState.current.backward = true;
          break;
        case 'ArrowRight':
        case 'KeyD':
          moveState.current.right = true;
          break;
        case 'Space':
          event.preventDefault(); // 防止页面滚动
          moveState.current.up = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          moveState.current.down = true;
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          moveState.current.forward = false;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          moveState.current.left = false;
          break;
        case 'ArrowDown':
        case 'KeyS':
          moveState.current.backward = false;
          break;
        case 'ArrowRight':
        case 'KeyD':
          moveState.current.right = false;
          break;
        case 'Space':
          moveState.current.up = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          moveState.current.down = false;
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // 每帧更新移动
  useFrame((_state, delta) => {
    // 计算前后移动
    frontVector.current.set(0, 0, Number(moveState.current.backward) - Number(moveState.current.forward));
    // 计算左右移动
    sideVector.current.set(Number(moveState.current.left) - Number(moveState.current.right), 0, 0);
    
    // 合并移动方向并标准化
    direction.current
      .subVectors(frontVector.current, sideVector.current)
      .normalize()
      .multiplyScalar(moveSpeed * delta);

    // 如果有移动输入，则应用移动
    if (direction.current.length() > 0) {
      // 应用相机的完整旋转到移动方向（包括上下旋转）
      direction.current.applyQuaternion(camera.quaternion);
      // 更新相机位置
      camera.position.add(direction.current);
    }
    
    // 垂直移动（不受相机旋转影响）
    if (moveState.current.up) {
      camera.position.y += moveSpeed * delta;
    }
    if (moveState.current.down) {
      camera.position.y -= moveSpeed * delta;
    }
  });

  return null; // 不需要渲染任何内容
} 