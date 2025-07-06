import { ArrowRight, Eye, EyeOff, Key, Palette, User } from "lucide-react";
import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home(): ReactElement {
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [token, setToken] = useState("")
  const [showToken, setShowToken] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const handleLogin = () => {
    navigate("/rubric-builder");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleTokenSubmit = () => {
    navigate("/rubric-builder")
  }

  const handleSubmit = () => {}

  const isSubmitEnabled = true
   return (
    <div className="h-screen bg-gradient-to-br from-[#f5f5f7] via-[#fafafa] to-[#f0f0f3] font-[system-ui,-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif] flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#007AFF]/10 to-[#5AC8FA]/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#AF52DE]/10 to-[#FF2D92]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-[#34C759]/10 to-[#30D158]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#007AFF] to-[#5AC8FA] rounded-2xl shadow-lg mb-4">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#1d1d1f] mb-2">Welcome to Palette</h1>
          <p className="text-[#86868b] text-base">
            Improve the Canvas project grading experience with the perfect rubric.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#1d1d1f] mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-[#86868b]" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="token" className="block text-sm font-medium text-[#1d1d1f] mb-2">
                Canvas API Token
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="w-5 h-5 text-[#86868b]" />
                </div>
                <input
                  id="token"
                  type={showToken ? "text" : "password"}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Paste your Canvas API token"
                  className="w-full pl-10 pr-12 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-white/30 rounded-r-xl transition-colors"
                >
                  {showToken ? (
                    <EyeOff className="w-5 h-5 text-[#86868b]" />
                  ) : (
                    <Eye className="w-5 h-5 text-[#86868b]" />
                  )}
                </button>
              </div>
              
            </div>

            <button
              type="submit"
              disabled={!isSubmitEnabled || isLoading}
              className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                isSubmitEnabled && !isLoading
                  ? "bg-[#007AFF] hover:bg-[#0056CC] text-white shadow-lg hover:shadow-xl active:scale-95"
                  : "bg-[#e5e5ea] text-[#86868b] cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button className="text-sm text-[#007AFF] hover:text-[#0056CC] transition-colors">
              Need help getting your Canvas API token?
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
        </div>
      </div>
    </div>
  )
}
