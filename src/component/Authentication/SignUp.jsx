import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, Link ,to} from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
const SignUp = () => {
  const [pic, setPic] = useState();
  let history=useNavigate();
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    verificationCode: "",
    password: "",
    confirmPassword: "",
    
  });
  const submitHandler = async () => {
    setPicLoading(true);
    console.log("pressed")
    if (user.firstName===""|| user.lastName ===""|| user.email==="" || user.password==="" || user.confirmPassword==="") {
      console.log("empty")
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (!(user.password === user.confirmPassword)) {
      console.log(user.password,user.confirmPassword)
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(user.firstName, user.email, user.password);
    try {
      // console.log("enter")
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:8000/api/user",
        {
          name:user.firstName,
          email:user.email,
          password:user.password,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history("/chat");
      
    } catch (error) {
      console.log("error",error)
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };
 

  // const postData = async (e) => {
  //   e.preventDefault();

  //   const {
  //     firstName,
  //     lastName,
  //     email,
  //     verificationCode,
  //     password,
  //     confirmPassword,
  //     pic,
  //   } = user;

  //   fetch("/")
  // };

  return (
    <Wrapper>
      <section>
        <div className="form-box">
          <div className="form-value">
            
              <h2>Sign Up</h2>
              <div className="inputbox" id="password1">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={user.firstName}
                  onChange={handleInputs}
                  required
                />
                <label htmlFor="fname">First Name</label>
              </div>

              <div className="inputbox" id="password3">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  type="text"
                  required
                  name="lastName"
                  id="lastName"
                  value={user.lastName}
                  onChange={handleInputs}
                />
                <label htmlFor="">Last Name</label>
              </div>

              <div className="inputbox" id="email">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  type="mail"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={handleInputs}
                  required
                />
                <label htmlFor="">Email</label>
              </div>

              <div className="inputbox" id="password">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  type="password"
                  required
                  name="password"
                  id="password"
                  value={user.password}
                  onChange={handleInputs}
                />
                <label htmlFor="">Create Password</label>
              </div>

              <div className="inputbox" id="password">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  type="password"
                  required={true}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleInputs}
                />
                <label htmlFor="">Confirm Password</label>
              </div>

              <button onClick={submitHandler}>Sign Up</button>
              <div className="register">
                <p>
                  Already have an account
                  <Link to="/login"> Log In</Link>
                </p>
              </div>
            {/* </form> */}
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");
  * {
    margin: 0;
    padding: 0;
    font-family: "poppins", sans-serif;
  }
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;

    background: url("https://source.unsplash.com/1920x1080/?nature") no-repeat;

    background-position: center;
    background-size: cover;
  }

  // @keyframes backgroundColorPalette {
  //   0% {
  //     background: #ee6055;
  //   }
  //   25% {
  //     background: #60d394;
  //   }
  //   50% {
  //     background: #aaf683;
  //   }
  //   75% {
  //     background: #ffc746;
  //   }
  //   100% {
  //     background: #ff9b85;
  //   }
  // }

  // body {
  //   animation-name: backgroundColorPalette;
  //   animation-duration: 60s;
  //   animation-iteration-count: infinite;
  //   animation-direction: alternate;
  // }

  .form-box {
    position: relative;
    width: 400px;
    height: 700px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    backdrop-filter: blur(15px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h2 {
    font-size: 4em;
    color: #fff;
    text-align: center;
  }
  .inputbox {
    position: relative;
    margin: 30px 0;
    width: 310px;
    border-bottom: 2px solid #fff;
  }
  .inputbox label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    color: #fff;
    font-size: 1.3em;
    pointer-events: none;
    transition: 0.4s;
  }
  input:focus ~ label,
  input:valid ~ label {
    top: -5px;
  }
  .inputbox input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    padding: 0 35px 0 5px;
    color: #fff;
  }
  .inputbox ion-icon {
    position: absolute;
    right: 8px;
    color: #fff;
    font-size: 1.2em;
    top: 20px;
  }
  .forget {
    margin: -15px 0 15px 5px;
    font-size: 1.1em;
    color: #fff;
    display: flex;
    /
    justify-content: space-between;
  }

  .forget label input {
    margin-right: 3px;
  }
  .forget label a {
    color: #fff;
    text-decoration: none;
    font-size: 1.1em;
    margin-left: 95px;
  }
  .forget label a:hover {
    text-decoration: underline;
  }
  button {
    width: 100%;
    height: 40px;
    border-radius: 40px;
    background: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1.9em;
    font-weight: 600;
  }
  .register {
    font-size: 0.9em;
    color: #fff;
    text-align: center;
    margin: 25px 0 10px;
  }
  .register p a {
    text-decoration: none;
    color: #fff;
    font-weight: 600;
    margin-left: 10px;
  }
  .register p a:hover {
    text-decoration: underline;
  }
`;

export default SignUp;

// import { TextField, FormControlLabel, Checkbox, Button, Box, Alert } from '@mui/material';

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Registration = () => {

//   const [error, setError] = useState({
//     status: false,
//     msg: "",
//     type: ""
//   })

//   // this we use for redirecting from one page to other page without any link tag ....
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = new FormData(e.currentTarget);
//     console.log(data)
//     const actualData = {
//       name: data.get('name'),
//       email: data.get('email'),
//       password: data.get('password'),
//       password_confirmation: data.get('password_confirmation'),
//       tc: data.get('tc'),
//     }

//     if (actualData.name && actualData.email && actualData.password && actualData.password_confirmation && actualData.tc !== null) {
//       if (actualData.password === actualData.password_confirmation) {
//         console.log(actualData);
//         document.getElementById('registration-form').reset()
//         setError({ status: true, msg: "Registration Successful", type: 'success' })

//         navigate('/dashboard')
//       } else {
//         setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
//       }
//     } else {
//       setError({ status: true, msg: "All Fields are Required", type: 'error' })
//     }
//   }

//   return <>
//     <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
//       <TextField margin='normal' required fullWidth id='name' name='name' label='Name' />
//       <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
//       <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
//       <TextField margin='normal' required fullWidth id='password_confirmation' name='password_confirmation' label='Confirm Password' type='password' />
//       <FormControlLabel control={<Checkbox value="agree" color="primary" name="tc" id="tc" />} label="I agree to term and condition." />
//       <Box textAlign='center'>
//         <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Join</Button>
//       </Box>
//       {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
//     </Box>
//   </>;
// };

// export default Registration;
