'use client'

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text3D } from '../shared/Text3D'
import { useSpring, animated } from '@react-spring/three'

interface PrivacyGameSceneProps {
  category: string
  privacyScore: number
  isComplete: boolean
  demoMode?: boolean
}

// Create a digital house model
const DigitalHouse = ({ category, privacyScore = 0, isComplete = false }) => {
  const groupRef = useRef(null)
  
  // Animation for house security based on privacy score
  const { wallOpacity, roofHeight, shieldSize, glowIntensity } = useSpring({
    wallOpacity: 0.3 + (privacyScore / 100) * 0.7,
    roofHeight: 1 + (privacyScore / 100) * 1,
    shieldSize: 0.5 + (privacyScore / 100) * 0.5,
    glowIntensity: isComplete ? 0.8 : 0.2,
    config: { mass: 1, tension: 280, friction: 60 }
  })
  
  // Get color based on category
  const getCategoryColor = () => {
    switch (category) {
      case 'social-media':
        return '#3b82f6'; // Blue
      case 'mobile-apps':
        return '#10b981'; // Green
      case 'web-browsing':
        return '#f59e0b'; // Amber
      case 'smart-devices':
        return '#8b5cf6'; // Purple
      default:
        return '#8b5cf6'; // Purple
    }
  }
  
  // Gentle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })
  
  return (
    <animated.group ref={groupRef} position={[0, -1, 0]}>
      {/* Base/Ground */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <cylinderGeometry args={[5, 5, 0.5, 32]} />
        <meshStandardMaterial color="#d8b4fe" />
      </mesh>
      
      {/* House foundation */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[4, 0.2, 4]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      
      {/* House walls */}
      <animated.mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial 
          color={getCategoryColor()} 
          transparent 
          opacity={wallOpacity} 
        />
      </animated.mesh>
      
      {/* House roof */}
      <animated.mesh position={[0, 2 + roofHeight / 2, 0]} castShadow>
        <coneGeometry args={[2.5, roofHeight, 4]} />
        <meshStandardMaterial color="#475569" />
      </animated.mesh>
      
      {/* Privacy shield */}
      <animated.group position={[0, 1, 0]}>
        {/* Shield base */}
        <animated.mesh position={[0, 0, 2]} scale={shieldSize}>
          <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial 
            color={getCategoryColor()} 
            transparent 
            opacity={0.6} 
            emissive={getCategoryColor()} 
            emissiveIntensity={glowIntensity} 
          />
        </animated.mesh>
        
        {/* Shield border */}
        <animated.mesh position={[0, 0, 2]} scale={shieldSize}>
          <torusGeometry args={[1, 0.05, 16, 32, Math.PI]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff" 
            emissiveIntensity={0.5} 
          />
        </animated.mesh>
      </animated.group>
      
      {/* Data leaks (decrease as privacy score increases) */}
      {Array.from({ length: Math.max(1, Math.round(10 * (1 - privacyScore / 100))) }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2
        const radius = 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const leakSize = 0.2 + (1 - privacyScore / 100) * 0.3
        
        return (
          <group key={i} position={[x, 1, z]}>
            <mesh castShadow>
              <sphereGeometry args={[leakSize, 16, 16]} />
              <meshStandardMaterial 
                color="#ef4444" 
                emissive="#ef4444" 
                emissiveIntensity={0.3} 
              />
            </mesh>
          </group>
        )
      })}
      
      {/* Privacy score indicator */}
      <mesh position={[0, -0.1, 3.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 0.3]} />
        <meshBasicMaterial color="#1e293b" transparent opacity={0.7} />
      </mesh>
      
      <mesh position={[0, -0.09, 3.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[(privacyScore / 100) * 2.9, 0.2]} />
        <meshBasicMaterial color={getCategoryColor()} />
      </mesh>
      
      {/* Digital devices around the house */}
      {/* Smartphone */}
      <mesh position={[-1.5, 0.3, 1.5]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <boxGeometry args={[0.3, 0.6, 0.05]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      
      {/* Laptop */}
      <group position={[1.5, 0.3, 1.5]} rotation={[0, -Math.PI / 4, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.05, 0.5]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0, 0.25, -0.25]} rotation={[Math.PI / 4, 0, 0]} castShadow>
          <boxGeometry args={[0.8, 0.5, 0.05]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
      </group>
      
      {/* Smart speaker */}
      <mesh position={[0, 0.3, -1.5]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.4, 16]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </animated.group>
  )
}

// Create a digital environment
const DigitalEnvironment = ({ children }) => {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f5d0fe" />
      </mesh>
      
      {/* Digital grid background */}
      <mesh position={[0, 0, -10]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial 
          color="#2e1065" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>
      
      {/* Digital particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh 
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10 + 5,
            (Math.random() - 0.5) * 10 - 5
          ]}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial 
            color={`hsl(${Math.floor(Math.random() * 360)}, 100%, 75%)`} 
            emissive={`hsl(${Math.floor(Math.random() * 360)}, 100%, 75%)`} 
            emissiveIntensity={0.5} 
          />
        </mesh>
      ))}
      
      {children}
    </group>
  )
}

export function PrivacyGameScene({ category, privacyScore, isComplete, demoMode = false }: PrivacyGameSceneProps) {
  // Use demo values if in demo mode
  const score = demoMode ? 50 : privacyScore
  const complete = demoMode ? false : isComplete
  const scenarioCategory = demoMode ? 'social-media' : category
  
  // Get category name for display
  const getCategoryName = () => {
    switch (scenarioCategory) {
      case 'social-media':
        return 'Social Media';
      case 'mobile-apps':
        return 'Mobile Apps';
      case 'web-browsing':
        return 'Web Browsing';
      case 'smart-devices':
        return 'Smart Devices';
      default:
        return 'Digital Privacy';
    }
  };
  
  return (
    <DigitalEnvironment>
      {/* Scene title */}
      <Text3D position={[0, 3, 0]} fontSize={0.4} color="#ffffff">
        {getCategoryName()} Privacy
      </Text3D>
      
      {/* Digital house */}
      <DigitalHouse 
        category={scenarioCategory} 
        privacyScore={score} 
        isComplete={complete} 
      />
      
      {/* Privacy score indicator */}
      <Text3D position={[0, -2.5, 3.5]} fontSize={0.2} color="#ffffff">
        Privacy Score: {score}%
      </Text3D>
      
      {/* Demo mode instructions */}
      {demoMode && (
        <Text3D position={[0, -3, 0]} fontSize={0.2} color="#ffffff">
          Configure privacy settings to protect your digital home
        </Text3D>
      )}
      
      {/* Completion message */}
      {complete && (
        <Text3D position={[0, 4, 0]} fontSize={0.3} color="#a855f7">
          Privacy Protected!
        </Text3D>
      )}
    </DigitalEnvironment>
  )
}
