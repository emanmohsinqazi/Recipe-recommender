import "./App.css";
/* eslint-disable react/jsx-key */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Shop from "./pages/pages/Shop";

import RecipeGenerator from "./pages/RecipeGenerator";
import Login from "./pages/Login";
import Kitchen from "./pages/Kitchen";

const App = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<RootLayout />}>
      [<Route path="/" element={<Home />}></Route>,
      <Route path="/shop" element={<Shop />}></Route>,
      <Route path="/login" element={<Login />}></Route>,
      <Route path="/kitchen" element={<Kitchen />}></Route>,

      <Route path="/generate" element={<RecipeGenerator />}></Route>, ]
    </Route>,
  ])
);

export default App;
