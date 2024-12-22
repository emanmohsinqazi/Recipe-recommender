import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const RootLayout = () => {
  return (
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
  );
};

export default RootLayout;
