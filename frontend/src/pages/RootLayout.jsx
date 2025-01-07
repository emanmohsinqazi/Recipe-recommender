// import { Outlet } from "react-router-dom";
// import Header from "../components/Header";
import { Provider } from "react-redux";
import { appStore } from "../utils/appStore";
import Body from "./Body";

const RootLayout = () => {

  



  return (
    <Provider store={appStore}>
      <Body/>

    {/* <div className="bg-yellow-50 min-h-screen">
      <Header />
      <main>
      <div className="py-4 ">
          <section className="max-w-3xl mx-auto">
            <Outlet />
          </section>
        </div>
      </main>
    </div> */}
    </Provider>

  );
};

export default RootLayout;
