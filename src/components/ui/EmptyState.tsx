export function EmptyState({
  title = "Nothing here yet",
  description = "No items found.",
  action,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="font-display font-black text-6xl text-kicks-gray-2 mb-4">404</div>
      <p className="font-display font-bold text-2xl text-white mb-2">{title}</p>
      <p className="text-kicks-gray-3 text-sm font-body mb-6 max-w-xs">{description}</p>
      {action}
    </div>
  );
}
