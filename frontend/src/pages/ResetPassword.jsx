import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    try {
      const res = await axios.post(
        BASE_URL + `/reset-password/${id}/${token}`,
        { password },
        { withCredentials: true }
      );

      if (res.data.Status === "Success") {
        toast.success("Password reset successfully.", {
          position: "center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate("/login");
      } else if (res.data.Status === "Error with token") {
        setErrors({ auth: "Invalid or expired reset token." });
        toast.error("Invalid or expired reset token.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        setErrors({ general: "An unexpected error occurred." });
        toast.error("An unexpected error occurred.", {
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
            Less Ingredients? No worries, we have already caught you up!
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
            <label htmlFor="password">New Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your new password"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.auth && <p className="text-red-500">{errors.auth}</p>}
            {errors.general && <p className="text-red-500">{errors.general}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
