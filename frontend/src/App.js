import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Cookies from "js-cookie";

//import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

// import "./App.css";
import "./App.css";

//CSS
import "./styles/Header.css";
import "./styles/SignIn.css";
import "./styles/SignUp.css";
import "./styles/SearchMusic.css";
import "./styles/RecommendedMusic.css";
import "./styles/App.css";
import "./styles/UserDetails.css";
import "./styles/WorkoutLog.css";
import "./styles/WaterLog.css";
import "./styles/FoodLog.css";
import "./styles/WorkoutHistory.css";
import "./styles/WaterIntake.css";
import "./styles/CaloriesBurnt.css";
import "./styles/Home.css";
import "./styles/About.css";
import "./styles/Contact.css";

//Components
import Signup from "./components/Signup.js";
import Signin from "./components/Signin.js";
import Header from "./components/Header.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import WorkoutLog from "./components/WorkoutLog.js";
import FoodLog from "./components/FoodLog.js";
import WaterLog from "./components/WaterLog.js";
import CaloriesBurnt from "./components/CaloriesBurnt.js";
import WaterIntake from "./components/WaterIntake.js";
import SearchMusic from "./components/SearchMusic.js";
import RecommendedMusic from "./components/RecommendedMusic.js";
// import Diet from './components/Diet.js'
import Contact from "./components/Contact.js";
import UserDetails from "./components/UserDetails.js";
import LogOut from "./components/LogOut.js";
import WorkoutHistory from "./components/WorkoutHistory.js";

import ExerciseDetail from "./pages/ExerciseDetail";
import Exercise from "./pages/Home";
import CalorieCalculator from "./components/CalorieCalculator.js";
import UpdateDietProfile from "./components/UpdateDietProfile.js";

function App() {
  const [signUpText, setSignUpText] = useState("Sign Up");
  const [signInText, setSignInText] = useState("Sign In");
  const [loggedIn, setLoggedIn] = useState(false);
  const [signUpRoute, setSignUpRoute] = useState("/signup");
  const [signInRoute, setSignInRoute] = useState("/signin");
  const [userDetails, setUserDetails] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);

  const toggleUserDetailsModal = () => {
    setShowUserDetails(!showUserDetails);
  };
  const updateUserDetails = (text) => {
    setUserDetails(text);
  };
  const updateSignUpRoute = (text) => {
    setSignUpRoute(text);
  };
  const updateSignInRoute = (text) => {
    setSignInRoute(text);
  };
  const updateSignUpText = (text) => {
    setSignUpText(text);
  };
  const updateSignInText = (text) => {
    setSignInText(text);
  };

  useEffect(() => {
    const checkUserLoginStatus = () => {
      console.log(userDetails);
      if (Cookies.get("isLoggedIn") === "true") {
        console.log("user has already logged in");
        const userDetailCookie = Cookies.get("userDetail");
        if (!userDetailCookie) {
          Cookies.set("isLoggedIn", "false");
          alert("Critical Error: Error with Cookies, Clear All the Cookies.");
          return;
        }
        const storedUser = JSON.parse(userDetailCookie);
        let username = storedUser.username;
        updateSignUpText(username);
        setLoggedIn(true);
        updateSignInText("Log Out");
        updateSignInRoute("/logOut");
        updateSignUpRoute("#");
      }
    };

    checkUserLoginStatus();
  }, [userDetails]);

  return (
    <>
      <Analytics />
      <Router>
        <div>
          <Header
            signUpText={signUpText}
            updateSignUpText={updateSignUpText}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            signInText={signInText}
            updateSignInText={updateSignInText}
            updateSignInRoute={updateSignInRoute}
            updateSignUpRoute={updateSignUpRoute}
            signUpRoute={signUpRoute}
            signInRoute={signInRoute}
            toggleUserDetailsModal={toggleUserDetailsModal}
            showUserDetails={showUserDetails}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/exercise" element={<Exercise />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route
              path="/workoutLog"
              element={
                <WorkoutLog
                  signUpText={signUpText}
                  updateSignUpText={updateSignUpText}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  signInText={signInText}
                  updateSignInText={updateSignInText}
                  updateSignInRoute={updateSignInRoute}
                  updateSignUpRoute={updateSignUpRoute}
                  signUpRoute={signUpRoute}
                  signInRoute={signInRoute}
                  updateUserDetails={updateUserDetails}
                  showUserDetails={showUserDetails}
                  userDetails={userDetails}
                />
              }
            />
            <Route
              path="/foodLog"
              element={
                <FoodLog
                  signUpText={signUpText}
                  updateSignUpText={updateSignUpText}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  signInText={signInText}
                  updateSignInText={updateSignInText}
                  updateSignInRoute={updateSignInRoute}
                  updateSignUpRoute={updateSignUpRoute}
                  signUpRoute={signUpRoute}
                  signInRoute={signInRoute}
                />
              }
            />
            <Route
              path="/waterLog"
              element={
                <WaterLog
                  signUpText={signUpText}
                  updateSignUpText={updateSignUpText}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  signInText={signInText}
                  updateSignInText={updateSignInText}
                  updateSignInRoute={updateSignInRoute}
                  updateSignUpRoute={updateSignUpRoute}
                  signUpRoute={signUpRoute}
                  signInRoute={signInRoute}
                />
              }
            />
            <Route
              path="/workoutHistory"
              element={
                <WorkoutHistory
                  signUpText={signUpText}
                  updateSignUpText={updateSignUpText}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  signInText={signInText}
                  updateSignInText={updateSignInText}
                  updateSignInRoute={updateSignInRoute}
                  updateSignUpRoute={updateSignUpRoute}
                  signUpRoute={signUpRoute}
                  signInRoute={signInRoute}
                />
              }
            />
            <Route
              path="/caloriesBurnt"
              element={
                <CaloriesBurnt
                  signUpText={signUpText}
                  updateSignUpText={updateSignUpText}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  signInText={signInText}
                  updateSignInText={updateSignInText}
                  updateSignInRoute={updateSignInRoute}
                  updateSignUpRoute={updateSignUpRoute}
                  signUpRoute={signUpRoute}
                  signInRoute={signInRoute}
                />
              }
            />
            <Route
              path="/waterIntake"
              element={
                <WaterIntake
                  signUpText={signUpText}
                  updateSignUpText={updateSignUpText}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  signInText={signInText}
                  updateSignInText={updateSignInText}
                  updateSignInRoute={updateSignInRoute}
                  updateSignUpRoute={updateSignUpRoute}
                  signUpRoute={signUpRoute}
                  signInRoute={signInRoute}
                />
              }
            />
            <Route
              path="/updatedietplan"
              element={
                <UpdateDietProfile
                // signUpText={signUpText}
                // updateSignUpText={updateSignUpText}
                // loggedIn={loggedIn}
                // setLoggedIn={setLoggedIn}
                // signInText={signInText}
                // updateSignInText={updateSignInText}
                // updateSignInRoute={updateSignInRoute}
                // updateSignUpRoute={updateSignUpRoute}
                // signUpRoute={signUpRoute}
                // signInRoute={signInRoute}
                />
              }
            />
            {/* <Route path="/diet" element={<Diet signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} /> */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/searchMusic" element={<SearchMusic />} />
            <Route path="/recommendedMusic" element={<RecommendedMusic />} />
            <Route
              path="/signup"
              element={
                <Signup
                  signUpText={signUpText}
                  updateSignUpText={updateSignUpText}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  signInText={signInText}
                  updateSignInText={updateSignInText}
                  updateSignInRoute={updateSignInRoute}
                  updateSignUpRoute={updateSignUpRoute}
                  signUpRoute={signUpRoute}
                  signInRoute={signInRoute}
                  updateUserDetails={updateUserDetails}
                  toggleUserDetailsModal={toggleUserDetailsModal}
                  showUserDetails={showUserDetails}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Signin
                  signUpText={signUpText}
                  updateSignUpText={updateSignUpText}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  signInText={signInText}
                  updateSignInText={updateSignInText}
                  updateSignInRoute={updateSignInRoute}
                  updateSignUpRoute={updateSignUpRoute}
                  signUpRoute={signUpRoute}
                  signInRoute={signInRoute}
                  updateUserDetails={updateUserDetails}
                  toggleUserDetailsModal={toggleUserDetailsModal}
                  showUserDetails={showUserDetails}
                />
              }
            />
            <Route
              path="/logOut"
              element={
                <LogOut
                  signUpText={signUpText}
                  updateSignUpText={updateSignUpText}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  signInText={signInText}
                  updateSignInText={updateSignInText}
                  updateSignInRoute={updateSignInRoute}
                  updateSignUpRoute={updateSignUpRoute}
                  signUpRoute={signUpRoute}
                  signInRoute={signInRoute}
                  updateUserDetails={updateUserDetails}
                  toggleUserDetailsModal={toggleUserDetailsModal}
                  showUserDetails={showUserDetails}
                />
              }
            />
          </Routes>
          {showUserDetails && (
            <UserDetails
              updateUserDetails={updateUserDetails}
              userDetails={userDetails}
              toggleUserDetailsModal={toggleUserDetailsModal}
              showUserDetails={showUserDetails}
            />
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
