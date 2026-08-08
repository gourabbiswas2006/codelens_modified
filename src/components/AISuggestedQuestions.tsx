import React from 'react';
import { HelpCircle, Sparkles, MessageSquarePlus } from 'lucide-react';

interface AISuggestedQuestionsProps {
  questions?: string[];
  onSelectQuestion: (question: string) => void;
}

export const AISuggestedQuestions: React.FC<AISuggestedQuestionsProps> = ({
  questions = [
    "Summarize this",
    "What's important?",
    "Any compliance risks?",
    "Show me the evidence",
    "What is the employee leave & remote work policy?",
    "How does CodeLens handle API key security?"
  ],
  onSelectQuestion
}) => {
  return (
    <div className="p-4 rounded-2xl bg-stone-950/80 border border-white/10 space-y-3 glass-card">
      <div className="flex items-center gap-2 text-rose-300 text-xs font-mono font-bold uppercase tracking-wider">
        <Sparkles className="w-4 h-4 text-amber-300" />
        <span>Suggested Questions</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSelectQuestion(q)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-violet-950/60 border border-white/10 hover:border-violet-500/40 text-stone-200 hover:text-white text-xs font-medium transition-all active:scale-95 text-left cursor-pointer"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-rose-300 shrink-0" />
            <span>{q}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
