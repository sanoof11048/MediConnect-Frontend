
function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* Animated Medical Cross */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            {/* Outer spinning ring */}
            <div className="absolute inset-0 rounded-full border-4 border-teal-200 animate-spin"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-teal-500 animate-spin" style={{ animationDuration: '1s' }}></div>

            {/* Medical cross in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-8 h-2 bg-teal-600 rounded-full"></div>
                <div className="w-2 h-8 bg-teal-600 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>

            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Loading text with typing animation */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">MediConnect</h2>
          <div className="flex items-center justify-center space-x-1">
            <p className="text-lg font-medium text-gray-600">Connecting your care network</p>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-1 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>

        {/* Care network icons */}
        <div className="mt-8 flex justify-center space-x-8">
          {/* Patient */}
          <div className="text-center opacity-60 animate-pulse" style={{ animationDelay: '0s' }}>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xs text-gray-500 font-medium">Patient</span>
          </div>

          {/* Home Nurse */}
          <div className="text-center opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2 mx-auto">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs text-gray-500 font-medium">Home Nurse</span>
          </div>

          {/* Relative */}
          <div className="text-center opacity-60 animate-pulse" style={{ animationDelay: '1s' }}>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2 mx-auto">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <span className="text-xs text-gray-500 font-medium">Family</span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-6 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-teal-400 to-blue-500 rounded-full animate-pulse"></div>
        </div>

        <p className="mt-3 text-sm text-gray-500">Preparing your personalized care dashboard...</p>
        <button
  onClick={() => {
    window.location.href = window.location.pathname + window.location.search;
  }}
  className="mt-6 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm rounded-lg shadow transition"
>
  Refresh Page
</button>

      </div>
    </div>
  );
}

export default Loading;
