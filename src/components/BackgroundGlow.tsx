import React from 'react';

export const BackgroundGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base Warm Dark Atmospheric Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B12] via-[#12101A] to-[#17131F]" />

      {/* Grid & Noise Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Ambient Radial Lighting Orbs */}
      {/* Top-Left: Violet + Pink Glow */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-violet-600/25 blur-[160px] animate-pulse-glow" />
      <div className="absolute -top-20 left-20 w-[500px] h-[500px] rounded-full bg-rose-500/20 blur-[150px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Top-Right: Peach + Amber Glow */}
      <div className="absolute -top-30 -right-30 w-[650px] h-[650px] rounded-full bg-amber-500/20 blur-[170px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      <div className="absolute top-20 right-20 w-[450px] h-[450px] rounded-full bg-orange-400/15 blur-[140px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* Bottom: Deep Purple + Warm Cyan Glow */}
      <div className="absolute bottom-10 left-1/3 w-[700px] h-[700px] rounded-full bg-purple-600/20 blur-[180px] animate-pulse-glow" style={{ animationDelay: '5s' }} />
      <div className="absolute -bottom-30 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-400/15 blur-[160px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Subtle Dot Matrix Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-dot-matrix opacity-20" />
    </div>
  );
};

