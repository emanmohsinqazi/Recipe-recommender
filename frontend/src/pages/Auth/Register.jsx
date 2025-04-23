"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react"
import { useRegisterMutation } from "../../redux/api/usersApiSlice"
import { setCredentials } from "../../redux/features/auth/authSlice"

const Register = () => {
  const [username, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()

  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get("redirect") || "/"

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
    } else {
      try {
        const res = await register({ username, email, password }).unwrap()
        dispatch(setCredentials({ ...res }))
        navigate(redirect)
        toast.success("User successfully registered")
      } catch (err) {
        console.log(err)
        toast.error(err.data.message)
      }
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-purple-100 overflow-hidden">
      <div className="w-full max-w-xl rounded-2xl shadow-xl overflow-hidden bg-white/90 backdrop-blur-sm">
        <div className="w-full p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Account</h1>

          <form onSubmit={submitHandler} className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="name"
                  className="pl-10 w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-800 placeholder-gray-400 transition-all"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="pl-10 w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-800 placeholder-gray-400 transition-all"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="pl-10 w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-800 placeholder-gray-400 transition-all"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="pl-10 w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-800 placeholder-gray-400 transition-all"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 mt-4"
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
                  Registering...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-purple-600 hover:text-purple-800 font-medium hover:underline transition-all"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
