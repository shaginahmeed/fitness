import React, { useState } from "react";

const CalorieCalculator = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const calculateCalories = (e) => {
    e.preventDefault();
    let bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    bmr = Math.trunc(bmr);
    const deficitCalories = bmr - 500;
    const maintenanceCalories = bmr;
    const bulkingCalories = bmr + 500;

    setResults({
      deficit: deficitCalories.toFixed(2),
      maintenance: maintenanceCalories.toFixed(2),
      bulking: bulkingCalories.toFixed(2),
    });
  };

  const [results, setResults] = useState({
    deficit: "",
    maintenance: "",
    bulking: "",
  });

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#18181b",
          border: "2px solid #991b1b",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          maxWidth: "85%",
          margin: "0 auto",
          boxShadow: "1px 2px 4px 8px rgba(255, 3, 3, 0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h1
            style={{
              color: "#991b1b",
              fontSize: "4rem",
              marginLeft: "1rem",
            }}
          >
            Calorie Calculator
          </h1>
        </div>
        <p
          style={{
            color: "#a1a1aa",
            fontSize: "2rem",
            marginBottom: "1rem",
          }}
        >
          Calculate your Basal Metabolic Rate (BMR) to determine your daily
          calorie needs. Get insights into your metabolism and get to know about
          your daily caloric needs for weight loss, maintenance, or bulking
          based on your age, weight, and height.
        </p>

        <form onSubmit={calculateCalories} style={{ width: "100%" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="age"
              style={{
                display: "block",
                color: "white",
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
              }}
            >
              Age:
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{
                backgroundColor: "#18181b",
                color: "white",
                border: "1px solid #991b1b",
                borderRadius: "0.375rem",
                padding: "0.5rem 1rem",
                fontSize: "1.5rem",
                width: "100%",
                height: "4rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="weight"
              style={{
                display: "block",
                color: "white",
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
              }}
            >
              Weight (kg):
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              style={{
                backgroundColor: "#18181b",
                color: "white",
                border: "1px solid #991b1b",
                borderRadius: "0.375rem",
                padding: "0.5rem 1rem",
                fontSize: "1.5rem",
                width: "100%",
                height: "4rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="height"
              style={{
                display: "block",
                color: "white",
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
              }}
            >
              Height (cm):
            </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              style={{
                backgroundColor: "#18181b",
                color: "white",
                border: "1px solid #991b1b",
                borderRadius: "0.375rem",
                padding: "0.5rem 1rem",
                fontSize: "1.5rem",
                width: "100%",
                height: "4rem",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#991b1b",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              padding: "1.25rem 1rem",
              fontSize: "1.5rem",
              width: "15rem",
              height: "5rem",
              marginTop: "0.75rem",
            }}
          >
            Calculate Calories
          </button>
        </form>

        {results.deficit && (
          <div
            style={{
              backgroundColor: "#18181b",
              border: "1px solid #991b1b",
              borderRadius: "0.5rem",
              padding: "1rem",
              marginTop: "1.5rem",
            }}
          >
            <h2
              style={{
                color: "#991b1b",
                fontSize: "3rem",
                marginBottom: "1rem",
              }}
            >
              Calorie Results
            </h2>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "1.8rem",
              }}
            >
              <thead>
                <tr>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>
                    Calorie Type
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>
                    Calories
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "0.5rem" }}>Deficit</td>
                  <td style={{ padding: "0.5rem" }}>{results.deficit}</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem" }}>Maintenance</td>
                  <td style={{ padding: "0.5rem" }}>{results.maintenance}</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem" }}>Bulking</td>
                  <td style={{ padding: "0.5rem" }}>{results.bulking}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalorieCalculator;
