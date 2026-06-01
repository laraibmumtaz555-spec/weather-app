export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center mt-16 gap-4">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-white/20 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          🌤️
        </div>
      </div>
      <div className="text-center">
        <p className="text-white font-semibold">Fetching weather data...</p>
        <p className="text-white/50 text-sm mt-1">Please wait a moment</p>
      </div>
    </div>
  );
}