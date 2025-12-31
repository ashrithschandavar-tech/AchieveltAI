
import React, { useState } from 'react';
import { GoalCategory, GoalInput, DifficultyLevel } from '../types';

interface PlanFormProps {
  onGenerate: (input: GoalInput) => void;
  isLoading: boolean;
}

const PlanForm: React.FC<PlanFormProps> = ({ onGenerate, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState<GoalCategory>(GoalCategory.EDUCATION);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(DifficultyLevel.BEGINNER);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !dueDate) return;
    onGenerate({ topic, category, difficulty, dueDate });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">What is your aim or skill?</label>
        <input
          type="text"
          placeholder="e.g. Master React.js, Run a Marathon, Learn Piano..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 bg-white"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 block">Category</label>
          <div className="relative">
            <select
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white text-slate-900"
              value={category}
              onChange={(e) => setCategory(e.target.value as GoalCategory)}
            >
              {Object.values(GoalCategory).map((cat) => (
                <option key={cat} value={cat} className="text-slate-900 bg-white">
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 block">Current Experience / Difficulty</label>
          <div className="relative">
            <select
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white text-slate-900"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
            >
              {Object.values(DifficultyLevel).map((level) => (
                <option key={level} value={level} className="text-slate-900 bg-white">
                  {level}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">Due Date</label>
        <input
          type="date"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-white"
          value={dueDate}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !topic || !dueDate}
        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] ${
          isLoading 
          ? 'bg-slate-400 cursor-not-allowed' 
          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-200 hover:scale-[1.01]'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Strategizing Your Path...
          </span>
        ) : 'Generate My Success Plan'}
      </button>
    </form>
  );
};

export default PlanForm;
