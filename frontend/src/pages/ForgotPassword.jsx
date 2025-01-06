import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";

const ForgotPassword = () => {
  const [emailId, setEmailId] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    try {
      const res = await axios.post(
        BASE_URL + "/forgot-password", // Corrected API endpoint
        {
          email: emailId,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.Status === "Success") {
        toast.success("Password reset email sent successfully.", {
          position: "center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate("/");
      } else if (res.data.Status === "User not existed") {
        setErrors({ auth: "No account found with this email." });
        toast.error("No account found with this email.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      setErrors({ general: "An error occurred. Please try again later." });
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error(err);
    }
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
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "", auth: "" }));
                }}
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {errors.auth && (
              <p className="text-red-500 text-sm mt-1">{errors.auth}</p>
            )}
            {errors.general && (
              <p className="text-red-500 text-sm mt-1">{errors.general}</p>
            )}

            <button
              type="submit"
              className="w-full bg-olive-600 text-gray-600 py-2 rounded-md font-semibold hover:bg-olive-700 transition-colors duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
