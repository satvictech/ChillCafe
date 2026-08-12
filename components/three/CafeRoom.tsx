"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import {
  checkerTexture,
  chalkboardTexture,
  brickTexture,
  marbleTexture,
} from "./textures";

const RED = "#c62128";
const DARK_METAL = "#191818";
const LAMP_GLOW = "#ffcf94";

function Chair({
  position,
  rotation = 0,
}: {
  position: [number, number, number];
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <RoundedBox args={[0.46, 0.06, 0.44]} radius={0.03} smoothness={3} position={[0, 0.45, 0]}>
        <meshStandardMaterial color={RED} roughness={0.44} />
      </RoundedBox>
      <RoundedBox
        args={[0.44, 0.5, 0.055]}
        radius={0.05}
        smoothness={3}
        position={[0, 0.71, -0.2]}
        rotation={[-0.16, 0, 0]}
      >
        <meshStandardMaterial color={RED} roughness={0.44} />
      </RoundedBox>
      {[
        [-0.17, -0.16],
        [0.17, -0.16],
        [-0.17, 0.17],
        [0.17, 0.17],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.22, z]} rotation={[0, 0, x > 0 ? 0.07 : -0.07]}>
          <cylinderGeometry args={[0.014, 0.014, 0.44, 6]} />
          <meshStandardMaterial color={DARK_METAL} metalness={0.55} roughness={0.42} />
        </mesh>
      ))}
    </group>
  );
}

function Table({
  position,
  marble,
}: {
  position: [number, number, number];
  marble: THREE.Texture;
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.74, 0]}>
        <boxGeometry args={[1.05, 0.055, 0.72]} />
        <meshStandardMaterial map={marble} roughness={0.24} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0.37, 0]}>
        <boxGeometry args={[0.07, 0.72, 0.07]} />
        <meshStandardMaterial color={DARK_METAL} metalness={0.5} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.5, 0.04, 0.42]} />
        <meshStandardMaterial color={DARK_METAL} metalness={0.5} roughness={0.45} />
      </mesh>
      <mesh position={[0.34, 0.83, -0.16]}>
        <cylinderGeometry args={[0.035, 0.04, 0.14, 10]} />
        <meshStandardMaterial color="#d02b22" roughness={0.35} />
      </mesh>
    </group>
  );
}

function Pendant({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 2.86, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.66, 5]} />
        <meshStandardMaterial color="#0f0f0f" />
      </mesh>
      <mesh position={[0, 2.46, 0]}>
        <coneGeometry args={[0.27, 0.24, 22, 1, true]} />
        <meshStandardMaterial color={RED} roughness={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 2.37, 0]}>
        <sphereGeometry args={[0.085, 14, 14]} />
        <meshStandardMaterial
          color={LAMP_GLOW}
          emissive={LAMP_GLOW}
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        position={[0, 2.24, 0]}
        color="#ffb469"
        intensity={7.5}
        distance={7.5}
        decay={2}
      />
    </group>
  );
}

function Room() {
  const checker = useMemo(() => checkerTexture(), []);
  const chalk = useMemo(() => chalkboardTexture(), []);
  const brick = useMemo(() => brickTexture(), []);
  const marble = useMemo(() => marbleTexture(), []);

  const W = 10;
  const D = 8;
  const H = 3.2;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial map={checker} roughness={0.34} metalness={0.02} />
      </mesh>

      <mesh position={[0, H / 2, -D / 2]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial map={brick} roughness={0.92} />
      </mesh>

      <mesh position={[0, 1.62, -D / 2 + 0.06]}>
        <planeGeometry args={[3.6, 1.1]} />
        <meshStandardMaterial color="#0b0d10" roughness={0.18} metalness={0.35} />
      </mesh>
      <mesh position={[0, 2.22, -D / 2 + 0.08]}>
        <planeGeometry args={[3.8, 0.06]} />
        <meshStandardMaterial
          color="#ffc247"
          emissive="#ffc247"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[-W / 2, H / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <meshStandardMaterial map={chalk} roughness={0.95} />
      </mesh>

      <group position={[-W / 2 + 0.09, 1.95, -1.1]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <torusGeometry args={[0.32, 0.045, 12, 34]} />
          <meshStandardMaterial color="#c8912f" metalness={0.85} roughness={0.28} />
        </mesh>
        <mesh>
          <circleGeometry args={[0.3, 30]} />
          <meshStandardMaterial
            color="#e8c273"
            emissive="#8a6420"
            emissiveIntensity={0.5}
            roughness={0.4}
            metalness={0.5}
          />
        </mesh>
      </group>

      <mesh position={[W / 2, H / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <meshStandardMaterial color="#2c6330" roughness={1} />
      </mesh>

      {[-W / 2 + 0.3, W / 2 - 0.3].map((x, i) => (
        <mesh key={i} position={[x, H / 2, -D / 2 + 0.22]}>
          <boxGeometry args={[0.5, H, 0.42]} />
          <meshStandardMaterial color="#4a4038" roughness={0.98} />
        </mesh>
      ))}

      <mesh position={[0, H, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color="#131110" roughness={1} />
      </mesh>

      <group position={[-2.7, 0, -D / 2 + 0.55]}>
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[3.1, 0.48, 0.62]} />
          <meshStandardMaterial color="#1d4a45" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.72, -0.24]}>
          <boxGeometry args={[3.1, 0.62, 0.16]} />
          <meshStandardMaterial color="#1d4a45" roughness={0.7} />
        </mesh>
      </group>

      {([
        [-2.7, 0, -1.5],
        [-2.7, 0, 1.4],
        [2.6, 0, -1.5],
        [2.6, 0, 1.4],
      ] as [number, number, number][]).map((p, i) => (
        <Table key={i} position={p} marble={marble} />
      ))}

      <Chair position={[-3.5, 0, -1.5]} rotation={Math.PI / 2} />
      <Chair position={[-1.9, 0, -1.5]} rotation={-Math.PI / 2} />
      <Chair position={[-3.5, 0, 1.4]} rotation={Math.PI / 2} />
      <Chair position={[-1.9, 0, 1.4]} rotation={-Math.PI / 2} />
      <Chair position={[1.8, 0, -1.5]} rotation={Math.PI / 2} />
      <Chair position={[3.4, 0, -1.5]} rotation={-Math.PI / 2} />
      <Chair position={[1.8, 0, 1.4]} rotation={Math.PI / 2} />
      <Chair position={[3.4, 0, 1.4]} rotation={-Math.PI / 2} />

      {[-3.4, -1.7, 0, 1.7, 3.4].map((x) => (
        <Pendant key={x} x={x} z={-0.4} />
      ))}

      <ContactShadows
        position={[0, 0.012, 0]}
        opacity={0.5}
        scale={13}
        blur={2.6}
        far={2.6}
        resolution={512}
        color="#000000"
      />
    </group>
  );
}

export default function CafeRoom({ autoRotate = true }: { autoRotate?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.7]}
      camera={{ position: [0.4, 1.75, 6.4], fov: 44 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        scene.fog = new THREE.Fog("#0a0806", 9, 20);
      }}
    >
      <color attach="background" args={["#0a0806"]} />
      <ambientLight intensity={0.42} color="#ffd9b0" />
      <hemisphereLight intensity={0.24} color="#ffcf9e" groundColor="#2a1d12" />
      <directionalLight position={[3, 5, 6]} intensity={0.35} color="#ffd0a0" />

      <Room />

      <OrbitControls
        target={[0, 1.1, -0.2]}
        enablePan={false}
        enableDamping
        dampingFactor={0.07}
        minDistance={2.6}
        maxDistance={9}
        minPolarAngle={0.55}
        maxPolarAngle={Math.PI / 2.08}
        autoRotate={autoRotate}
        autoRotateSpeed={0.42}
      />
    </Canvas>
  );
}
