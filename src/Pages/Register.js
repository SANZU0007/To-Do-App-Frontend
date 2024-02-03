import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import "./register.css";
import CircularProgress from "@mui/material/CircularProgress";
const Register = () => {


  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registrationError, setRegistrationError] = useState(null);
  const [isLoading , setIsLoading] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

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

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(enteredPassword)) {
      setPasswordError('Password must have at least one uppercase letter, one lowercase letter, one special character, and a minimum length of eight characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Name.trim() === '' || Email.trim() === '' || Password.trim() === '') {
      setRegistrationError('Please fill in all fields.');
      return;
    }

    if (emailError || passwordError) {
      setRegistrationError('Invalid email or password.');
      return;
    }

    try {

      setIsLoading(true)
      const response = await axios.post(
        "https://loginauthurl.onrender.com/api/signup",
        {
          Name,
          Email,
          Password,
        }
      );
      // console.log(response.data);
      navigate(`/`);
    } catch (error) {
      setIsLoading(false)
      console.error(error);
      setRegistrationError('An error occurred. Please try again later.');
    }
  };

  const Homepage = () => {
    navigate(`/`);
  };

  return (

    <>
      {isLoading && (
        <div id="Loadinganimations">
          <CircularProgress color="secondary" />
          <p className="loadinganimation" style={{ marginTop: '10px' }}>Please wait</p>
        </div>
      )}
    
    
    
  
    <div className="CardContainer">
      <Card className="Card">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <h3>Register</h3>

            {registrationError && (
              <Stack spacing={2} sx={{ marginBottom: '1rem' }}>
                <Alert severity="error">{registrationError}</Alert>
              </Stack>
            )}

            <TextField
              label="Name"
              type="text"
              value={Name}
              onChange={handleNameChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Email"
              type="email"
              value={Email}
              onChange={handleEmailChange}
              fullWidth
              margin="normal"
              error={!!emailError}
              helperText={emailError}
            />

            <TextField
              label="Password"
              type="password"
              value={Password}
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
              error={!!passwordError}
              helperText={passwordError}
            />

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>

            <p className="linktag" onClick={Homepage}>
              Click to <b className="linktag1" > login</b>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>  </>
  );
};

export default Register;