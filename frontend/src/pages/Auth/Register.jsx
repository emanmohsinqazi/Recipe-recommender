import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Eye, EyeOff, Mail, User, Lock, AlertCircle } from "lucide-react";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation states
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  // Validation functions
  const validateUsername = (value) => {
    if (!value) return "Username is required";
    if (value.length < 3) return "Username must be at least 3 characters";
    if (value.length > 30) return "Username cannot exceed 30 characters";
    return "";
  };

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";

    // Check for strong password: at least one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(value)) {
      return "Password must include uppercase, lowercase, and numbers";
    }
    return "";
  };

  const validateConfirmPassword = (value) => {
    if (!value) return "Please confirm your password";
    if (value !== password) return "Passwords do not match";
    return "";
  };

  // Handle input blur events
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate the field
    switch (field) {
      case "username":
        setErrors((prev) => ({
          ...prev,
          username: validateUsername(username),
        }));
        break;
      case "email":
        setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
        break;
      case "password":
        setErrors((prev) => ({
          ...prev,
          password: validatePassword(password),
        }));
        break;
      case "confirmPassword":
        setErrors((prev) => ({
          ...prev,
          confirmPassword: validateConfirmPassword(confirmPassword),
        }));
        break;
      default:
        break;
    }
  };

  // Handle input change events
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (touched.username) {
      setErrors((prev) => ({ ...prev, username: validateUsername(value) }));
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
    if (touched.confirmPassword && confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value !== confirmPassword ? "Passwords do not match" : "",
      }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: password !== value ? "Passwords do not match" : "",
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Set all fields as touched for validation
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    // Validate all fields
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    // Update errors state
    setErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    // If there are any errors, don't submit
    if (usernameError || emailError || passwordError || confirmPasswordError) {
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Account created successfully");
    } catch (err) {
      toast.error(err?.data?.error || "Registration failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Helper to render input field with error handling
  const renderFormField = (
    id,
    label,
    type,
    value,
    onChange,
    icon,
    error,
    showToggle = false,
    toggleHandler = null,
    showState = false
  ) => (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={showToggle ? (showState ? "text" : "password") : type}
          id={id}
          className={`pl-10 w-full p-2.5 bg-gray-50 border ${
            error
              ? "border-red-500 focus:ring-red-400 focus:border-red-400"
              : "border-gray-300 focus:ring-purple-400 focus:border-purple-400"
          } rounded-lg transition-all text-gray-800 placeholder-gray-400`}
          placeholder={`Enter your ${label.toLowerCase()}`}
          value={value}
          onChange={onChange}
          onBlur={() => handleBlur(id)}
          required
        />
        {showToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={toggleHandler}
          >
            {showState ? (
              <EyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center text-red-500 text-sm mt-1">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="w-full max-w-5xl flex flex-col md:flex-row overflow-hidden rounded-xl shadow-xl bg-white">
        {/* Form Section */}
        <div className="w-full md:w-3/5 p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Create Account
          </h1>

          <form onSubmit={submitHandler} className="space-y-5">
            {renderFormField(
              "username",
              "Username",
              "text",
              username,
              handleUsernameChange,
              <User className="h-5 w-5 text-gray-500" />,
              touched.username ? errors.username : ""
            )}

            {renderFormField(
              "email",
              "Email Address",
              "email",
              email,
              handleEmailChange,
              <Mail className="h-5 w-5 text-gray-500" />,
              touched.email ? errors.email : ""
            )}

            {renderFormField(
              "password",
              "Password",
              "password",
              password,
              handlePasswordChange,
              <Lock className="h-5 w-5 text-gray-500" />,
              touched.password ? errors.password : "",
              true,
              togglePasswordVisibility,
              showPassword
            )}

            {renderFormField(
              "confirmPassword",
              "Confirm Password",
              "password",
              confirmPassword,
              handleConfirmPasswordChange,
              <Lock className="h-5 w-5 text-gray-500" />,
              touched.confirmPassword ? errors.confirmPassword : "",
              true,
              toggleConfirmPasswordVisibility,
              showConfirmPassword
            )}

            {password && !errors.password && (
              <div className="text-sm text-green-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Strong password
              </div>
            )}

            <button
              disabled={
                isLoading || Object.values(errors).some((error) => error !== "")
              }
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-4"
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

        {/* Image Section */}
        <div className="w-full md:w-2/5 relative overflow-hidden">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Colorful healthy food"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/60 to-purple-600/60"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Our Kitchen Community
            </h2>
            <p className="text-white text-lg mb-6">
              Create an account to track your kitchen inventory and never run
              out of ingredients
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
