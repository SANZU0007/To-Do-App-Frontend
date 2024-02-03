import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import "./Changepass.css"


import { useNavigate } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";

   
const ChangePassWord = () => {
    const [isLoading, setIsLoading] = useState(false); 
    const [validUser, setValidUser] = useState(null);
    const [loading, setLoading] = useState(true);
     const navigate = useNavigate()





     
    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const loginToken = localStorage.getItem('token'); // Assuming you store the token in localStorage
  
          if (!loginToken) {
             navigate('/error')
            throw new Error('Unauthorized: Missing token');
          }
  
          const response = await axios.get('https://loginauthurl.onrender.com/api/validuser', {
            headers: {
              Authorization: `${loginToken}`,
            },
          });
  
          setValidUser(response.data.validUserOne);
        } catch (error) {
          console.error('Authentication error:', error);
          setValidUser(null);
          navigate('/')
        } finally {
          setLoading(false);
        }
      };
  
      checkAuthentication();
    }, []);
  
















  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // You can add logic here to handle the absence of the login token if needed
  }, []); // The empty dependency array ensures this effect runs only once on mount

  const handleChange = (e) => {
    setErrorMessage(null);
    if (e.target.name === 'previousPassword') {
      setPreviousPassword(e.target.value);
    } else if (e.target.name === 'newPassword') {
      setNewPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the login token from wherever it's stored in your application (e.g., state, localStorage)
    const loginToken = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'https://loginauthurl.onrender.com/api/Changepassword',
        { PreviousPassword: previousPassword, NewPassword: newPassword },
        {
          headers: {
            Authorization: `${loginToken}`,
          },
        }
      );

      console.log(response.data);
      navigate("/todo")
      // Handle success, maybe redirect the user or show a success message
    } catch (error) {
      console.error('Error changing password:', error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      {isLoading && (
  <div style={{
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  }}>
    <CircularProgress color="secondary" />
    <p className="loadinganimation" style={{ marginTop: '10px' }}>Please wait</p>
  </div>
)}
   
    <div className="CardContainer">
    <div className="CardWrapper">
    <Card className="Card">
      <CardContent>
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Previous Password"
            type="password"
            name="previousPassword"
            value={previousPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="New Password"
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Change Password
          </Button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </CardContent>
    </Card>
    </div>
  </div>
  
  </>
  );
};

export default ChangePassWord;