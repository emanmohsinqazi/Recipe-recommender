import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useLoginMutation } from "../../redux/api/usersApiSlice"
import { setCredentials } from "../../redux/features/auth/authSlice"
import Loader from "../../components/Loader"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const { userInfo } = useSelector((state) => state.auth)
  const { search } = useLocation()
  const sp = new URLSearchParams(search)

  const defaultRedirect = userInfo?.isAdmin ? "/admin/dashboard" : "/home"
  const redirect = sp.get("redirect") || defaultRedirect

  useEffect(() => {
    if (userInfo) {
      const targetPath = userInfo.isAdmin ? "/admin/dashboard" : "/home"
      navigate(sp.get("redirect") || targetPath)
    }
  }, [navigate, sp, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))

      const targetPath = res.isAdmin ? "/admin/dashboard" : "/home"
      navigate(sp.get("redirect") || targetPath)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl bg-white">
        {/* Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="px-8 pt-8 pb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Welcome back</h1>
            <p className="text-gray-500 mb-6">Please sign in to your account</p>

            <form onSubmit={submitHandler}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all duration-200"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all duration-200"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing In...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-gray-600">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>

          {isLoading && (
            <div className="mt-4 flex justify-center">
              <Loader />
            </div>
          )}
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 relative overflow-hidden">
          {/* Background Image - Real recipe image that matches theme */}
          <img
            src="https://images.unsplash.com/photo-1615484477778-ca3b77940c25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Berry smoothie bowl with fruits"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient Overlay - slightly reduced opacity */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/60 to-pink-500/60"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Delicious Recipes Await</h2>
            <p className="text-white text-lg mb-6">Sign in to discover our collection of amazing recipes</p>
            {/* <div className="w-32 h-32 mx-auto rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-16 h-16 text-white"
              >
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
