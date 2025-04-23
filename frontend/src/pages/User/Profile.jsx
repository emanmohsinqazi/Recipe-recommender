"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useProfileMutation } from "../../redux/api/usersApiSlice"
import { toast } from "react-toastify"
import { setCredentials } from "../../redux/features/auth/authSlice"

const Profile = () => {
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { userInfo } = useSelector((state) => state.auth)
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()

  useEffect(() => {
    setUserName(userInfo.username)
    setEmail(userInfo.email)
  }, [userInfo.username, userInfo.email])

  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap()

        dispatch(setCredentials({ ...res }))
        toast.success("Profile updated successfully")
      } catch (err) {
        console.error("Update profile error:", err)
        toast.error(err?.data?.message || err?.error || "An error occurred during profile update")
      }
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="w-full max-w-md">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/30 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/30 rounded-full blur-xl"></div>

          {/* Card */}
          <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20 z-10">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>

            <div className="px-8 py-8">
              <div className="flex items-center justify-center mb-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center shadow-inner">
                  <span className="text-2xl font-bold text-gray-700">
                    {userInfo.username?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Your Profile</h2>

              <form onSubmit={submitHandler} className="space-y-5">
                <div className="form-group">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter username"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      placeholder="Enter email"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Leave blank to keep current password</p>
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loadingUpdateProfile}
                    className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loadingUpdateProfile ? (
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
                        Updating...
                      </span>
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
