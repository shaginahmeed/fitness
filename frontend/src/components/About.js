import React, { useState } from "react";

function About() {
  const [showAnswers, setShowAnswers] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const toggleAnswer = (index) => {
    const newShowAnswers = [...showAnswers];
    newShowAnswers[index] = !newShowAnswers[index];
    setShowAnswers(newShowAnswers);
  };
  function GithubIcon(props) {
    const githubLink = "https://github.com/";

    return (
      <a href={githubLink} target="_blank" rel="noopener noreferrer">
        <h1 className="ghub" style={{ fontSize: "34px" }}>
          Socials
        </h1>
        <br></br>
        <img
          src={require("../assets/gihub4.png")}
          alt="GitHub icon"
          style={{ width: "35px", height: "35px", marginRight: "15px" }}
        />
      </a>
    );
  }
  function LinkedInIcon(props) {
    const LinkedInLink = "https://github.com/";

    return (
      <a href={LinkedInLink} target="_blank" rel="noopener noreferrer">
        <img
          src={require("../assets/lk2.webp")}
          alt="LK icon"
          style={{ width: "35px", height: "35px" }}
        />
      </a>
    );
  }
  function GithubIcon1(props) {
    const githubLink1 = "https://github.com/";

    return (
      <a
        href={githubLink1}
        target="_blank"
        rel="noopener noreferrer"
        className="gh2"
      >
        <h1 className="lk" style={{ fontSize: "34px" }}>
          Socials
        </h1>
        <br></br>
        <img
          src={require("../assets/gihub4.png")}
          alt="GitHub icon1"
          style={{ width: "35px", height: "35px" }}
        />
      </a>
    );
  }
  function LinkedInIcon1(props) {
    const LinkedInLink1 = "https://github.com/";
    return (
      <a
        href={LinkedInLink1}
        target="_blank"
        rel="noopener noreferrer"
        className="lk4"
      >
        <img
          src={require("../assets/lk2.webp")}
          alt="lk icon1"
          style={{ width: "35px", height: "35px" }}
        />
      </a>
    );
  }

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="about">
      <section className="section section1">
        <h1>The new favorite destination for fitness freaks</h1>
      </section>
      <section className="section section2">
        <div className="content">
          <h1>WHO ARE WE</h1>
        </div>
      </section>
      <section className="section section3">
        <div className="photo">
          <img
            src={require("../assets/shagin.jpg")}
            alt="Shagin Ahmed"
            style={{ width: 520, height: "auto" }}
          />
        </div>
      </section>
      <section className="section section4">
        <div className="text">
          <h1 className="name" style={{ fontSize: "38px" }}>
            Shagin Ahmed
          </h1>
        </div>
      </section>
      <section className="section section5">
        <div className="para">
          <p className="toto">Hey There !</p>
        </div>
      </section>
      <section className="section section6">
        <GithubIcon />
        <LinkedInIcon />
      </section>
      <section className="section section7">
        <div className="photo1">
          <img
            src={require("../assets/shagin.jpg")}
            alt="shagin"
            style={{ width: 580, height: "auto" }}
          />
        </div>
      </section>
      <section className="section section8">
        <div className="salonin">
          <h1 className="Salonina" style={{ fontSize: "38px" }}>
            Shagin Ahmed
          </h1>
        </div>
      </section>
      <section className="section section9">
        <div className="salonintro">
          <p className="sintro">Hey there! ! </p>
        </div>
      </section>
      <section className="section section10">
        <GithubIcon1 />

        <LinkedInIcon1 />
      </section>
      <section className="section section11">
        <h1 className="Foundermsg" style={{ fontSize: "50px", color: "red" }}>
          Founders' Message
        </h1>
      </section>
      <section className="section section12">
        <div className="envelope" onClick={toggleModal}>
          <img
            src={require("../assets/envelope1.png")}
            alt="Envelope"
            style={{ width: "300px", height: "200px" }}
          />
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={toggleModal}>
                &times;
              </span>
              <p style={{ color: "black", fontFamily: "impact" }}>
                Welcome to reLife, where fitness meets technology!
              </p>
              <p
                style={{
                  color: "black",
                  fontFamily: "Bookman, URW Bookman L, serif",
                }}
              >
                We're passionate about helping you achieve your fitness goals.
                Our platform is designed to track your progress, provide
                personalized workout plans, and offer community support to keep
                you motivated.
              </p>
              <p
                style={{
                  color: "black",
                  fontFamily: "Bookman, URW Bookman L, serif",
                }}
              >
                Join us on your fitness journey and let's reach new heights
                together!
              </p>
            </div>
          </div>
        )}
      </section>
      <section className="section section13">
        <h1 classname="qa" style={{ fontSize: "50px", color: "red" }}>
          FAQs
        </h1>
        <div className="question">
          <h3>
            Is reLife a free calorie tracker app?
            <span
              className={`arrow ${showAnswers[0] ? "up" : "down"}`}
              onClick={() => toggleAnswer(0)}
            ></span>
          </h3>
          {showAnswers[0] && (
            <p style={{ color: "red" }}>
              Yes, reLife is a free calorie tracker app.
            </p>
          )}
        </div>
        <div className="question">
          <h3>
            How to track calories with a calorie counter app like reLife?
            <span
              className={`arrow ${showAnswers[1] ? "up" : "down"}`}
              onClick={() => toggleAnswer(1)}
            ></span>
          </h3>
          {showAnswers[1] && (
            <p style={{ color: "red" }}>
              To track calories with reLife, you can search for the food you ate
              in the app's database, enter the portion size, and the app will
              calculate the calorie and nutrition information for you.
            </p>
          )}
        </div>
        <div className="question">
          <h3>
            What nutrition data can I track besides calories?
            <span
              className={`arrow ${showAnswers[2] ? "up" : "down"}`}
              onClick={() => toggleAnswer(2)}
            ></span>
          </h3>
          {showAnswers[2] && (
            <p style={{ color: "red" }}>
              With reLife, you can track a variety of nutrition data, including
              protein, fat, carbohydrates, fiber, sugar, and more.
            </p>
          )}
        </div>
        <div className="question">
          <h3>
            Does reLife use a BMI calculator or BMR calculator to set goals?
            <span
              className={`arrow ${showAnswers[3] ? "up" : "down"}`}
              onClick={() => toggleAnswer(3)}
            ></span>
          </h3>
          {showAnswers[3] && (
            <p style={{ color: "red" }}>
              Yes, reLife uses both a BMI calculator and a BMR calculator to
              help you set weight loss, maintenance, and gain goals based on
              your current weight, height, age, and gender.
            </p>
          )}
        </div>
        <div className="question">
          <h3>
            Can I track weight, workouts, water, or food intake?
            <span
              className={`arrow ${showAnswers[4] ? "up" : "down"}`}
              onClick={() => toggleAnswer(4)}
            ></span>
          </h3>
          {showAnswers[4] && (
            <p style={{ color: "red" }}>
              Yes, reLife allows you to track your weight, workouts, water
              intake, and even food intake.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default About;
