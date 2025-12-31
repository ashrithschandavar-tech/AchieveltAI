
import React, { useState } from 'react';
import PlanForm from './components/PlanForm';
import PlanResult from './components/PlanResult';
import { GoalInput, GoalPlan } from './types';
import { generateGoalPlan } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<GoalPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (input: GoalInput) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateGoalPlan(input);
      setPlan(result);
      // Smooth scroll to result
      setTimeout(() => {
        window.scrollTo({ top: 600, behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check your API key or input.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:py-16">
      <div className="max-w-5xl mx-auto">
        {/* Navigation/Brand */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">
              A
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Achieve<span className="text-blue-600">It</span> AI</h1>
          </div>
          <div className="hidden md:block text-slate-400 text-xs font-semibold tracking-widest uppercase">
            Powered by Gemini 3 Pro
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Turn Your <span className="gradient-text">Aims</span> Into Action.
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Generate customized, resource-backed roadmaps for education, fitness, or any skill in seconds.
          </p>
        </div>

        {/* Main Interface */}
        <div className="max-w-3xl mx-auto mb-20">
          <PlanForm onGenerate={handleGenerate} isLoading={loading} />
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="font-medium text-sm">{error}</span>
            </div>
          )}
        </div>

        {/* Results Section */}
        {plan && <PlanResult plan={plan} />}

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} AchieveIt AI. Architected for peak performance.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
