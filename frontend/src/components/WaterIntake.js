import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Cookies from "js-cookie";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import Swal from "sweetalert2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function WaterIntake() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [waterDataMonth, setWaterDataMonth] = useState({});
  const [waterDataDay, setWaterDataDay] = useState({});
  const [displayMode, setDisplayMode] = useState("Days");
  const [waterData, setWaterData] = useState();
  const [userName, setUserName] = useState("");

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
    if (!userName) {
      console.log("null username.");
    } else {
      console.log(userName);
    }
  }, [userName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(Cookies.get("userDetail"));
        const userId = storedUser.username;
        if (!userId) {
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/waterlog/${userId}`
        );

        if (response.status === 200) {
          const fetchedWaterData = response.data.waterLogs;

          const waterDataInML = fetchedWaterData
            .map((data) => {
              let quantityInML;
              switch (data.waterUnit) {
                case "Glass":
                  quantityInML = data.waterQuantity * 350; // Assuming 1 glass = 350 ml
                  break;
                case "l":
                  quantityInML = data.waterQuantity * 1000; // 1 liter = 1000 ml
                  break;
                case "ml":
                default:
                  quantityInML = data.waterQuantity; // If already in ml, keep it as it is
                  break;
              }
              return { ...data, waterQuantity: quantityInML };
            })
            .sort((a, b) => new Date(a.waterDate) - new Date(b.waterDate));

          const today = new Date();
          const pastSevenDaysData = waterDataInML.filter((data) => {
            const waterDate = new Date(data.waterDate);
            return (
              waterDate > new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
            );
          });
          const waterIntakeByDay = {};
          pastSevenDaysData.forEach((data) => {
            const waterDate = data.waterDate;
            const waterQuantity = parseInt(data.waterQuantity);
            if (waterIntakeByDay[waterDate]) {
              waterIntakeByDay[waterDate] += waterQuantity;
            } else {
              waterIntakeByDay[waterDate] = waterQuantity;
            }
          });

          setWaterDataDay({
            labels: Object.keys(waterIntakeByDay).map(
              (date) =>
                new Date(date).getDate() +
                " " +
                new Date(date).toLocaleString("default", { month: "long" }) +
                " " +
                new Date(date).getFullYear()
            ),
            datasets: [
              {
                label: "Water Intake (ml)",
                data: Object.values(waterIntakeByDay),
                backgroundColor: [
                  "rgb(83,124,56)",
                  "rgb(123,165,145)",
                  "rgb(204, 34, 43)",
                  "rgb(241, 91, 76)",
                  "#faa41b",
                  "#ffd45b",
                  "rgb(255,229,180)",
                ],
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          });

          const pastSixMonthsData = waterDataInML.filter((data) => {
            const waterDate = new Date(data.waterDate);
            const sixMonthsAgo = new Date(
              today.getFullYear(),
              today.getMonth() - 5,
              today.getDate()
            );
            return waterDate > sixMonthsAgo;
          });
          const waterIntakeByMonth = {};
          pastSixMonthsData.forEach((data) => {
            const waterMonth =
              new Date(data.waterDate).toLocaleString("default", {
                month: "long",
              }) +
              " " +
              new Date(data.waterDate).getFullYear();
            const waterQuantity = parseInt(data.waterQuantity);
            if (waterIntakeByMonth[waterMonth]) {
              waterIntakeByMonth[waterMonth] += waterQuantity;
            } else {
              waterIntakeByMonth[waterMonth] = waterQuantity;
            }
          });
          setWaterDataMonth({
            labels: Object.keys(waterIntakeByMonth),
            datasets: [
              {
                label: "Water Intake (ml)",
                data: Object.values(waterIntakeByMonth),
                backgroundColor: [
                  "rgb(83,124,56)",
                  "rgb(123,165,145)",
                  "rgb(204, 34, 43)",
                  "rgb(241, 91, 76)",
                  "rgb(250, 164, 27)",
                  "rgb(255,212,91)",
                ],
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching water data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setWaterData(displayMode === "Days" ? waterDataDay : waterDataMonth);
  }, [displayMode, waterDataDay, waterDataMonth]);

  const toggleDaysMonths = () => {
    setDisplayMode((prevMode) => (prevMode === "Days" ? "Months" : "Days"));
  };

  const usingSwal = () => {
    Swal.fire({
      icon: "error",
      title: "User Not Logged In",
      text: "Please sign in to view progress",
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
      {!showNotification && (
        <div className="water-container-1 water-container-history">
          <div className="water-history-container-1">
            <div className="button-title-container">
              <button
                className="toggle-button-water"
                onClick={toggleDaysMonths}
              >
                {displayMode}
              </button>
              <h2 className="water-history-title">
                {displayMode === "Days"
                  ? "Water Intake by Days"
                  : "Water Intake by Months"}
              </h2>
            </div>
            {waterData && Object.keys(waterData).length > 0 && (
              <div className="chart-container-water">
                <Bar
                  data={waterData}
                  options={{
                    scales: {
                      x: {
                        type: "category",
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default WaterIntake;
