import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import "./Login.css"

const Login = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleForget = () => {
    navigate("/forgetpassword");
  };

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    const enteredEmail = event.target.value;
    setEmail(enteredEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(enteredEmail)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (event) => {
    const enteredPassword = event.target.value;
    setPassword(enteredPassword);

    // Password validation regular expression
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(enteredPassword)) {
      setPasswordError('Password must have at least one uppercase letter, one lowercase letter, one special character, and a minimum length of eight characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Email.trim() === '') {
      setEmailError('Please enter an email address');
      return;
    }

    if (Password.trim() === '') {
      setPasswordError('Please enter a password');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://loginauthurl.onrender.com/api/login",
        {
          Email,
          Password
        }
      );

      localStorage.setItem("token", response.data.token);
      // console.log(response.data);

      navigate('/todo'); // replace '/home' with the actual path of your home page

    } catch (error) {
      if (error.response && error.response.status === 404) {
        window.alert("Incorrect email or password");
      } else {
        window.alert("Incorrect email or password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div id="Loadinganimations">
          <CircularProgress color="secondary" />
          <p className="loadinganimation" style={{ marginTop: '10px' }}>Please wait</p>
        </div>
      )}
     
         
<div id="parent-container">


              
            <form   id="form-details"  onSubmit={handleSubmit}>
            <h3 className="form-title">Login</h3>
              <TextField

              className="text-field-data"
                type="email"
                label="Email address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={Email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
              />

              <TextField
               className="text-field-data"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={Password}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
              />

              <div className="submit-btn">
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </div>

             
           
  <p onClick={handleForget} className="linktags">Forget Password ?</p>
  <br></br>
  <Button onClick={handleSignup} variant="contained" className="linktags linktags-contained-button">Create new Account</Button>


            </form> 

          
            </div>
    </>
  );
};

export default Login;