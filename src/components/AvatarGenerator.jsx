import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useState } from 'react';

function Avatar({ config }) {
  const { scene } = useGLTF('/Avatar.glb');

  scene.traverse((child) => {
    if (child.isMesh && config.color) {
      child.material.color.set(config.color);
    }
  });

  return <primitive object={scene} scale={config.scale} />;
}

export default function AvatarGenerator() {
  const [config, setConfig] = useState({ color: '#ffffff', scale: 0.8 });

  return (
  <div className="flex flex-col h-screen bg-gray-600 text-white">
  {/* Canvas area — take ~90% of screen */}
  <div className="flex-grow-[9]">      
    <Canvas className="w-full h-2/3" camera={{ position: [1, 1, 1] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Avatar config={config} />
          <OrbitControls />
        </Suspense>
      </Canvas>
      </div>
       <div className="flex-grow-[1] p-4 bg-gray-800 flex flex-col gap-4 items-center justify-center">
    <div>
      <label className="block text-sm font-medium mb-1">Color</label>
      <input
        type="color"
        value={config.color}
        onChange={(e) => setConfig({ ...config, color: e.target.value })}
        className="w-full h-10 p-0 border-none rounded"
      />
    </div>
    <div className="w-full max-w-md">
      <label className="block text-sm font-medium mb-1">Scale</label>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={config.scale}
        onChange={(e) => setConfig({ ...config, scale: parseFloat(e.target.value) })}
        className="w-full"
      />
    </div>
  </div>
    </div>
  );
}
