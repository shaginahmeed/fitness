import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

function WorkoutLog({ userDetails }) {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [workoutDate, setWorkoutDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [workoutType, setWorkoutType] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [workoutMinutes, setWorkoutMinutes] = useState("");
  const [caloriesBurnt, setCaloriesBurnt] = useState("");
  const [startTime, setStartTime] = useState("");
  const [workoutData, setWorkoutData] = useState([]);
  const [userName, setUserName] = useState("");
  const [apiData, setApiData] = useState([]);
  const [todayWorkoutData, setTodayWorkoutData] = useState([]);

  const [isCalendarAuthorized, setIsCalendarAuthorized] = useState(false);

  const handleCalendarAuth = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/calendar/auth-url`
      );
      window.location.href = response.data.authUrl;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Calendar Authorization Failed",
        text: "Unable to connect to Google Calendar",
      });
    }
  };

  // const addToCalendar = async (workoutDetails) => {
  //   try {
  //     const eventDetails = {
  //       summary: `${workoutDetails.workoutType} - ${workoutDetails.workoutName}`,
  //       description: `Workout Duration: ${workoutDetails.workoutMinutes} minutes\nCalories Burnt: ${workoutDetails.caloriesBurnt}`,
  //       start: {
  //         dateTime: `${workoutDetails.workoutDate}T${workoutDetails.startTime}:00`,
  //         timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //       },
  //       end: {
  //         dateTime: new Date(
  //           new Date(
  //             `${workoutDetails.workoutDate}T${workoutDetails.startTime}`
  //           ).getTime() +
  //             workoutDetails.workoutMinutes * 60000
  //         ).toISOString(),
  //         timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //       },
  //       reminders: {
  //         useDefault: true,
  //       },
  //     };

  //     const response = await axios.post(
  //       `${process.env.REACT_APP_BACKEND_URL}/api/calendar/events`,
  //       eventDetails
  //     );

  //     Swal.fire({
  //       icon: "success",
  //       title: "Success!",
  //       text: "Workout added to your Google Calendar",
  //     });
  //   } catch (error) {
  //     if (error.response?.status === 401) {
  //       setIsCalendarAuthorized(false);
  //       handleCalendarAuth();
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Failed to Add to Calendar",
  //         text: "There was an error adding the workout to your calendar",
  //       });
  //     }
  //   }
  // };

  // Modify the addToCalendar function to show more detailed errors:
  const addToCalendar = async (workoutDetails) => {
    try {
      const eventDetails = {
        summary: `${workoutDetails.workoutType} - ${workoutDetails.workoutName}`,
        description: `Workout Duration: ${workoutDetails.workoutMinutes} minutes\nCalories Burnt: ${workoutDetails.caloriesBurnt}`,
        start: {
          dateTime: `${workoutDetails.workoutDate}T${workoutDetails.startTime}:00`,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: new Date(
            new Date(
              `${workoutDetails.workoutDate}T${workoutDetails.startTime}`
            ).getTime() +
              workoutDetails.workoutMinutes * 60000
          ).toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        reminders: {
          useDefault: true,
        },
      };

      console.log("Sending event details:", eventDetails); // Debug log

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/calendar/events`,
        eventDetails
      );

      console.log("Calendar API response:", response); // Debug log

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Workout added to your Google Calendar",
      });
    } catch (error) {
      console.error(
        "Calendar error details:",
        error.response?.data || error.message
      ); // Debug log

      if (error.response?.status === 401) {
        setIsCalendarAuthorized(false);
        handleCalendarAuth();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Add to Calendar",
          text: `Error: ${error.response?.data?.error || error.message}`, // More detailed error message
        });
      }
    }
  };

  useEffect(() => {
    const userState = Cookies.get("isLoggedIn");
    if (!userState || userState === null || userState === "false") {
      setShowNotification(true);
    } else {
      const storedUser = JSON.parse(Cookies.get("userDetail"));
      setUserName(storedUser.username);
    }
  }, []);

  useEffect(() => {
    if (workoutData && workoutData.length !== 0) {
      setWorkoutType("");
      setWorkoutName("");
      setWorkoutMinutes("");
      setCaloriesBurnt("");
      setStartTime("");
      setWorkoutData("");
    }
  }, [workoutData]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const todayData = apiData.filter((item) => item.workoutDate === today);
    setTodayWorkoutData(todayData);
  }, [apiData]);

  // Modify your existing handleSubmit function
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (
        workoutDate &&
        workoutType &&
        workoutName &&
        workoutMinutes &&
        caloriesBurnt &&
        startTime
      ) {
        const workoutObj = {
          userName,
          workoutDate,
          workoutType,
          workoutName,
          workoutMinutes,
          caloriesBurnt,
          startTime,
        };
        setWorkoutData(workoutObj);

        try {
          if (!userName) {
            return;
          }
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/workoutLogGet`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(workoutObj),
            }
          );
          if (response.ok) {
            const today = new Date().toISOString().slice(0, 10);
            if (workoutDate === today) {
              setTodayWorkoutData([...todayWorkoutData, workoutObj]);
            }

            // Ask user if they want to add to calendar
            const result = await Swal.fire({
              title: "Add to Calendar?",
              text: "Would you like to add this workout to your Google Calendar?",
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Yes, add it!",
              cancelButtonText: "No, thanks",
            });

            if (result.isConfirmed) {
              await addToCalendar(workoutObj);
            }
          } else {
            console.error("Failed to submit data");
          }
        } catch (error) {
          console.error("Error submitting data:", error);
        }
      }
    },
    [
      workoutDate,
      workoutType,
      workoutName,
      workoutMinutes,
      caloriesBurnt,
      startTime,
      userName,
      todayWorkoutData,
    ]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Cookies.get("isLoggedIn") === "false") {
          return;
        }
        const storedUser = JSON.parse(Cookies.get("userDetail"));
        const userId = storedUser.username;
        if (userId === "") {
          return;
        }
        const uri =
          `${process.env.REACT_APP_BACKEND_URL}/api/workoutLog/` + userId;
        const response = await axios.get(uri);

        if (response.status === 200) {
          setApiData(response.data.workoutlog);
        } else {
          throw new Error("Failed to fetch workout data");
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
    fetchData();
  }, [handleSubmit, todayWorkoutData]);

  const usingSwal = () => {
    Swal.fire({
      icon: "error",
      title: "User Not Logged In",
      text: "Please sign in to view log",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sign In",
      cancelButtonText: "Close",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/signin");
      } else {
        navigate("/");
      }
    });
    setShowNotification(false);
  };

  return (
    <>
      {showNotification && usingSwal()}
      <div className="workout-log-container">
        {!showNotification && (
          <>
            <div className="water-container">
              <h2 className="water-title">Add New Workout</h2>
              <form onSubmit={handleSubmit} className="workout-form">
                <div>
                  <label className="workout-label" htmlFor="workoutDate">
                    Workout Date:
                  </label>
                  <input
                    className="data-input"
                    type="date"
                    id="workoutDate"
                    value={workoutDate}
                    onChange={(e) => setWorkoutDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="workout-label" htmlFor="workoutType">
                    Workout Type:
                  </label>
                  <select
                    className="data-input"
                    id="workoutType"
                    value={workoutType}
                    onChange={(e) => {
                      setWorkoutType(e.target.value);
                    }}
                    required
                  >
                    <option value="">Select Workout Type</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Strength Training">Strength Training</option>
                    <option value="Flexibility Training">
                      Flexibility Training
                    </option>
                    <option value="Balance And Stability">
                      Balance & Stability
                    </option>
                  </select>
                </div>
                <div>
                  <label className="workout-label" htmlFor="workoutName">
                    Workout Name:
                  </label>
                  <select
                    className="data-input"
                    id="workoutName"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    required
                  >
                    {workoutType === "" && (
                      <option value="">Select Workout Type First</option>
                    )}
                    {workoutType === "Cardio" && (
                      <>
                        <option value="">Select Cardio Exercise Below:</option>
                        <option value="Walking">Walking</option>
                        <option value="Running">Running</option>
                        <option value="Cycling">Cycling</option>
                        <option value="Swimming">Swimming</option>
                        <option value="JumpRope">Jump Rope</option>
                        <option value="Elliptical Training">
                          Elliptical Training
                        </option>
                        <option value="Rowing">Rowing</option>
                      </>
                    )}
                    {workoutType === "Strength Training" && (
                      <>
                        <option value="">
                          Select Strength Training Exercise Below:
                        </option>
                        <option value="Barbell Squats">Barbell Squats</option>
                        <option value="Deadlifts">Deadlifts</option>
                        <option value="Bench Press">Bench Press</option>
                        <option value="Pull-Ups">Pull-Ups</option>
                        <option value="Dumbbell Lunges">Dumbbell Lunges</option>
                        <option value="Push-Ups">Push-Ups</option>
                      </>
                    )}
                    {workoutType === "Flexibility Training" && (
                      <>
                        <option value="">
                          Select Flexibility Training Exercise Below:
                        </option>
                        <option value="Static Stretching">
                          Static Stretching
                        </option>
                        <option value="Yoga Poses">Yoga Poses</option>
                        <option value="Pilates">Pilates</option>
                        <option value="Foam Rolling">Foam Rolling</option>
                        <option value="Tai Chi">Tai Chi</option>
                      </>
                    )}
                    {workoutType === "Balance And Stability" && (
                      <>
                        <option value="">
                          Select Balance & Stability Exercise Below:
                        </option>
                        <option value="Single-Leg Balance">
                          Single-Leg Balance
                        </option>
                        <option value="Bosu Ball Exercises">
                          Bosu Ball Exercises
                        </option>
                        <option value="Stability Ball Exercises">
                          Stability Ball Exercises
                        </option>
                        <option value="Balance Board Exercises">
                          Balance Board Exercises
                        </option>
                        <option value="Tai Chi Balance Exercises">
                          Tai Chi Balance Exercises
                        </option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label className="workout-label" htmlFor="workoutMinutes">
                    Minutes:
                  </label>
                  <input
                    className="data-input"
                    type="number"
                    id="workoutMinutes"
                    min="1"
                    value={workoutMinutes}
                    onChange={(e) => setWorkoutMinutes(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="workout-label" htmlFor="caloriesBurnt">
                    Calories Burnt:
                  </label>
                  <input
                    className="data-input"
                    type="number"
                    id="caloriesBurnt"
                    min="1"
                    value={caloriesBurnt}
                    onChange={(e) => setCaloriesBurnt(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="workout-label" htmlFor="startTime">
                    Start Time:
                  </label>
                  <input
                    className="data-input"
                    type="time"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Add Workout</button>
              </form>
            </div>
            <div className="food-log-right">
              <div className="today-workout-log-container">
                <h2 className="today-workout-title">Today's Workout</h2>
                <div className="today-workout-content">
                  {todayWorkoutData.length === 0 ? (
                    <p className="workout-sub-title">
                      No workout data available for today.
                    </p>
                  ) : (
                    <table className="workout-table">
                      <thead>
                        <tr>
                          <th className="workout-th">Date</th>
                          <th className="workout-th">Type</th>
                          <th className="workout-th">Name</th>
                          <th className="workout-th">Minutes</th>
                          <th className="workout-th">Calories Burnt</th>
                          <th className="workout-th">Start Time</th>
                          <th className="workout-th">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {todayWorkoutData.map((workout, index) => (
                          <tr key={index}>
                            <td className="workout-td">
                              {workout.workoutDate}
                            </td>
                            <td className="workout-td">
                              {workout.workoutType}
                            </td>
                            <td className="workout-td">
                              {workout.workoutName}
                            </td>
                            <td className="workout-td">
                              {workout.workoutMinutes}
                            </td>
                            <td className="workout-td">
                              {workout.caloriesBurnt}
                            </td>
                            <td className="workout-td">{workout.startTime}</td>
                            <td className="workout-td">
                              <button
                                onClick={() => addToCalendar(workout)}
                                className="calendar-btn"
                              >
                                Add to Calendar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default WorkoutLog;
