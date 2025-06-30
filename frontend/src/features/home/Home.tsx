import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home(): ReactElement {
  const navigate = useNavigate();
  const [token, setToken] = useState("")

  const handleLogin = () => {
    navigate("/rubric-builder");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleTokenSubmit = () => {
    navigate("/rubric-builder")
  }

  const isSubmitEnabled = true

  return (
    <div className="p-6 h-screen w-full flex flex-col relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-72 h-72 bg-gradient-to-r from-pink-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="absolute inset-0 bg-white/40 backdrop-blur-xl"></div>      
      
      {/* Main Content Section */}
      <div className="p-6 flex flex-col items-center justify-center text-center relative z-10 flex-1">
        <div className="relative p-2 rounded-[36px] bg-gradient-to-br from-white/70 via-white/40 to-white/60 backdrop-blur-3xl shadow-2xl shadow-black/30 max-w-4xl mx-auto">
          <div className="absolute inset-0 rounded-[36px] bg-gradient-to-tr from-white/50 via-transparent to-white/30 pointer-events-none"></div>
          <div className="absolute inset-0 rounded-[36px] ring-2 ring-white/40 ring-inset shadow-inner shadow-white/20"></div>

          <div className="relative p-1.5 rounded-[32px] bg-gradient-to-b from-white/60 via-white/30 to-white/50 backdrop-blur-2xl shadow-lg shadow-black/10">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-bl from-white/40 via-transparent to-white/25 pointer-events-none"></div>
            <div className="absolute inset-0 rounded-[32px] ring-1 ring-white/50 ring-inset"></div>
            
            <div className="relative backdrop-blur-3xl bg-gradient-to-b bg-white/90 via-white/80 to-white/85 border-2 border-white/70 rounded-[28px] p-12 shadow-2xl shadow-black/10 ring-1 ring-black/5">
               <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none"></div>
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/30 to-transparent rounded-l-[28px] pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/30 to-transparent rounded-r-[28px] pointer-events-none"></div>
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-t-[28px]"></div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-black/10 to-transparent rounded-b-[28px]"></div>
              
              <div className="relative mb-8">
                <h1 className="text-6xl font-light mb-4 tracking-tight text-gray-900 drop-shadow-sm">
                  Welcome to Palette
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-xl text-gray-600 mb-8 max-w-lg mt-1 font-light">
                Improve the Canvas project grading experience with the perfect rubric.
              </p>
{/* 
              <div className="flex flex-col items-center gap-4 pt-2">
                  <div className="relative">
                    <label className="block text-base font-medium text-gray-600 mb-3 text-left">
                      Enter Canvas Token
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a6a6a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-key-round-icon lucide-key-round"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                        </div>
                        <input
                          type="text"
                          value={token}
                          onChange={(e) => setToken(e.target.value)}
                          placeholder="Paste your Canvas API token here..."
                          className="w-80 pl-10 pr-4 py-3  border border-gray-500 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && isSubmitEnabled) {
                              handleTokenSubmit();
                            }
                          }}
                        />
                      </div>
                      
                      <button
                        onClick={handleTokenSubmit}
                        disabled={!isSubmitEnabled}
                        className={`relative overflow-hidden p-3 rounded-3xl font-medium transition-all duration-200 shadow-lg flex items-center justify-center ${
                          isSubmitEnabled
                            ? 'text-white bg-blue-500 cursor-pointer hover:bg-blue-600 active:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95'
                            : 'text-gray-400 bg-gray-200 cursor-not-allowed shadow-gray-200/25'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        {isSubmitEnabled && (
                          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>
                        )}
                      </button>
                    </div>
                  </div>
              </div>
               */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
