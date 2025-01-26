// import { useState } from "react";

// const UpdateDietProfile = () => {
//   const [height, setHeight] = useState("");
//   const [weight, setWeight] = useState("");
//   const [goalWeight, setGoalWeight] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [activityLevel, setActivityLevel] = useState("");
//   const [goal, setGoal] = useState("");

//   const [results, setResults] = useState({
//     calories: "",
//     protein: "",
//     fat: "",
//     carbs: "",
//   });

//   const calculateDiet = (e) => {
//     e.preventDefault();
//     if (weight && activityLevel && goal) {
//       const activityMultiplier = {
//         sedentary: 1.4,
//         lightlyActive: 1.6,
//         active: 1.8,
//         veryActive: 2.0,
//       }[activityLevel];

//       let calculatedCalories = weight * 22 * activityMultiplier;
//       let calculatedProtein = weight * 2.2;

//       switch (goal) {
//         case "Cutting":
//           calculatedCalories -= 500;
//           break;
//         case "Bulking":
//           calculatedCalories += 500;
//           break;
//         default:
//           break;
//       }

//       let calculatedFat = (calculatedCalories * 0.25) / 9;
//       let calculatedCarbs =
//         (calculatedCalories - (calculatedProtein * 4 + calculatedFat * 9)) / 4;

//       setResults({
//         calories: calculatedCalories.toFixed(2),
//         protein: calculatedProtein.toFixed(2),
//         fat: calculatedFat.toFixed(2),
//         carbs: calculatedCarbs.toFixed(2),
//       });
//     } else {
//       alert("Please fill in all required fields to calculate your diet.");
//     }
//   };

//   const containerStyle = {
//     backgroundColor: "#121212",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "20px",
//   };

//   const formContainerStyle = {
//     backgroundColor: "#1a1a1a",
//     color: "#ffffff",
//     margin: "0 0",
//     padding: "40px",
//     borderRadius: "12px",
//     boxShadow: "0 8px 16px rgba(255, 3, 3, 0.3)",
//     width: "50%",
//   };

//   const titleStyle = {
//     textAlign: "center",
//     color: "#ff3333",
//     marginBottom: "30px",
//     fontSize: "3.5rem",
//     // fontWeight: "bold",
//   };

//   const inputContainerStyle = {
//     marginBottom: "20px",
//   };

//   const labelStyle = {
//     display: "block",
//     marginBottom: "8px",
//     color: "#ff4444",
//     fontWeight: "600",
//     fontSize: "1.8rem",
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "10px",
//     backgroundColor: "#2a2a2a",
//     border: "2px solid #ff3333",
//     borderRadius: "8px",
//     color: "#ffffff",
//     fontSize: "1.5rem",
//   };

//   const buttonStyle = {
//     width: "100%",
//     padding: "12px",
//     backgroundColor: "#ff3333",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "1.5rem",
//     // fontWeight: "bold",
//     cursor: "pointer",
//     transition: "background-color 0.3s ease",
//   };

//   const selectStyle = {
//     ...inputStyle,
//     appearance: "none",
//     backgroundImage:
//       "linear-gradient(45deg, transparent 50%, #ff3333 50%), linear-gradient(135deg, #ff3333 50%, transparent 50%)",
//     backgroundPosition:
//       "calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)",
//     backgroundSize: "5px 5px, 5px 5px",
//     backgroundRepeat: "no-repeat",
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={formContainerStyle}>
//         <h2 style={titleStyle}>Update Your Diet Plan</h2>
//         <form onSubmit={calculateDiet}>
//           {[
//             {
//               label: "Height (CM)",
//               type: "text",
//               value: height,
//               setter: setHeight,
//               placeholder: "Enter height",
//             },
//             {
//               label: "Weight (KG)",
//               type: "text",
//               value: weight,
//               setter: setWeight,
//               placeholder: "Enter weight",
//             },
//             {
//               label: "Goal Weight (KG)",
//               type: "text",
//               value: goalWeight,
//               setter: setGoalWeight,
//               placeholder: "Enter goal weight",
//             },
//             {
//               label: "Age",
//               type: "text",
//               value: age,
//               setter: setAge,
//               placeholder: "Enter age",
//             },
//           ].map(({ label, type, value, setter, placeholder }) => (
//             <div key={label} style={inputContainerStyle}>
//               <label style={labelStyle}>{label}:</label>
//               <input
//                 type={type}
//                 value={value}
//                 onChange={(e) => setter(e.target.value)}
//                 placeholder={placeholder}
//                 style={inputStyle}
//               />
//             </div>
//           ))}

//           {[
//             {
//               label: "Activity Level",
//               value: activityLevel,
//               setter: setActivityLevel,
//               options: ["sedentary", "lightlyActive", "active", "veryActive"],
//             },
//             {
//               label: "Goal",
//               value: goal,
//               setter: setGoal,
//               options: ["Maintenance", "Cutting", "Bulking"],
//             },
//           ].map(({ label, value, setter, options }) => (
//             <div key={label} style={inputContainerStyle}>
//               <label style={labelStyle}>{label}:</label>
//               <select
//                 value={value}
//                 onChange={(e) => setter(e.target.value)}
//                 style={selectStyle}
//                 required
//               >
//                 <option value="">Select {label}</option>
//                 {options.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           ))}

//           <button type="submit" style={buttonStyle}>
//             Calculate Diet
//           </button>

//           {results.calories && (
//             <div
//               style={{
//                 backgroundColor: "#18181b",
//                 border: "1px solid #991b1b",
//                 borderRadius: "0.5rem",
//                 padding: "1rem",
//                 marginTop: "1.5rem",
//               }}
//             >
//               <h2
//                 style={{
//                   color: "#991b1b",
//                   fontSize: "3rem",
//                   marginBottom: "1rem",
//                 }}
//               >
//                 Diet Results
//               </h2>
//               <table
//                 style={{
//                   width: "100%",
//                   borderCollapse: "collapse",
//                   fontSize: "1.8rem",
//                 }}
//               >
//                 <thead>
//                   <tr>
//                     <th style={{ padding: "0.5rem", textAlign: "left" }}>
//                       Calories
//                     </th>
//                     <th style={{ padding: "0.5rem", textAlign: "left" }}>
//                       Protein (G)
//                     </th>
//                     <th style={{ padding: "0.5rem", textAlign: "left" }}>
//                       Fat (G)
//                     </th>
//                     <th style={{ padding: "0.5rem", textAlign: "left" }}>
//                       Carbs (G)
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td style={{ padding: "0.5rem" }}>{results.calories}</td>
//                     <td style={{ padding: "0.5rem" }}>{results.protein}</td>
//                     <td style={{ padding: "0.5rem" }}>{results.fat}</td>
//                     <td style={{ padding: "0.5rem" }}>{results.carbs}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateDietProfile;

import { useState } from "react";

const UpdateDietProfile = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");

  const [results, setResults] = useState({
    calories: "",
    protein: "",
    fat: "",
    carbs: "",
  });

  const calculateDiet = (e) => {
    e.preventDefault();

    if (weight && activityLevel && goal) {
      const activityMultiplier = {
        sedentary: 1.4,
        lightlyActive: 1.6,
        active: 1.8,
        veryActive: 2.0,
      }[activityLevel];

      let calculatedCalories = weight * 22 * activityMultiplier;
      let calculatedProtein = weight * 2.2;

      switch (goal) {
        case "Cutting":
          calculatedCalories -= 500;
          break;
        case "Bulking":
          calculatedCalories += 500;
          break;
        default:
          break;
      }

      const calculatedFat = (calculatedCalories * 0.25) / 9;
      const calculatedCarbs =
        (calculatedCalories - (calculatedProtein * 4 + calculatedFat * 9)) / 4;

      setResults({
        calories: calculatedCalories.toFixed(2),
        protein: calculatedProtein.toFixed(2),
        fat: calculatedFat.toFixed(2),
        carbs: calculatedCarbs.toFixed(2),
      });
    } else {
      alert("Please fill in all required fields to calculate your diet.");
    }
  };

  const containerStyle = {
    backgroundColor: "#121212",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const formContainerStyle = {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
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
    fontWeight: "600",
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
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2 style={titleStyle}>Update Your Diet Plan</h2>
        <form onSubmit={calculateDiet}>
          {[
            {
              label: "Height (CM)",
              type: "number",
              value: height,
              setter: setHeight,
              placeholder: "Enter height",
            },
            {
              label: "Weight (KG)",
              type: "number",
              value: weight,
              setter: setWeight,
              placeholder: "Enter weight",
            },
            {
              label: "Goal Weight (KG)",
              type: "number",
              value: goalWeight,
              setter: setGoalWeight,
              placeholder: "Enter goal weight",
            },
            {
              label: "Age",
              type: "number",
              value: age,
              setter: setAge,
              placeholder: "Enter age",
            },
          ].map(({ label, type, value, setter, placeholder }) => (
            <div key={label} style={inputContainerStyle}>
              <label style={labelStyle}>{label}:</label>
              <input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={placeholder}
                style={inputStyle}
                required
              />
            </div>
          ))}

          {[
            {
              label: "Activity Level",
              value: activityLevel,
              setter: setActivityLevel,
              options: ["sedentary", "lightlyActive", "active", "veryActive"],
            },
            {
              label: "Goal",
              value: goal,
              setter: setGoal,
              options: ["Maintenance", "Cutting", "Bulking"],
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

          <button type="submit" style={buttonStyle}>
            Calculate Diet
          </button>
        </form>
        {results.calories && (
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
              Diet Results
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
                    Calories
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>
                    Protein (G)
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>
                    Fat (G)
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>
                    Carbs (G)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "0.5rem" }}>{results.calories}</td>
                  <td style={{ padding: "0.5rem" }}>{results.protein}</td>
                  <td style={{ padding: "0.5rem" }}>{results.fat}</td>
                  <td style={{ padding: "0.5rem" }}>{results.carbs}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateDietProfile;
