// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ResetPassword from "./Pages/ResetPassword";
import ForgetPasswords from "./Pages/ForgetPasswords";

import ChangePassWord from "./Pages/ChangePassWord";
import Apps from "./Apps";


const App = () => {
  // Define an array of paths where you want to show the Navbar




  return (
    <Router>
      <div>


        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgetPasswords />} /> 
          <Route path="/save-new-password" element={<ResetPassword />} />
          <Route path="/changepass" element={<ChangePassWord />} />
          <Route path="/todo" element={<Apps />} />  
      


        </Routes>
      </div>
    </Router>
  );
};

export default App;