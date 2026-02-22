"use client";

export function ErrorState({ message = "Something went wrong", onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <p className="font-display font-bold text-2xl text-white mb-1">ERROR</p>
      <p className="text-kicks-gray-3 text-sm mb-6 font-body max-w-xs">{message}</p>
      {onRetry && (
        <button onClick={onRetry}
          className="bg-kicks-blue text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-kicks-blue-light transition-colors font-body">
          Try Again
        </button>
      )}
    </div>
  );
}
