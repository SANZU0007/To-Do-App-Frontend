import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./reset.css";
import { TextField } from "@mui/material";

const ResetPasswords = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isPasswordValid = () => {
    // Password validation logic
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid()) {
      setErrorMessage("Password must be 8 characters, contain one uppercase letter, one number, and one special character.");
      return;
    }

    try {
      const response = await axios.post(
        "https://loginauthurl.onrender.com/api/savepassword",
        {
          NewPassword: password,
          resetToken,
        }
      );

      window.alert("Password saved successfully!");
      console.log(response.data);
      navigate("/todo");
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to update password. Please try again.");
    }
  };

const Homepage = ()=>{
  navigate("/")
}


  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-content">
          <h3 className="form-title">Save Password</h3>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
          <div className="form-group mt-3">
            <label>Reset Token</label>
            <TextField
              type="text"
              className="form-control"
              placeholder="Reset Token"
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <TextField
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3 p-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
        <p className="linktag"  onClick={Homepage}>
  Click to <b className="linktag1" > login</b> 
</p>
      </form>
    </div>
  );
};

export default ResetPasswords;