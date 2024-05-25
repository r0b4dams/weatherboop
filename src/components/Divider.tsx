export function Divider({ text }: { text?: string }) {
  return (
    <div className="flex items-center my-6">
      <div className="flex-1 border-t border-gray-300 dark:border-gray-700" />
      {text && (
        <span className="px-2 text-gray-500 dark:text-gray-400 font-medium">
          {text}
        </span>
      )}
      <div className="flex-1 border-t border-gray-300 dark:border-gray-700" />
    </div>
  );
}
