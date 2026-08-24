import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Lightformer, Sparkles, ContactShadows, useGLTF } from "@react-three/drei";

function OscarModel() {
    const { scene } = useGLTF("/models/oscar.glb");
    const group = useRef();

    const statue = useMemo(() => {
        const clone = scene.clone(true);
        const gold = new THREE.MeshStandardMaterial({
            color: "#d4af37",
            metalness: 1,
            roughness: 0.22,
            envMapIntensity: 1.35,
        });
        clone.traverse((o) => {
            if (o.isMesh) o.material = gold;
        });
        return clone;
    }, [scene]);

    useFrame((state) => {
        if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.22;
    });

    return (
        <group ref={group} position={[0, -1.75, 0]} scale={1.05}>
            <primitive object={statue} />
        </group>
    );
}

useGLTF.preload("/models/oscar.glb");

export default function Statuette3D() {
    return (
        <Canvas
            data-testid="hero-3d-canvas"
            camera={{ position: [0, 1.5, 8.4], fov: 38 }}
            dpr={[1, 1.75]}
            gl={{ antialias: true, alpha: true }}
        >
            <ambientLight intensity={0.25} />
            <directionalLight position={[6, 6, 4]} intensity={1.4} color="#fff3d0" />
            <spotLight position={[-6, 8, 2]} angle={0.5} penumbra={1} intensity={1.1} color="#d4af37" />
            <Suspense fallback={null}>
                <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.7}>
                    <OscarModel />
                </Float>
                <Environment resolution={256}>
                    <Lightformer intensity={2.2} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} color="#fff6dd" />
                    <Lightformer intensity={3} color="#f3e5ab" position={[-5, 1, -1]} scale={[2, 5, 1]} />
                    <Lightformer intensity={3.5} color="#d4af37" position={[5, 2, 1]} scale={[2, 6, 1]} />
                    <Lightformer intensity={1.4} color="#9db4e8" position={[0, 2, 6]} scale={[8, 2, 1]} />
                </Environment>
            </Suspense>
            <Sparkles count={90} scale={[9, 7, 4]} size={2.2} speed={0.25} color="#f3e5ab" opacity={0.55} position={[0, 1.2, 0]} />
            <ContactShadows position={[0, -1.78, 0]} opacity={0.5} scale={12} blur={2.6} far={4} color="#000000" />
        </Canvas>
    );
}
