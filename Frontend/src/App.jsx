import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import DriverLogin from "./pages/DriverLogin";
import DriverRegister from "./pages/DriverRegister";
import Start from "./pages/Start";
import UserProtectedwrapper from "./pages/UserProtectedwrapper";
import UserLogout from "./pages/UserLogout";
import DriverProtectedwrapper from "./pages/DriverProtectedwrapper";
import DriverStart from "./pages/DriverStart";
import DriverLogout from "./pages/DriverLogout";
import Riding from "./pages/Riding";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/login" element={<UserLogin />} />
        <Route path="/users/register" element={<UserRegister />} />
        <Route path="/drivers/login" element={<DriverLogin />} />
        <Route path="/drivers/register" element={<DriverRegister />} />
        <Route path="/riding" element={<Riding />} />
        <Route
          path="/home"
          element={
            <UserProtectedwrapper>
              <Start />
            </UserProtectedwrapper>
          }
        />
        <Route
          path="/users/logout"
          element={
            <UserProtectedwrapper>
              <UserLogout />
            </UserProtectedwrapper>
          }
        />
        <Route
          path="/drivers-home"
          element={
            <DriverProtectedwrapper>
              <DriverStart />
            </DriverProtectedwrapper>
          }
        />
        <Route
          path="/drivers/logout"
          element={
            <DriverProtectedwrapper>
              <DriverLogout />
            </DriverProtectedwrapper>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
