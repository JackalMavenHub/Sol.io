import React from 'react';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-space-black pointer-events-none">
      {/* Cosmic Blue Orb */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cosmic-blue/20 blur-[140px]"
      />
      
      {/* Copper Orange Orb */}
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-copper-orange/15 blur-[140px]"
      />

      {/* Solar Amber Center Accent */}
      <div
        className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-solar-amber/10 blur-[140px]"
      />
    </div>
  );
}
