



export default function ChatBot() {
 
 

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-0"></div>

      {/* Animated dots pattern */}
      <div className="fixed inset-0 opacity-30 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-md sm:max-w-lg md:max-w-2xl" style={{ animation: "fadeIn 0.6s ease-out forwards" }}>
          {/* Logo */}
          <div className="mx-auto mb-8 w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold">N</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            We're Coming Soon
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-xl mx-auto">
            We're working on something amazing. Our new platform is on its way. Be the first to know when we launch.
          </p>

         
        </div>
      </main>

    

      {/* Inline styles */}
      <style jsx>{`
        /* Base styles */
        :global(html),
        :global(body) {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        /* Custom scrollbar */
        :global(::-webkit-scrollbar) {
          width: 8px;
        }

        :global(::-webkit-scrollbar-track) {
          background: #111;
        }

        :global(::-webkit-scrollbar-thumb) {
          background: #333;
          border-radius: 4px;
        }

        :global(::-webkit-scrollbar-thumb:hover) {
          background: #444;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

