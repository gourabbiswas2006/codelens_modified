import React from 'react';
import { Sparkles, Upload, Search, ArrowRight, ShieldCheck, FileCheck2, Cpu } from 'lucide-react';
import { Mode } from '../types';

interface HeroSectionProps {
  onSelectMode: (mode: Mode) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectMode }) => {
  return (
    <section className="relative overflow-hidden py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-white/12 shadow-2xl">
        
        {/* Soft Warm Radial Lighting Accents */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-rose-200 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
            <span>Smart Document & Code Intelligence</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-50 leading-tight font-sans">
            Turn messy information{' '}
            <span className="shimmer-text-warm font-extrabold">into clear intelligence.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
            CodeLens helps you understand documents, uncover insights, and verify compliance — without digging through pages.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onSelectMode('knowledge')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-rose-500 hover:from-violet-500 hover:to-rose-400 text-white text-xs font-bold flex items-center gap-2.5 shadow-xl shadow-violet-600/30 transition-all active:scale-95 cursor-pointer border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Start Exploring</span>
            </button>

            <button
              onClick={() => onSelectMode('documents')}
              className="px-6 py-3.5 rounded-2xl bg-white/8 hover:bg-white/14 text-stone-200 text-xs font-semibold border border-white/12 flex items-center gap-2 transition-all active:scale-95 cursor-pointer backdrop-blur-md"
            >
              <Upload className="w-4 h-4 text-rose-300" />
              <span>Bring your documents</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
            </button>
          </div>

          {/* Floating Metric Badges */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-sm">
              <p className="text-stone-400 font-medium">Line Sync</p>
              <p className="text-amber-100 font-mono font-bold text-sm">1-Based Precision</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-sm">
              <p className="text-stone-400 font-medium">Compliance Check</p>
              <p className="text-emerald-300 font-mono font-bold text-sm">87% Verified</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-sm">
              <p className="text-stone-400 font-medium">Security</p>
              <p className="text-rose-300 font-mono font-bold text-sm">Secure Server Route</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-sm">
              <p className="text-stone-400 font-medium">AI Engine</p>
              <p className="text-violet-300 font-mono font-bold text-sm">Gemini Powered</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

