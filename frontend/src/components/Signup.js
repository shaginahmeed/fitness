// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";

// function Signup({
//   updateSignUpText,
//   signUpText,
//   loggedIn,
//   setLoggedIn,
//   signInText,
//   updateSignInText,
//   updateSignInRoute,
//   updateSignUpRoute,
//   signUpRoute,
//   signInRoute,
//   updateUserDetails,
//   toggleUserDetailsModal,
//   showUserDetails,
// }) {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [weight, setWeight] = useState("");
//   // const [targetWeight, setTargetWeight] = useState('');
//   const [lifestyle, setLifestyle] = useState("");
//   const [goal, setGoal] = useState("");
//   const [height, setHeight] = useState("");
//   const [bmi, setBmi] = useState("");
//   const [birthday, setBirthday] = useState("");
//   const [age, setAge] = useState("");
//   const [sex, setSex] = useState("");
//   const navigate = useNavigate();
//   const [typingTimer, setTypingTimer] = useState(null);

//   const template_id = process.env.REACT_APP_EMAIL_TEMPLATE_ID;
//   const service_id = process.env.REACT_APP_EMAIL_SERVICE_ID;
//   const user_id = process.env.REACT_APP_EMAIL_USER_ID;

//   const handleInputChange = async () => {
//     // const value = e;
//     // setUsername(value);
//     clearTimeout(typingTimer);
//     setTypingTimer(
//       setTimeout(() => {
//         checkUserName();
//         // handleInputChange();
//       }, 3000)
//     );
//   };
//   useEffect(() => {
//     return () => {
//       clearTimeout(typingTimer);
//     };
//   }, [typingTimer]);
//   const sendEmail = async () => {
//     // e.preventDefault();

//     const data = {
//       service_id: service_id,
//       template_id: template_id,
//       user_id: user_id,
//       template_params: {
//         to_name: "Rushil Patel",
//         from_name: username,
//         message: `
//           There is a new signup on reLife, wohooo! \n
//           Details \n
//           email: ${email} , \n
//           username: ${username}
//           `,
//         reply_to: "shaginahmeed@gmail.com",
//       },
//     };

//     axios
//       .post("https://api.emailjs.com/api/v1.0/email/send", data, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         // console.log(response.data);
//         // console.log("message sent");
//       })
//       .catch((error) => {
//         console.error(
//           "Error sending email:",
//           error.response ? error.response.data : error
//         );
//         console.error("Request data:", data);
//       });
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     // if(checkUserName()==='true'){
//     //   alert("Username already exists. Please try another one.");
//     //   setUsername('');
//     //   return;
//     // }
//     const userData = {
//       username: username,
//       email: email,
//       password: password,
//       weight: weight,
//       // targetWeight: targetWeight,
//       // goal: goal,
//       lifestyle: lifestyle,
//       goal: goal,
//       height: height,
//       bmi: bmi,
//       birthday: birthday,
//       age: age,
//       sex: sex,
//     };
//     // console.log('User data:', userData); //Saving data
//     // console.log(userData.age);
//     // console.log(typeof(userData.age));
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_BACKEND_URL}/api/userGet`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(userData),
//         }
//       );
//       if (response.ok) {
//         // console.log('Data submitted successfully');
//       } else {
//         // console.log(response);
//         console.error("Failed to submit data");
//         alert("Username is already taken.");
//         setUsername("");
//         return;
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       return;
//     }

//     await sendEmail();
//     updateUserDetails(userData);
//     // console.table(userData);
//     //comment the below part
//     updateSignUpText(username);
//     setLoggedIn(true);
//     updateSignInText("Log Out");
//     updateSignInRoute("/logOut");
//     updateSignUpRoute("#");
//     // updateSignUpRoute('/userDetails');
//     setUsername("");
//     setEmail("");
//     setPassword("");
//     setWeight("");
//     setLifestyle("");
//     setHeight("");
//     setGoal("");
//     setBmi("");
//     setBirthday("");
//     setAge("");
//     setSex("");
//     Cookies.set("userDetail", JSON.stringify(userData));
//     Cookies.set("isLoggedIn", true);
//     // const storedUser = JSON.parse(Cookies.get('userDetail'));

//     // console.log(storedUser);
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_BACKEND_URL}/api/userGet`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(userData),
//         }
//       );
//       if (response.ok) {
//         // console.log('Data submitted successfully');
//       } else {
//         console.error("Failed to submit data");
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//     navigate("/");

//     // console.log(signInText);
//     // console.log(signUpText);

//     // const valueForSignUp = document.getElementById('SignUp');
//     // const name1 = username;
//     // // const name = '${name1}';
//     // const linkElement = <Link to="/signup">{name1}</Link>;
//     // ReactDOM.render(linkElement, valueForSignUp);

//     // if (username) {
//     //   console.log(username);
//     //   console.log(document.querySelector('#This-Text').innerHTML);
//     //   document.querySelector('#This-Text').innerHTML = username;
//     //   document.querySelector('#This-Text').setAttribute('to','/profile-details');
//     //   // document.querySelector('#This-Text') =
//     //   // updateSignUpText(username);
//     // }

//     //un comment the below part
//   };
//   // useEffect(() => {
//   //   console.log('Username:', username); // Will log the updated value
//   //   console.log('SignInText:', signInText); // Assuming signInText is a state or prop
//   //   console.log('SignUpText:', signUpText); // Assuming signUpText is a state or prop
//   // }, [username, signInText, signUpText]);

//   const calculateAge = () => {
//     const today = new Date();
//     const birthDate = new Date(birthday);
//     const ageDifference = today - birthDate;
//     const calculatedAge = Math.floor(
//       ageDifference / (1000 * 60 * 60 * 24 * 365.25)
//     );
//     setAge(calculatedAge);
//   };

//   useEffect(() => {
//     calculateAge();
//   }, [birthday]);

//   const calculateBmi = () => {
//     if (!height || !weight) return;
//     const heightInMeters = parseFloat(height) / 100; // Convert height to meters
//     const bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
//     setBmi(parseFloat(bmiValue.toFixed(2))); // Round BMI value to two decimal places
//   };

//   useEffect(() => {
//     calculateBmi();
//   }, [weight, height]);

//   //To check duplicate username
//   const checkUserName = async () => {
//     try {
//       const uri = `${process.env.REACT_APP_BACKEND_URL}/api/users/` + username;
//       // console.log('Request URI:', uri);
//       const response = await axios.get(uri);

//       if (response.status === 200) {
//         // console.log("Username exists:", response.data);
//         return true;
//       } else {
//         console.error(
//           "Username does not exist or other server error:",
//           response.status
//         );
//         return false;
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error(
//           "Server responded with error status:",
//           error.response.status
//         );
//         console.error("Error response data:", error.response.data);
//       } else if (error.request) {
//         console.error("No response received from the server:", error.request);
//       } else {
//         console.error("Error setting up the request:", error.message);
//       }
//     }
//   };

//   return (
//     <div className="sign-up-container">
//       <h2 className="sign-up-title">Sign Up</h2>
//       <form onSubmit={handleSignUp} className="sign-up-form">
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => {
//               setUsername(e.target.value);
//               handleInputChange();
//             }}
//             placeholder="Enter username"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter email"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//               // handleInputChange();
//             }}
//             placeholder="Enter password"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="weight">Weight:</label>
//           <input
//             type="number"
//             id="weight"
//             value={weight}
//             min="1"
//             onChange={(e) => {
//               setWeight(e.target.value);
//               // calculateBmi();
//               // handleInputChange();
//             }}
//             placeholder="Enter weight in kg"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="lifestyle">Lifestyle:</label>
//           <select
//             id="lifestyle"
//             value={lifestyle}
//             onChange={(e) => setLifestyle(e.target.value)}
//             required
//           >
//             <option value="">Select Lifestyle</option>
//             <option value="Sedentary">Sedentary</option>
//             <option value="Moderate">Moderate</option>
//             <option value="Active">Active</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="goal">Goal:</label>
//           <select
//             id="goal"
//             value={goal}
//             onChange={(e) => setGoal(e.target.value)}
//             required
//           >
//             <option value="">Select Goal</option>
//             <option value="Weight Loss">Weight Loss</option>
//             <option value="Weight Gain">Weight Gain</option>
//             <option value="Weight Maintain">Weight Maintain</option>
//             <option value="Bulking">Bulking</option>
//             <option value="Cutting">Cutting</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="height">Height:</label>
//           <input
//             type="number"
//             id="height"
//             min="1"
//             value={height}
//             onChange={(e) => {
//               setHeight(e.target.value);
//               // calculateBmi();
//             }}
//             placeholder="Enter height in cm"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="bmi">Bmi:</label>
//           <input
//             type="number"
//             id="bmi"
//             value={bmi}
//             onChange={(e) => setBmi(e.target.value)}
//             readOnly
//             placeholder="Calculated from height and weight"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="birthday">Birthday:</label>
//           <input
//             type="date"
//             id="birthday"
//             value={birthday}
//             onChange={(e) => {
//               setBirthday(e.target.value);
//               // calculateAge();
//             }}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="age">Age:</label>
//           <input
//             type="text"
//             id="age"
//             min="18"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             readOnly
//             placeholder="Calculated from birthday"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="sex">Sex:</label>
//           <select
//             id="sex"
//             value={sex}
//             onChange={(e) => setSex(e.target.value)}
//             required
//           >
//             <option value="">Select Sex</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// }

// export default Signup;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Signup({
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
  updateUserDetails,
  toggleUserDetailsModal,
  showUserDetails,
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [weight, setWeight] = useState("");
  const [lifestyle, setLifestyle] = useState("");
  const [goal, setGoal] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [birthday, setBirthday] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const navigate = useNavigate();
  const [typingTimer, setTypingTimer] = useState(null);

  const template_id = process.env.REACT_APP_EMAIL_TEMPLATE_ID;
  const service_id = process.env.REACT_APP_EMAIL_SERVICE_ID;
  const user_id = process.env.REACT_APP_EMAIL_USER_ID;

  const handleInputChange = async () => {
    // const value = e;
    // setUsername(value);
    clearTimeout(typingTimer);
    setTypingTimer(
      setTimeout(() => {
        checkUserName();
        // handleInputChange();
      }, 3000)
    );
  };
  useEffect(() => {
    return () => {
      clearTimeout(typingTimer);
    };
  }, [typingTimer]);
  const sendEmail = async () => {
    // e.preventDefault();

    const data = {
      service_id: service_id,
      template_id: template_id,
      user_id: user_id,
      template_params: {
        to_name: "Rushil Patel",
        from_name: username,
        message: `
          There is a new signup on reLife, wohooo! \n
          Details \n
          email: ${email} , \n
          username: ${username}
          `,
        reply_to: "shaginahmeed@gmail.com",
      },
    };

    axios
      .post("https://api.emailjs.com/api/v1.0/email/send", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response.data);
        // console.log("message sent");
      })
      .catch((error) => {
        console.error(
          "Error sending email:",
          error.response ? error.response.data : error
        );
        console.error("Request data:", data);
      });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // if(checkUserName()==='true'){
    //   alert("Username already exists. Please try another one.");
    //   setUsername('');
    //   return;
    // }
    const userData = {
      username: username,
      email: email,
      password: password,
      weight: weight,
      // targetWeight: targetWeight,
      // goal: goal,
      lifestyle: lifestyle,
      goal: goal,
      height: height,
      bmi: bmi,
      birthday: birthday,
      age: age,
      sex: sex,
    };
    // console.log('User data:', userData); //Saving data
    // console.log(userData.age);
    // console.log(typeof(userData.age));
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/userGet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
        // console.log('Data submitted successfully');
      } else {
        // console.log(response);
        console.error("Failed to submit data");
        alert("Username is already taken.");
        setUsername("");
        return;
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      return;
    }

    await sendEmail();
    updateUserDetails(userData);
    // console.table(userData);
    //comment the below part
    updateSignUpText(username);
    setLoggedIn(true);
    updateSignInText("Log Out");
    updateSignInRoute("/logOut");
    updateSignUpRoute("#");
    // updateSignUpRoute('/userDetails');
    setUsername("");
    setEmail("");
    setPassword("");
    setWeight("");
    setLifestyle("");
    setHeight("");
    setGoal("");
    setBmi("");
    setBirthday("");
    setAge("");
    setSex("");
    Cookies.set("userDetail", JSON.stringify(userData));
    Cookies.set("isLoggedIn", true);
    // const storedUser = JSON.parse(Cookies.get('userDetail'));

    // console.log(storedUser);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/userGet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
        // console.log('Data submitted successfully');
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    navigate("/");

    // console.log(signInText);
    // console.log(signUpText);

    // const valueForSignUp = document.getElementById('SignUp');
    // const name1 = username;
    // // const name = '${name1}';
    // const linkElement = <Link to="/signup">{name1}</Link>;
    // ReactDOM.render(linkElement, valueForSignUp);

    // if (username) {
    //   console.log(username);
    //   console.log(document.querySelector('#This-Text').innerHTML);
    //   document.querySelector('#This-Text').innerHTML = username;
    //   document.querySelector('#This-Text').setAttribute('to','/profile-details');
    //   // document.querySelector('#This-Text') =
    //   // updateSignUpText(username);
    // }

    //un comment the below part
  };
  // useEffect(() => {
  //   console.log('Username:', username); // Will log the updated value
  //   console.log('SignInText:', signInText); // Assuming signInText is a state or prop
  //   console.log('SignUpText:', signUpText); // Assuming signUpText is a state or prop
  // }, [username, signInText, signUpText]);

  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(birthday);
    const ageDifference = today - birthDate;
    const calculatedAge = Math.floor(
      ageDifference / (1000 * 60 * 60 * 24 * 365.25)
    );
    setAge(calculatedAge);
  };

  useEffect(() => {
    calculateAge();
  }, [birthday]);

  const calculateBmi = () => {
    if (!height || !weight) return;
    const heightInMeters = parseFloat(height) / 100; // Convert height to meters
    const bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    setBmi(parseFloat(bmiValue.toFixed(2))); // Round BMI value to two decimal places
  };

  useEffect(() => {
    calculateBmi();
  }, [weight, height]);

  //To check duplicate username
  const checkUserName = async () => {
    try {
      const uri = `${process.env.REACT_APP_BACKEND_URL}/api/users/` + username;
      // console.log('Request URI:', uri);
      const response = await axios.get(uri);

      if (response.status === 200) {
        // console.log("Username exists:", response.data);
        return true;
      } else {
        console.error(
          "Username does not exist or other server error:",
          response.status
        );
        return false;
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

  const containerStyle = {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    // maxWidth: "500px",
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
    // fontWeight: "600",
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

  const selectStyle = {
    ...inputStyle,
    appearance: "none",
    backgroundImage:
      "linear-gradient(45deg, transparent 50%, #ff3333 50%), linear-gradient(135deg, #ff3333 50%, transparent 50%)",
    backgroundPosition:
      "calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)",
    backgroundSize: "5px 5px, 5px 5px",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        // width: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div style={containerStyle}>
        <h2 style={titleStyle}>Create Your Account</h2>
        <form onSubmit={handleSignUp}>
          {[
            {
              label: "Username",
              type: "text",
              value: username,
              setter: setUsername,
              placeholder: "Enter username",
            },
            {
              label: "Email",
              type: "email",
              value: email,
              setter: setEmail,
              placeholder: "Enter email",
            },
            {
              label: "Password",
              type: "password",
              value: password,
              setter: setPassword,
              placeholder: "Enter password",
            },
            {
              label: "Weight (kg)",
              type: "number",
              value: weight,
              setter: setWeight,
              placeholder: "Enter weight",
              min: "1",
            },
            {
              label: "Height (cm)",
              type: "number",
              value: height,
              setter: setHeight,
              placeholder: "Enter height",
              min: "1",
            },
            {
              label: "Birthday",
              type: "date",
              value: birthday,
              setter: setBirthday,
            },
          ].map(({ label, type, value, setter, placeholder, min }) => (
            <div key={label} style={inputContainerStyle}>
              <label style={labelStyle}>{label}:</label>
              <input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={placeholder}
                min={min}
                style={inputStyle}
                required
              />
            </div>
          ))}

          {[
            {
              label: "Lifestyle",
              value: lifestyle,
              setter: setLifestyle,
              options: ["Sedentary", "Moderate", "Active"],
            },
            {
              label: "Goal",
              value: goal,
              setter: setGoal,
              options: [
                "Weight Loss",
                "Weight Gain",
                "Weight Maintain",
                "Bulking",
                "Cutting",
              ],
            },
            {
              label: "Sex",
              value: sex,
              setter: setSex,
              options: ["Male", "Female", "Other"],
            },
          ].map(({ label, value, setter, options }) => (
            <div key={label} style={inputContainerStyle}>
              <label style={labelStyle}>{label}:</label>
              <select
                value={value}
                onChange={(e) => setter(e.target.value)}
                style={selectStyle}
                required
              >
                <option value="">Select {label}</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div style={inputContainerStyle}>
            <label style={labelStyle}>BMI:</label>
            <input
              type="number"
              value={bmi}
              onChange={(e) => setBmi(e.target.value)}
              style={{ ...inputStyle, cursor: "not-allowed" }}
              readOnly
              placeholder="Calculated from height and weight"
              required
            />
          </div>

          <div style={inputContainerStyle}>
            <label style={labelStyle}>Age:</label>
            <input
              type="text"
              value={age}
              style={{ ...inputStyle, cursor: "not-allowed" }}
              readOnly
              placeholder="Calculated from birthday"
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
