import React, { useState, useEffect } from "react";
import axios from "axios";
import videoSrc from "../assets/video3.mp4";

import NutritionCheckerForm from "./NutritionCheckerForm";
import Box from "@mui/material/Box";
import CalorieCalculator from "./CalorieCalculator";

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="video-container">
        <video autoPlay muted loop id="video-bg">
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="video-text">
          <h1 className="white-text">A BETTER WAY TO TRACK YOUR FITNESS</h1>
        </div>
      </div>
      <div className="fitnessq">
        <img src={require("../assets/fq2.jpeg")} alt="fitnessquo" />
      </div>
      <div className="quotation">
        <img src={require("../assets/quotation.png")} alt="quotation" />
      </div>
      <div className="fithead">
        <h1 className="siq"> STRENGTH IN WORDS</h1>
      </div>
      <FitnessQuote />
      {showScrollButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <img
            src={require("../assets/sb2.png")}
            alt="image4"
            className="button-image"
          />
        </button>
      )}
      <div className="nutrition-checker">
        <NutritionCheckerForm />
      </div>

      <div className="calorie-calculator">
        <CalorieCalculator />
      </div>
    </>
  );
};

const FitnessQuote = () => {
  const [quoteData, setQuoteData] = useState({ quote: "", author: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    //const category = "fitness";
    axios
      .get(`https://api.api-ninjas.com/v1/quotes`, {
        headers: { "X-Api-Key": "QAL0STVA6djM5U33JoTKgg==39o78bVkKNgDyWtt" },
      })
      .then((response) => {
        const data = response.data;
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuoteData({
          quote: data[randomIndex].quote,
          author: data[randomIndex].author,
        });
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
        setError("Failed to fetch quote. Please try again later.");
      });
  }, []);
  return (
    <div className="fitness-quote">
      {quoteData.quote ? (
        <p className="fq">
          {quoteData.quote} <p className="authour">- {quoteData.author}</p>
        </p>
      ) : (
        <p className="loading">{error || "Loading..."}</p>
      )}
    </div>
  );
};

export default Home;

{
  /* <div className="nutrition-checker">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NutritionCheckerForm />
        </Box>
      </div> */
}
