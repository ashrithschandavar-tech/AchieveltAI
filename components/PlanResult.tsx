
import React from 'react';
import { GoalPlan } from '../types';

interface PlanResultProps {
  plan: GoalPlan;
}

const PlanResult: React.FC<PlanResultProps> = ({ plan }) => {
  const exportAsText = () => {
    const content = `
${plan.title.toUpperCase()}
Difficulty: ${plan.difficulty}
Status: ${plan.isTimeframeRealistic ? 'Realistic' : 'Intensive'}

SUMMARY:
${plan.summary}

MILESTONES:
${plan.milestones.map((m, i) => `${i + 1}. ${m.title} (${m.timeframe})\n   ${m.description}`).join('\n\n')}

RESOURCES:
${plan.resources.map(r => `- ${r.name} (${r.type}): ${r.description}`).join('\n')}

DAILY HABITS:
${plan.dailyHabits.map(h => `- ${h}`).join('\n')}

WEEKLY CHECKLIST:
${plan.weeklyChecklist.map(c => `- [ ] ${c}`).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${plan.title.replace(/\s+/g, '_')}_Plan.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const text = `${plan.title}\n\nSummary: ${plan.summary}\n\nNext Steps: ${plan.milestones[0].title}`;
    navigator.clipboard.writeText(text);
    alert('Plan summary copied to clipboard!');
  };

  return (
    <div className="space-y-10 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Feasibility Warning */}
      {!plan.isTimeframeRealistic && plan.timeframeWarning && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl shadow-sm no-print">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <div>
              <h4 className="font-bold text-amber-800 text-lg">Ambitious Timeline Detected</h4>
              <p className="text-amber-700 leading-relaxed mt-1">{plan.timeframeWarning}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
          <h2 className="text-3xl font-extrabold text-slate-900">{plan.title}</h2>
          <div className="flex gap-2 no-print">
            <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
              plan.isTimeframeRealistic ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
            }`}>
              {plan.isTimeframeRealistic ? 'Realistic' : 'Intensive'}
            </span>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
              {plan.difficulty}
            </span>
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed text-lg">{plan.summary}</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Milestones */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="bg-blue-100 p-2 rounded-lg text-blue-600 no-print">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              </span>
              Strategic Milestones
            </h3>
            <div className="space-y-4">
              {plan.milestones.map((m, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">
                      {i + 1}
                    </div>
                    {i !== plan.milestones.length - 1 && <div className="w-0.5 h-full bg-slate-200 -mt-1"></div>}
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex-1 mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-slate-800">{m.title}</h4>
                      <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">{m.timeframe}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="bg-purple-100 p-2 rounded-lg text-purple-600 no-print">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </span>
              Curated Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plan.resources.map((r, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {r.type}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{r.estimated_cost}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1">{r.name}</h4>
                  <p className="text-sm text-slate-500">{r.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <section className="bg-indigo-900 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 no-print" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Daily Habits
            </h3>
            <ul className="space-y-3">
              {plan.dailyHabits.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm text-indigo-100">
                  <span className="text-indigo-400 font-bold">•</span>
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Common Hurdles</h3>
            <div className="space-y-4">
              {plan.commonObstacles.map((o, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-sm font-bold text-slate-700">"{o.obstacle}"</p>
                  <p className="text-xs text-slate-500 italic">Solution: {o.solution}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      {/* Export Actions */}
      <div className="flex flex-wrap justify-center gap-4 py-8 no-print border-t border-slate-200">
        <button 
          onClick={exportAsText}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-black transition-all font-semibold shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Download Plan (.txt)
        </button>

        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
          Copy Summary
        </button>

        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          Print/PDF
        </button>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; padding: 0 !important; }
          .max-w-5xl { max-width: 100% !important; }
        }
      `}</style>
    </div>
  );
};

export default PlanResult;
