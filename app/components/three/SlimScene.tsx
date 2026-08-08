"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────────────────
   BWT Slim — scroll-driven 3D exploded view of the 6 filtration stages.

   The model is authored from primitives on purpose: a single imported mesh
   could not be pulled apart, and the whole point of this scene is that each
   stage is its own object that slides out of the housing and lights up as
   the reader scrolls through the corresponding copy.

   Stage order matches messages/*.json → technology.stages:
   0 механика · 1 уголь · 2 умягчение · 3 UF-мембрана · 4 магний · 5 полировка
   ───────────────────────────────────────────────────────────────────────── */

const NAVY = "#001d46";
const PINK = "#f087b6";
const PINK_DIM = "#c4527f";

const STAGE_COUNT = 6;
const LAYER_H = 0.34;
const LAYER_R = 0.62;
const STACK_GAP = 0.06;

/** Y position of stage i inside the stack (top = stage 0, water flows down). */
function layerY(i: number) {
  const total = STAGE_COUNT * (LAYER_H + STACK_GAP) - STACK_GAP;
  return total / 2 - LAYER_H / 2 - i * (LAYER_H + STACK_GAP);
}

const damp = THREE.MathUtils.damp;

/* ── Stage internals ─────────────────────────────────────────────────────── */

/** 01 — mechanical mesh: radial spokes + outer ring. */
function MeshStage({ tint }: { tint: THREE.Color }) {
  const spokes = useMemo(() => Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2), []);
  return (
    <group>
      <mesh>
        <torusGeometry args={[LAYER_R * 0.82, 0.035, 6, 28]} />
        <meshStandardMaterial color={tint} metalness={0.6} roughness={0.3} />
      </mesh>
      {spokes.map((a, i) => (
        <mesh key={i} rotation={[0, 0, a]}>
          <boxGeometry args={[LAYER_R * 1.62, 0.03, 0.03]} />
          <meshStandardMaterial color={tint} metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

/** Granular fill (carbon, resin) — instanced spheres in a disc volume. */
function Granules({
  count,
  color,
  radius,
  seed,
}: {
  count: number;
  color: string;
  radius: number;
  seed: number;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const matrices = useMemo(() => {
    // Deterministic pseudo-random so SSR/CSR and reloads look identical.
    let s = seed;
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    const out: THREE.Matrix4[] = [];
    const m = new THREE.Matrix4();
    for (let i = 0; i < count; i++) {
      const a = rnd() * Math.PI * 2;
      const r = Math.sqrt(rnd()) * radius;
      const y = (rnd() - 0.5) * (LAYER_H * 0.66);
      const sc = 0.045 + rnd() * 0.035;
      m.compose(
        new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r),
        new THREE.Quaternion(),
        new THREE.Vector3(sc, sc, sc),
      );
      out.push(m.clone());
    }
    return out;
  }, [count, radius, seed]);

  useMemo(() => {
    const inst = ref.current;
    if (!inst) return;
    matrices.forEach((m, i) => inst.setMatrixAt(i, m));
    inst.instanceMatrix.needsUpdate = true;
  }, [matrices]);

  return (
    <instancedMesh
      ref={(node) => {
        ref.current = node;
        if (node) {
          matrices.forEach((m, i) => node.setMatrixAt(i, m));
          node.instanceMatrix.needsUpdate = true;
        }
      }}
      args={[undefined, undefined, count]}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
    </instancedMesh>
  );
}

/** 04 — UF membrane: dense vertical hollow fibres. */
function FibreStage() {
  const fibres = useMemo(() => {
    const out: [number, number][] = [];
    for (let ring = 1; ring <= 3; ring++) {
      const n = ring * 8;
      const r = (LAYER_R * 0.78 * ring) / 3;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        out.push([Math.cos(a) * r, Math.sin(a) * r]);
      }
    }
    return out;
  }, []);
  return (
    <group>
      {fibres.map(([x, z], i) => (
        <mesh key={i} position={[x, 0, z]}>
          <cylinderGeometry args={[0.018, 0.018, LAYER_H * 0.9, 6]} />
          <meshStandardMaterial color="#eaf2ff" roughness={0.35} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

/** 05 — magnesium: glowing core. */
function MagnesiumStage({ glow }: { glow: number }) {
  return (
    <mesh>
      <icosahedronGeometry args={[LAYER_R * 0.45, 0]} />
      <meshStandardMaterial
        color={PINK}
        emissive={PINK}
        emissiveIntensity={0.5 + glow * 1.6}
        roughness={0.25}
        metalness={0.2}
      />
    </mesh>
  );
}

/* ── One stage disc ──────────────────────────────────────────────────────── */

function StageLayer({
  index,
  active,
  progressTo,
}: {
  index: number;
  active: boolean;
  progressTo: number;
}) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const [glow, setGlow] = useState(0);

  const baseY = layerY(index);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    // Active stage slides out toward the viewer and lifts slightly.
    const targetX = active ? 0.98 : 0;
    const targetZ = active ? 0.35 : 0;
    const targetS = active ? 1.12 : 0.98;
    g.position.x = damp(g.position.x, targetX, 4, dt);
    g.position.z = damp(g.position.z, targetZ, 4, dt);
    g.position.y = damp(g.position.y, baseY + (active ? 0.06 : 0), 4, dt);
    const s = damp(g.scale.x, targetS, 4, dt);
    g.scale.setScalar(s);
    g.rotation.y += active ? dt * 0.35 : dt * 0.05;

    const target = active ? 1 : 0;
    setGlow((v) => (Math.abs(v - target) < 0.01 ? target : damp(v, target, 4, dt)));

    const mat = shell.current?.material as THREE.MeshStandardMaterial | undefined;
    if (mat) {
      mat.opacity = damp(mat.opacity, active ? 0.3 : 0.12, 4, dt);
      mat.emissiveIntensity = damp(mat.emissiveIntensity, active ? 0.55 : 0.04, 4, dt);
    }
  });

  const tint = useMemo(() => new THREE.Color(active ? PINK : "#9fb0c9"), [active]);

  return (
    <group ref={group} position={[0, baseY, 0]}>
      {/* translucent cartridge shell */}
      <mesh ref={shell}>
        <cylinderGeometry args={[LAYER_R, LAYER_R, LAYER_H, 28, 1, true]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={PINK}
          emissiveIntensity={0.04}
          transparent
          opacity={0.12}
          roughness={0.15}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* top / bottom rims */}
      {[LAYER_H / 2, -LAYER_H / 2].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[LAYER_R, active ? 0.024 : 0.014, 6, 30]} />
          <meshStandardMaterial
            color={active ? PINK : "#8fa0b8"}
            emissive={active ? PINK : "#000000"}
            emissiveIntensity={active ? 0.4 : 0}
            metalness={0.35}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* stage-specific internals */}
      {index === 0 && <MeshStage tint={tint} />}
      {index === 1 && <Granules count={64} color="#2b2f36" radius={LAYER_R * 0.78} seed={7} />}
      {index === 2 && <Granules count={64} color="#e6c98f" radius={LAYER_R * 0.78} seed={23} />}
      {index === 3 && <FibreStage />}
      {index === 4 && <MagnesiumStage glow={glow} />}
      {index === 5 && (
        <mesh>
          <cylinderGeometry args={[LAYER_R * 0.7, LAYER_R * 0.7, LAYER_H * 0.6, 24]} />
          <meshStandardMaterial
            color="#dff1ff"
            transparent
            opacity={0.55}
            roughness={0.08}
            metalness={0.1}
          />
        </mesh>
      )}

      {/* connector between stages (hidden while pulled out) */}
      {index < STAGE_COUNT - 1 && progressTo < 1 && (
        <mesh position={[0, -LAYER_H / 2 - STACK_GAP / 2, 0]}>
          <cylinderGeometry args={[0.07, 0.07, STACK_GAP, 12]} />
          <meshStandardMaterial color="#b9c4d4" metalness={0.5} roughness={0.4} />
        </mesh>
      )}
    </group>
  );
}

/* ── Water droplets falling through the column ───────────────────────────── */

function WaterFlow({ active }: { active: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const COUNT = 34;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () => Array.from({ length: COUNT }, (_, i) => ({ off: (i / COUNT), a: (i * 2.399) % (Math.PI * 2), r: 0.1 + ((i * 37) % 30) / 100 })),
    [],
  );
  const top = layerY(0) + LAYER_H;
  const bottom = layerY(STAGE_COUNT - 1) - LAYER_H;
  const span = top - bottom;

  useFrame((state) => {
    const inst = ref.current;
    if (!inst) return;
    const t = state.clock.elapsedTime;
    seeds.forEach((s, i) => {
      const p = (t * 0.16 + s.off) % 1;
      const y = top - p * span;
      dummy.position.set(Math.cos(s.a) * s.r, y, Math.sin(s.a) * s.r);
      const sc = 0.035 + 0.02 * Math.sin(p * Math.PI);
      dummy.scale.setScalar(sc);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    });
    inst.instanceMatrix.needsUpdate = true;
    const mat = inst.material as THREE.MeshStandardMaterial;
    // Water gets visibly cleaner as the reader moves down the stages.
    mat.color.lerpColors(new THREE.Color("#8fa2b8"), new THREE.Color("#bfe6ff"), active / (STAGE_COUNT - 1));
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#9fb4c9" roughness={0.1} metalness={0.1} transparent opacity={0.85} />
    </instancedMesh>
  );
}

/* ── Housing silhouette (reads as the real BWT Slim product) ─────────────── */

function Housing() {
  const top = layerY(0) + LAYER_H / 2;
  const bottom = layerY(STAGE_COUNT - 1) - LAYER_H / 2;
  const height = top - bottom;
  const rails = [-1, 1];

  return (
    <group>
      {/* head unit — the recognisable white BWT Slim cap */}
      <RoundedBox
        args={[1.5, 0.62, 1.0]}
        radius={0.14}
        smoothness={4}
        position={[0, top + 0.42, 0]}
      >
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.66}
          roughness={0.16}
          metalness={0.04}
        />
      </RoundedBox>
      {/* inlet stub on top of the head */}
      <mesh position={[0, top + 0.85, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.28, 18]} />
        <meshStandardMaterial color="#e7ecf4" metalness={0.4} roughness={0.35} />
      </mesh>

      {/* base */}
      <RoundedBox
        args={[1.5, 0.28, 1.0]}
        radius={0.09}
        smoothness={4}
        position={[0, bottom - 0.24, 0]}
      >
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.58}
          roughness={0.2}
          metalness={0.04}
        />
      </RoundedBox>

      {/* side rails that frame the stack as one product */}
      {rails.map((s) => (
        <mesh key={s} position={[s * 0.78, (top + bottom) / 2, 0]}>
          <cylinderGeometry args={[0.045, 0.045, height + 0.5, 12]} />
          <meshStandardMaterial color="#c7d1e0" metalness={0.55} roughness={0.35} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Rig: slow auto-rotation + gentle pointer parallax ───────────────────── */

function Rig({ active }: { active: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const { x, y } = state.pointer;
    g.rotation.y = damp(g.rotation.y, x * 0.35 + state.clock.elapsedTime * 0.06, 3, dt);
    g.rotation.x = damp(g.rotation.x, -y * 0.16, 3, dt);
    // Follow the active stage vertically so it stays framed.
    const targetY = -layerY(active) * 0.65;
    g.position.y = damp(g.position.y, targetY, 2.5, dt);
  });

  return (
    <group ref={group}>
      <Housing />
      {Array.from({ length: STAGE_COUNT }, (_, i) => (
        <StageLayer key={i} index={i} active={i === active} progressTo={i < active ? 1 : 0} />
      ))}
      <WaterFlow active={active} />
    </group>
  );
}

/* ── Public component ────────────────────────────────────────────────────── */

export default function SlimScene({
  active,
  paused = false,
}: {
  active: number;
  paused?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={paused ? "never" : "always"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0.3, 0.25, 7.1], fov: 41 }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={[NAVY]} />
      <fog attach="fog" args={[NAVY, 10, 18]} />

      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, 2, -3]} intensity={0.7} color={PINK_DIM} />
      <directionalLight position={[0, 1.5, 7]} intensity={0.85} color="#eaf2ff" />
      <pointLight position={[1.6, 0, 2.4]} intensity={14} distance={9} color={PINK} />

      <Rig active={active} />
    </Canvas>
  );
}

export type SlimSceneProps = ThreeElements extends never ? never : { active: number; paused?: boolean };
