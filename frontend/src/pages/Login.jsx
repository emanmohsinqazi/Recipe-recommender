// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import {BASE_URL} from "../utils/constants";
// import { addUser } from "../utils/userSlice";

// const Login = () => {
//   const [emailId, setEmailId] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   // eslint-disable-next-line no-unused-vars
//   const [error, setError] = useState("");
//   const [isLogin, setIsLogin] = useState(true);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (isLogin) {
//       try {
//         const res = await axios.post(
//           BASE_URL + "/login",
//           {
//             email: emailId,
//             password: password,
//           },
//           {
//             withCredentials: true,
//           }
//         );
//         console.log(res);
//         dispatch(addUser(res.data));
//         return navigate("/");
//       } catch (err) {
//         setError(err?.response?.data || "Something went Wrong!d");
//         console.error(err);
//       }
//     } else {
//       try {
//         const res = await axios.post(
//           BASE_URL + "/signup",
//           { firstName, lastName, email: emailId, password },
//           { withCredentials: true }
//         );
//         dispatch(addUser(res.data.data));
//         return navigate("/");
//       } catch (err) {
//         setError(err?.response?.data || "Something went wrong");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-custom-green flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg overflow-hidden flex">
//         {/* Left Section */}
//         <div className="w-1/2 bg-gradient-to-br from-red-200 to-pink-200 p-12 flex flex-col justify-center items-center relative">
//           <div className="absolute top-0 left-0 w-32 h-32 bg-red-300 rounded-full -translate-x-16 -translate-y-16"></div>
//           <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-300 rounded-full translate-x-12 translate-y-12"></div>
//           <img
//             src="/chef-image.png?height=400&width=400"
//             alt="Chef Illustration"
//             className="w-48 h-48 mb-8"
//           />
//           <h2 className="text-2xl font-bold text-purple-800 text-center mb-4">
//             Turn your Recipe ideas into reality.
//           </h2>
//           <p className="text-sm text-purple-600 text-center">
//             Less Ingredients? No worries we have already caught you up!
//           </p>
//         </div>

//         {/* Right Section */}
//         <div className="w-1/2 bg-yellow-50 p-12 flex flex-col justify-center">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">
//               Smart Recipe Grocer
//             </h1>
//             <p className="text-sm text-gray-600">
//               {isLogin ? "Login to your Account" : "Create your Account"}
//             </p>
//           </div>

//           <button className="w-full bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center mb-4 hover:bg-gray-50 transition-colors duration-300">
//             <img
//               src="/google-image.png?height=20&width=20"
//               alt="Google Icon"
//               className="w-5 h-5 mr-2"
//             />
//             Continue with Google
//           </button>

//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-yellow-50 text-gray-500">
//                 Or {isLogin ? "sign in" : "sign up"} with Email
//               </span>
//             </div>
//           </div>

//           <form className="space-y-4" onSubmit={handleSubmit}>
//             {!isLogin && (
//               <>
//                 <div>
//                   <label
//                     htmlFor="firstName"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     First Name
//                   </label>
//                   <input
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     type="text"
//                     id="firstName"
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     placeholder="Enter your first name"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="lastName"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Last Name
//                   </label>
//                   <input
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     type="text"
//                     id="lastName"
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     placeholder="Enter your last name"
//                   />
//                 </div>
//               </>
//             )}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email
//               </label>
//               <input
//                 value={emailId}
//                 onChange={(e) => setEmailId(e.target.value)}
//                 type="email"
//                 id="email"
//                 className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Password
//               </label>
//               <input
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 type="password"
//                 id="password"
//                 className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Enter your password"
//               />
//             </div>
//             {/* {!isLogin && (
//               <div>
//                 <label
//                   htmlFor="userImage"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Profile Image
//                 </label>
//                 <input
//                   type="file"
//                   id="userImage"
//                   accept="image/*"
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//               </div>
//             )} */}
//             <button
//               type="submit"
//               className="w-full bg-olive-600 text-gray-600 py-2 rounded-md font-semibold hover:bg-olive-700 transition-colors duration-300"
//             >
//               {isLogin ? "Login" : "Sign Up"}
//             </button>
//           </form>

//           <p className="text-center text-sm text-gray-600 mt-8">
//             {isLogin ? "Not Registered Yet?" : "Already have an account?"}{" "}
//             <button
//               className="text-purple-600 hover:underline"
//               onClick={toggleForm}
//             >
//               {isLogin ? "Create an account" : "Login"}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;









import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import {  toast } from 'react-toastify';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setErrors({});

  //   if (isLogin) {
  //     try {
  //       const res = await axios.post(
  //         BASE_URL + "/login",
  //         {
  //           email: emailId,
  //           password: password,
  //         },
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       console.log(res);
  //       dispatch(addUser(res.data));
  //       toast("Wow so easy!");
  //       return navigate("/");
  //     } catch (err) {
  //       if (err.response && err.response.status === 401) {
  //         setErrors({ auth: "Invalid email or password" });
  //       } else {
  //         setErrors({ general: err?.response?.data || "Something went wrong" });
  //       }
  //       console.error(err);
  //     }
  //   } else {
  //     try {
  //       const res = await axios.post(
  //         BASE_URL + "/signup",
  //         { firstName, lastName, email: emailId, password },
  //         { withCredentials: true }
  //       );
  //       dispatch(addUser(res.data.data));
  //       return navigate("/");
  //     } catch (err) {
  //       if (err.response && err.response.status === 409) {
  //         setErrors({ email: "User already exists" });
  //       } else {
  //         setErrors({ general: err?.response?.data || "Something went wrong" });
  //       }
  //     }
  //   }
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setErrors({});
  
  //   if (isLogin) {
  //     try {
  //       const res = await axios.post(
  //         BASE_URL + "/login",
  //         {
  //           email: emailId,
  //           password: password,
  //         },
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       console.log(res);
  //       dispatch(addUser(res.data));
  //       toast.success("Login successful!");
  //       return navigate("/");
  //     } catch (err) {
  //       if (err.response && err.response.status === 401) {
  //         setErrors({ auth: "Invalid email or password" });
  //       } else {
  //         setErrors({ general: err?.response?.data || "Something went wrong" });
  //       }
  //       toast.error("Login failed. Please check your credentials.");
  //       console.error(err);
  //     }
  //   } else {
  //     try {
  //       const res = await axios.post(
  //         BASE_URL + "/signup",
  //         { firstName, lastName, email: emailId, password },
  //         { withCredentials: true }
  //       );
  //       dispatch(addUser(res.data.data));
  //       toast.success("Signup successful!");
  //       return navigate("/");
  //     } catch (err) {
  //       if (err.response && err.response.status === 409) {
  //         setErrors({ email: "User already exists" });
  //       } else {
  //         setErrors({ general: err?.response?.data || "Something went wrong" });
  //       }
  //       toast.error("Signup failed. Please try again.");
  //     }
  //   }
  // };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
  
    if (isLogin) {
      try {
        const res = await axios.post(
          BASE_URL + "/login",
          {
            email: emailId,
            password: password,
          },
          {
            withCredentials: true,
          }
        );
        console.log(res);
        dispatch(addUser(res.data));
        toast.success("Login successful! Welcome back.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return navigate("/");
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setErrors({ auth: "Invalid email or password" });
          toast.error("Invalid email or password. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          setErrors({ general: err?.response?.data || "Something went wrong" });
          toast.error("An error occurred. Please try again later.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        console.error(err);
      }
    } else {
      try {
        const res = await axios.post(
          BASE_URL + "/signup",
          { firstName, lastName, email: emailId, password },
          { withCredentials: true }
        );
        dispatch(addUser(res.data.data));
        toast.success("Account created successfully! Welcome!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return navigate("/");
      } catch (err) {
        if (err.response && err.response.status === 409) {
          setErrors({ email: "User already exists" });
          toast.error("User already exists. Please log in.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          setErrors({ general: err?.response?.data || "Something went wrong" });
          toast.error("An error occurred. Please try again later.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        console.error(err);
      }
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

          <form className="space-y-4" onSubmit={handleSubmit}>
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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, auth: "" }));
                }}
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your password"
              />
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
          <Link to="/forgot-password" className="text-purple-600 hover:underline" >Forgot Password</Link>

          </p>
        </div>
      </div>
    </div>

    
  );
};

export default Login;


