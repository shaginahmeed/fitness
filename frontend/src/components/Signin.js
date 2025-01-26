// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from "js-cookie";

// function Signin({updateSignUpText, signUpText, loggedIn, setLoggedIn, signInText, updateSignInText,updateSignInRoute,updateSignUpRoute, signUpRoute, signInRoute, toggleUserDetailsModal, showUserDetails}) {
//     const [username, setUsername] = useState('');
//     // const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [userData, setUserData] = useState({});
//     const navigate = useNavigate();

//     const checkUserName = async () => {
//       try {
//         const uri = `${process.env.REACT_APP_BACKEND_URL}/api/users/` + username;
//         // console.log('Request URI:', uri);
//         const response = await axios.get(uri);

//         if (response.status === 200) {
//           // console.log("Username exists:", response.data.users[0]);
//           setUserData(response.data.users[0]);
//           if(password !== response.data.users[0].password){
//             alert("Wrong Password!");
//             setPassword('');
//             return;
//           }else{
//             await updateSignUpText(username);
//             setLoggedIn(true);
//             updateSignInText('Log Out');
//             updateSignInRoute('/logOut');
//             updateSignUpRoute('#');
//             setUsername('');
//             setPassword('');
//             // console.log("Inside submit form" + JSON.stringify(response.data.users[0]));
//             Cookies.set('userDetail',JSON.stringify(response.data.users[0]));
//             Cookies.set('isLoggedIn',true);
//             navigate('/');
//           }
//         } else {
//           // console.log("Username does not exist or other server error:", response.status);
//           alert("UserName doesnt exsist, please sign up or re-check username");
//           setUsername('');
//           // return;
//           return;
//         }
//       } catch (error) {
//         if (error.response) {
//           console.error('Server responded with error status:', error.response.status);
//           console.error('Error response data:', error.response.data);
//         } else if (error.request) {
//           console.error('No response received from the server:', error.request);
//         } else {
//           console.error('Error setting up the request:', error.message);
//         }
//       }
//     };
//     useState(() => {
//       if(userData){
//         // console.log( "User Data: " + userData);
//       }

//     },[userData])

//     const handleSignIn = async (e) => {
//       e.preventDefault();
//       // const userData1 = {
//       //   username: username,
//       //   password: password,
//       // };
//       // console.log('User data:', userData1); //Saving data
//       await checkUserName();
//       // if(isExit === "2"){
//       //   alert("UserName doesnt exsist, please sign up or re-check username");
//       //   setUsername('');
//       //   return;
//       // }
//       // console.log("Before user data: " + userData);
//       // const pwd = userData.password;
//       // console.log(pwd);
//       // if(password !== pwd){
//       //   alert("Wrong Password!");
//       //   setPassword('');
//       //   return;
//       // }
//       // updateSignUpText(username);
//       // setLoggedIn(true);
//       // updateSignInText('Log Out');
//       // updateSignInRoute('/logOut');
//       // updateSignUpRoute('#');
//       // setUsername('');
//       // setPassword('');
//       // console.log("Inside submit form" + JSON.stringify(userData));
//       // Cookies.set('userDetail',JSON.stringify(userData));
//       // Cookies.set('isLoggedIn',true);
//       // navigate('/');
//     };

//     return (
//       <div className="sign-in-container">
//         <h2 className="sign-in-title">Sign In</h2>
//         <form onSubmit={handleSignIn} className="sign-in-form">
//           <div>
//             <label htmlFor="username">Username:</label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder='Enter username'
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder='Enter password'
//               required
//             />
//           </div>
//           <button type="submit">Sign In</button>
//         </form>
//       </div>
//     );
//   }

//   export default Signin;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Signin({
  updateSignUpText,
  signUpText,
  loggedIn,
  setLoggedIn,
  signInText,
  updateSignInText,
  updateSignInRoute,
  updateSignUpRoute,
  signUpRoute,
  signInRoute,
  toggleUserDetailsModal,
  showUserDetails,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const checkUserName = async () => {
    try {
      const uri = `${process.env.REACT_APP_BACKEND_URL}/api/users/` + username;
      const response = await axios.get(uri);

      if (response.status === 200) {
        setUserData(response.data.users[0]);
        if (password !== response.data.users[0].password) {
          alert("Wrong Password!");
          setPassword("");
          return;
        } else {
          await updateSignUpText(username);
          setLoggedIn(true);
          updateSignInText("Log Out");
          updateSignInRoute("/logOut");
          updateSignUpRoute("#");
          setUsername("");
          setPassword("");
          Cookies.set("userDetail", JSON.stringify(response.data.users[0]));
          Cookies.set("isLoggedIn", true);
          navigate("/");
        }
      } else {
        alert("Username doesn't exist, please sign up or re-check username");
        setUsername("");
        return;
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Server responded with error status:",
          error.response.status
        );
        console.error("Error response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received from the server:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    await checkUserName();
  };

  const containerStyle = {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    margin: "0 0",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(255, 3, 3, 0.3)",
    width: "50%",
  };

  const titleStyle = {
    textAlign: "center",
    color: "#ff3333",
    marginBottom: "30px",
    fontSize: "3.5rem",
  };

  const inputContainerStyle = {
    marginBottom: "20px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    color: "#ff4444",
    fontSize: "1.8rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2a2a2a",
    border: "2px solid #ff3333",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "1.5rem",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ff3333",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.5rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div style={containerStyle}>
        <h2 style={titleStyle}>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              style={inputStyle}
              required
            />
          </div>
          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={inputStyle}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              ...buttonStyle,
              ":hover": {
                backgroundColor: "#ff4444",
              },
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
