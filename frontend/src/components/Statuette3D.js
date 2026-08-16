import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Lightformer, Sparkles, ContactShadows } from "@react-three/drei";

const GOLD = { color: "#d4af37", metalness: 1, roughness: 0.18 };

function Statuette() {
    const group = useRef();
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.elapsedTime * 0.22;
        }
    });
    return (
        <group ref={group} position={[0, -1.7, 0]}>
            {/* film-reel base */}
            <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[1.15, 1.3, 0.2, 64]} />
                <meshStandardMaterial color="#0c101c" metalness={0.9} roughness={0.35} />
            </mesh>
            <mesh position={[0, 0.28, 0]}>
                <cylinderGeometry args={[0.95, 1.08, 0.18, 64]} />
                <meshStandardMaterial {...GOLD} roughness={0.28} />
            </mesh>
            {/* pedestal */}
            <mesh position={[0, 0.52, 0]}>
                <cylinderGeometry args={[0.5, 0.78, 0.32, 64]} />
                <meshStandardMaterial {...GOLD} />
            </mesh>
            {/* lower robe */}
            <mesh position={[0, 1.2, 0]}>
                <cylinderGeometry args={[0.2, 0.36, 1.15, 32]} />
                <meshStandardMaterial {...GOLD} />
            </mesh>
            {/* torso */}
            <mesh position={[0, 2.1, 0]}>
                <capsuleGeometry args={[0.27, 0.85, 8, 32]} />
                <meshStandardMaterial {...GOLD} />
            </mesh>
            {/* shoulders */}
            <mesh position={[0, 2.62, 0]} scale={[1.55, 0.42, 0.75]}>
                <sphereGeometry args={[0.34, 32, 32]} />
                <meshStandardMaterial {...GOLD} />
            </mesh>
            {/* head */}
            <mesh position={[0, 3.02, 0]}>
                <sphereGeometry args={[0.24, 32, 32]} />
                <meshStandardMaterial {...GOLD} roughness={0.1} />
            </mesh>
            {/* arms angled to sword */}
            <mesh position={[-0.33, 2.35, 0.12]} rotation={[0.65, 0, 0.55]}>
                <capsuleGeometry args={[0.07, 0.65, 8, 16]} />
                <meshStandardMaterial {...GOLD} />
            </mesh>
            <mesh position={[0.33, 2.35, 0.12]} rotation={[0.65, 0, -0.55]}>
                <capsuleGeometry args={[0.07, 0.65, 8, 16]} />
                <meshStandardMaterial {...GOLD} />
            </mesh>
            {/* crusader sword held before the body */}
            <mesh position={[0, 2.1, 0.3]}>
                <boxGeometry args={[0.06, 1.55, 0.025]} />
                <meshStandardMaterial {...GOLD} roughness={0.08} />
            </mesh>
            <mesh position={[0, 2.34, 0.3]}>
                <sphereGeometry args={[0.085, 16, 16]} />
                <meshStandardMaterial {...GOLD} />
            </mesh>
            <mesh position={[0, 1.86, 0.3]}>
                <sphereGeometry args={[0.085, 16, 16]} />
                <meshStandardMaterial {...GOLD} />
            </mesh>
        </group>
    );
}

export default function Statuette3D() {
    return (
        <Canvas
            data-testid="hero-3d-canvas"
            camera={{ position: [0, 1.6, 8.2], fov: 38 }}
            dpr={[1, 1.75]}
            gl={{ antialias: true, alpha: true }}
        >
            <ambientLight intensity={0.25} />
            <directionalLight position={[6, 6, 4]} intensity={1.4} color="#fff3d0" />
            <spotLight position={[-6, 8, 2]} angle={0.5} penumbra={1} intensity={1.1} color="#d4af37" />
            <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.9}>
                <Statuette />
            </Float>
            <Sparkles count={90} scale={[9, 7, 4]} size={2.2} speed={0.25} color="#f3e5ab" opacity={0.55} position={[0, 1.2, 0]} />
            <ContactShadows position={[0, -1.8, 0]} opacity={0.5} scale={12} blur={2.6} far={4} color="#000000" />
            <Environment resolution={256}>
                <Lightformer intensity={2.2} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} color="#fff6dd" />
                <Lightformer intensity={3} color="#f3e5ab" position={[-5, 1, -1]} scale={[2, 5, 1]} />
                <Lightformer intensity={3.5} color="#d4af37" position={[5, 2, 1]} scale={[2, 6, 1]} />
                <Lightformer intensity={1.4} color="#9db4e8" position={[0, 2, 6]} scale={[8, 2, 1]} />
            </Environment>
        </Canvas>
    );
}
