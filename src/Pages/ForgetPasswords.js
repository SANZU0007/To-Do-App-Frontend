
import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useNavigate  ,Link} from "react-router-dom";
import"./forget.css"

const ForgetPasswords = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const isEmailValid = () => {
    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEmailValid()) {
      setError("Invalid email address");
      return;
    }

    try {
      const response = await axios.post(
        "https://loginauthurl.onrender.com/api/resetpassword",
        {
          Email: email,
        }
      );

      setSuccess("Email sent successfully. Check your Email");
      setEmail("");
      setError("");

      window.alert("Mail sent successfully! Check your Email");

      navigate("/save-new-password")
    } catch (error) {
      if (error.response && error.response.status === 404) {
        window.alert("User not found");
        setError("User not found");
      } else {
        console.log(error);
      }
    }
  };
  const Homepage = ()=>{
    navigate(`/`);
  }
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-content">
          <h3 className="form-title">Forget Password</h3>
          <div className="text-center"></div>

          <div className="form-group mt-3">
            <TextField
              type="email"
              className="form-control7"
              placeholder="Enter The email Address"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="d-grid gap-2 mt-3 p-4">
            <Button type="submit" className="btn btn-primary" variant="contained">
              Submit
            </Button>
          </div>
          <p className="linktag"  onClick={Homepage}>
              Click to <b className="linktag1" > login</b> 
            </p>
        </div>
     
      </form>

    </div>
  );
};

export default ForgetPasswords;