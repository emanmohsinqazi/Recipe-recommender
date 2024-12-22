import  { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-custom-green flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg overflow-hidden flex">
        {/* Left Section */}
        <div className="w-1/2 bg-gradient-to-br from-red-200 to-pink-200 p-12 flex flex-col justify-center items-center relative">
          <div className="absolute top-0 left-0 w-32 h-32 bg-red-300 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-300 rounded-full translate-x-12 translate-y-12"></div>
          <img
            src="/chef-image.png?height=400&width=400"
            alt="Chef Illustration"
            className="w-48 h-48 mb-8"
          />
          <h2 className="text-2xl font-bold text-purple-800 text-center mb-4">
            Turn your Recipe ideas into reality.
          </h2>
          <p className="text-sm text-purple-600 text-center">
            Less Ingredients? No worries we have already caught you up!
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-yellow-50 p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Smart Recipe Grocer
            </h1>
            <p className="text-sm text-gray-600">
              {isLogin ? "Login to your Account" : "Create your Account"}
            </p>
          </div>

          <button className="w-full bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center mb-4 hover:bg-gray-50 transition-colors duration-300">
            <img
              src="/google-image.png?height=20&width=20"
              alt="Google Icon"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-yellow-50 text-gray-500">
                Or {isLogin ? "sign in" : "sign up"} with Email
              </span>
            </div>
          </div>

          <form className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            {!isLogin && (
              <div>
                <label
                  htmlFor="userImage"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  id="userImage"
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-olive-600 text-gray-600 py-2 rounded-md font-semibold hover:bg-olive-700 transition-colors duration-300"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            {isLogin ? "Not Registered Yet?" : "Already have an account?"}{" "}
            <button
              className="text-purple-600 hover:underline"
              onClick={toggleForm}
            >
              {isLogin ? "Create an account" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
