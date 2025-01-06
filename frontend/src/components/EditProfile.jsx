// /* eslint-disable react/prop-types */
// import { useState } from "react";
// import UserCard from "./UserCard";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";

// const EditProfile = ({ user }) => {
//   const [firstName, setFirstName] = useState(user.firstName);
//   const [lastName, setLastName] = useState(user.lastName);
//   const [age, setAge] = useState(user.age || "");
//   const [gender, setGender] = useState(user.gender || "");
//   const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
//   const [toast, setToast] = useState(false);

//   const dispatch = useDispatch();

//   const [error, setError] = useState("");

//   const setProfile = async () => {
//     setError("");
//     try {
//       const res = await axios.patch(
//         BASE_URL + "/profile/edit",
//         {
//           firstName,
//           lastName,
//           photoUrl,
//           age,
//           gender,
          
//         },
//         { withCredentials: true }
//       );

//       dispatch(addUser(res?.data?.data));
//       setToast(true);
//       setTimeout(() => {
//         setToast(false);
//       }, 3000);
//     } catch (error) {
//       setError(error.response.data);
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center my-10">
//         <div>
//           {" "}
//           <div className="flex justify-center mx-10">
//             <div className="card bg-base-300 w-96 shadow-xl">
//               <div className="card-body">
//                 <h2 className="card-title justify-center"> Edit Profile</h2>
//                 <div>
//                   <label className="form-control w-full max-w-xs my-2">
//                     <div className="label">
//                       <span className="label-text">First Name:</span>
//                     </div>
//                     <input
//                       type="text"
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                       className="input input-bordered w-full max-w-xs"
//                     />
//                   </label>
//                   <label className="form-control w-full max-w-xs my-2">
//                     <div className="label">
//                       <span className="label-text">Last Name:</span>
//                     </div>
//                     <input
//                       type="text"
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       className="input input-bordered w-full max-w-xs"
//                     />
//                   </label>
//                   <label className="form-control w-full max-w-xs my-2">
//                     <div className="label">
//                       <span className="label-text">Photo URL :</span>
//                     </div>
//                     <input
//                       type="text"
//                       value={photoUrl}
//                       onChange={(e) => setPhotoUrl(e.target.value)}
//                       className="input input-bordered w-full max-w-xs"
//                     />
//                   </label>
//                   <label className="form-control w-full max-w-xs my-2">
//                     <div className="label">
//                       <span className="label-text"> Age:</span>
//                     </div>
//                     <input
//                       type="text"
//                       value={age}
//                       onChange={(e) => setAge(e.target.value)}
//                       className="input input-bordered w-full max-w-xs"
//                     />
//                   </label>
//                   <label className="form-control w-full max-w-xs my-2">
//                     <div className="label">
//                       <span className="label-text">Gender:</span>
//                     </div>
//                     <input
//                       type="text"
//                       value={gender}
//                       onChange={(e) => setGender(e.target.value)}
//                       className="input input-bordered w-full max-w-xs"
//                     />
//                   </label>
                 
//                 </div>
//                 <p className="text-red-500">{error}</p>
//                 <div className="card-actions justify-center m-2">
//                   <button className="btn btn-primary" onClick={setProfile}>
//                     Save Profile
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <UserCard
//           user={{ firstName, lastName, photoUrl, age, gender}}
//         />
//       </div>

//       {toast && (
//         <div className="toast toast-top toast-center">
//           <div className="alert alert-success">
//             <span>Profile Edit successfully.</span>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditProfile;





import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const setProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      const errorMessage = err.response?.data || "Something went wrong";
      setError(errorMessage);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div>
          <div className="flex justify-center mx-10">
            <div className="card bg-base-300 w-96 shadow-xl">
              <div className="card-body">
                <h2 className="card-title justify-center">Edit Profile</h2>
                <div>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">First Name:</span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Last Name:</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Photo URL:</span>
                    </div>
                    <input
                      type="text"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Age:</span>
                    </div>
                    <input
                      type="number"
                      min="1"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Gender:</span>
                    </div>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="select select-bordered w-full max-w-xs"
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">male</option>
                      <option value="female">male</option>
                      <option value="other">other</option>
                    </select>
                  </label>
                </div>
                <p className="text-red-500">{error}</p>
                <div className="card-actions justify-center m-2">
                  <button className="btn btn-primary" onClick={setProfile}>
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, lastName, photoUrl, age, gender }} />
      </div>

      {toast && (
        <div className="toast toast-bottom toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
