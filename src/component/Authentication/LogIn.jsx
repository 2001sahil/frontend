import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
const LogIn = () => {
  const history = useNavigate();
  const toast = useToast();
  
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!user.email || !user.password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/user/login",
        { email:user.email, 
        password:user.password },
        config
      );

      console.log("successfully login",JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history('/chat');
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <section>
        <div className="form-box">
          <div className="form-value">
            {/* <form> */}
              <h2>Log in</h2>

              <div className="inputbox" id="email">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  value={user.email}
                  onChange={handleInputs}
                  type="mail"
                  name="email"
                  id="email"
                  required
                />
                <label htmlFor="">Email</label>
              </div>
              <div className="inputbox" id="password">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  name="password"
                  id="password"
                  value={user.password}
                  onChange={handleInputs}
                  type="password"
                  required
                />
                <label htmlFor="">Password</label>
              </div>
              <div className="forget">
                <label htmlFor="">
                  <input type="checkbox" />
                  Remember Me
                  <Link className="forgot-password" to="/FPassword">
                    Forget Password
                  </Link>
                </label>
              </div>
              <button onClick={submitHandler}>Log in</button>
              <div className="register">
                <p>
                  Don't have a account
                  <Link to="/chat"> Register</Link>
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
    height: 450px;
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

export default LogIn;
