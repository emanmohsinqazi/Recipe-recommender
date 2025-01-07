import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
// import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "../utils/constants";
// import axios from "axios";
// import { addUser } from "../utils/userSlice";
// import { useEffect } from "react";

const Body = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userDataFromStore = useSelector((store) => store.user);
//   const fetchUser = async () => {
//     if (userDataFromStore) {
//       return;
//     }
//     try {
//       const res = await axios.get(BASE_URL + "/profile/view", {
//         withCredentials: true,
//       });
//       console.log("TEst",res.data)
//       dispatch(addUser(res.data));
//     } catch (error) {
//       if (error.status === 400) {
//         navigate("/login");
//       }
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

  return (
    <>
      <div className="bg-yellow-50 min-h-screen">
        <Header />
        <main>
          <div className="py-4 ">
            <section className="max-w-3xl mx-auto">
              <Outlet />
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Body;








