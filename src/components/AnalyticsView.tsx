import React from 'react';
import { BarChart3, FileCheck, MessageSquare, Shield, Activity, Cpu, CheckCircle } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const metrics = [
    {
      title: 'Documents & Code Files Processed',
      value: '1,284',
      change: '+14.2% this week',
      icon: FileCheck,
      color: 'text-indigo-400'
    },
    {
      title: 'Questions Answered by AI',
      value: '4,910',
      change: '+22.8% this week',
      icon: MessageSquare,
      color: 'text-cyan-400'
    },
    {
      title: 'Overall Compliance Score',
      value: '88%',
      change: 'Verified Compliant',
      icon: Shield,
      color: 'text-emerald-400'
    },
    {
      title: 'Knowledge Base Coverage',
      value: '99.4%',
      change: '1-Based Line Sync',
      icon: Activity,
      color: 'text-violet-400'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const IconComp = m.icon;
          return (
            <div
              key={idx}
              className="glass-card glass-card-hover p-5 rounded-3xl border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{m.title}</span>
                <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${m.color}`}>
                  <IconComp className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-white font-mono">{m.value}</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {m.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Visualizers (Glass Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Knowledge & Code Indexing Trends Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Document & Code Processing Velocity</h3>
              <p className="text-xs text-slate-400">Weekly analysis volume and line sync rate</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-[10px] font-mono border border-indigo-500/30">
              Real-time
            </span>
          </div>

          {/* Minimal Glass Bar Chart */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-white/10">
            {[40, 65, 55, 80, 95, 75, 110].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  style={{ height: `${val}px` }}
                  className="w-full rounded-t-xl bg-gradient-to-t from-indigo-600 via-violet-500 to-cyan-400 group-hover:brightness-125 transition-all shadow-lg shadow-indigo-500/20"
                />
                <span className="text-[10px] font-mono text-slate-500">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Average Processing Time: 340ms</span>
            <span className="text-emerald-400">100% Stateless Security</span>
          </div>
        </div>

        {/* System Health & Language Coverage */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Language & Syntax Breakdown</h3>
              <p className="text-xs text-slate-400">Code explanation distribution</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
              9 Languages
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { lang: 'JavaScript / TypeScript', pct: 45, color: 'bg-indigo-500' },
              { lang: 'Python', pct: 28, color: 'bg-cyan-500' },
              { lang: 'C++ / Java', pct: 15, color: 'bg-violet-500' },
              { lang: 'SQL / Go / Rust', pct: 12, color: 'bg-emerald-500' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">{item.lang}</span>
                  <span className="text-slate-400">{item.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-900 border border-white/5 overflow-hidden">
                  <div
                    style={{ width: `${item.pct}%` }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>All 1-based line synchronization verified</span>
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
