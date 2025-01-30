export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-[3px] border-current border-t-transparent text-indigo-600" role="status" aria-label="loading">
          <span className="sr-only">Loading...</span>
        </div>
        <h2 className="mt-4 text-lg font-semibold text-gray-700">Please wait...</h2>
      </div>
    </div>
  );
} 