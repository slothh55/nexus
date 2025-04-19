'use client'

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Simple rotating box component without using drei
function RotatingBox({ onBoxClick }: { onBoxClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Rotate the box on each frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  // Handle click with small delay to prevent double clicks
  const handleClick = () => {
    if (!clicked) {
      setClicked(true)
      onBoxClick()
      setTimeout(() => setClicked(false), 300)
    }
  }

  return (
    <mesh
      ref={meshRef}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial 
        color={hovered ? '#ff9f00' : '#6366f1'} 
        emissive={clicked ? '#ff0000' : '#000000'}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

// Simple camera controls
function CameraControls() {
  const { camera, gl } = useFrame((state) => {
    const { camera } = state
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 5
    camera.position.z = Math.cos(state.clock.elapsedTime * 0.1) * 5
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Main Three.js scene without using drei
export default function ThreeComponents({ onBoxClick }: { onBoxClick: () => void }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <RotatingBox onBoxClick={onBoxClick} />
      <CameraControls />
    </Canvas>
  )
}
