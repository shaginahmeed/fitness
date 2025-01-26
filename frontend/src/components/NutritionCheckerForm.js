// import React, { useState } from "react";
// import axios from "axios";
// import { Search, Flame, ChevronDown } from "lucide-react";
// import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";

// const NutritionCheckerForm = () => {
//   const [foodItem, setFoodItem] = useState("");
//   const [nutritionResult, setNutritionResult] = useState(null);

//   const handleSearchNutrition = async (e) => {
//     try {
//       const response = await axios.get(
//         `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(
//           foodItem
//         )}`,
//         {
//           headers: {
//             "X-Api-Key": "WOO23cTA4ww2yrQ+otISmw==Z3Q2fFBcCTeE3OWj",
//           },
//         }
//       );

//       const data = response.data;

//       if (data.items.length > 0) {
//         setNutritionResult(data.items[0]);
//       } else {
//         alert("No nutrition information found for that food item");
//       }
//     } catch (error) {
//       console.error("Error fetching nutrition information:", error);
//     }
//   };

//   return (
//     <Container className="my-10">
//       <div>
//         <h1
//           style={{
//             color: "white",
//             fontSize: "50px",
//             textAlign: "left",
//             padding: "5px",
//           }}
//         >
//           Nutrition Checker
//         </h1>
//         <p style={{ color: "white", fontSize: "20px", textAlign: "left" }}>
//           With Nutrition Checker, you can quickly and easily see the nutritional
//           value of any food, including calories, fat, protein, carbohydrates.
//         </p>
//       </div>

//       <Row className="justify-content-md-center">
//         <Col md="auto">
//           <h2 style={{ fontSize: "50px", color: "white" }}>
//             Nutrition Information Search
//           </h2>
//           <Form
//             inline
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleSearchNutrition();
//             }}
//             style={{ width: "100%" }} // Make the form take full width
//           >
//             <Form.Control
//               type="text"
//               value={foodItem}
//               onChange={(e) => setFoodItem(e.target.value)}
//               placeholder="Enter food item"
//               className="mr-sm-4"
//               style={{
//                 height: "30%",
//                 width: "170%",
//                 padding: "10px",
//                 fontSize: "18px",
//               }} // Increase width, padding, and font size
//             />
//             <Button
//               variant="outline-success"
//               className="my-3"
//               onClick={handleSearchNutrition}
//               style={{ padding: "25px 20px", fontSize: "18px" }} // Increase padding and font size
//             >
//               Get Nutrition
//             </Button>
//           </Form>
//         </Col>
//       </Row>

//       {nutritionResult && (
//         <Row>
//           <Col>
//             <h2>Nutrition Results</h2>
//             <Table striped bordered hover responsive="md">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Serving Size</th>
//                   <th>Calories</th>
//                   <th>Total Fat</th>
//                   <th>Saturated Fat</th>
//                   <th>Cholesterol</th>
//                   <th>Sodium</th>
//                   <th>Carbohydrates</th>
//                   <th>Fiber</th>
//                   <th>Sugar</th>
//                   <th>Protein</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{nutritionResult.name}</td>
//                   <td>100g</td>
//                   <td>{nutritionResult.calories}</td>
//                   <td>{nutritionResult.fat_total_g}g</td>
//                   <td>{nutritionResult.fat_saturated_g}g</td>
//                   <td>{nutritionResult.cholesterol_mg}mg</td>
//                   <td>{nutritionResult.sodium_mg}mg</td>
//                   <td>{nutritionResult.carbohydrates_total_g}g</td>
//                   <td>{nutritionResult.fiber_g}g</td>
//                   <td>{nutritionResult.sugar_g}g</td>
//                   <td>{nutritionResult.protein_g}g</td>
//                 </tr>
//               </tbody>
//             </Table>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default NutritionCheckerForm;

import React, { useState } from "react";
import { Search, Flame } from "lucide-react";

const NutritionCheckerForm = () => {
  const [foodItem, setFoodItem] = useState("");
  const [nutritionResult, setNutritionResult] = useState(null);

  const handleSearchNutrition = async (e) => {
    try {
      const response = await fetch(
        `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(
          foodItem
        )}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": "WOO23cTA4ww2yrQ+otISmw==Z3Q2fFBcCTeE3OWj",
          },
        }
      );

      const data = await response.json();

      if (data.items.length > 0) {
        setNutritionResult(data.items[0]);
      } else {
        alert("No nutrition information found for that food item");
      }
    } catch (error) {
      console.error("Error fetching nutrition information:", error);
    }
  };

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
          boxShadow: "1px 2px 4px 6px rgba(255, 3, 3, 0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Flame style={{ color: "#991b1b", width: "48px", height: "48px" }} />
          <h1
            style={{ color: "#991b1b", fontSize: "4rem", marginLeft: "1rem" }}
          >
            Nutrition Checker
          </h1>
        </div>
        <p
          style={{
            color: "#a1a1aa",
            fontSize: "2rem",
            marginBottom: "1rem",
          }}
        >
          With Nutrition Checker, you can quickly and easily see the nutritional
          value of any food, including calories, fat, protein, carbohydrates.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <h2 style={{ fontSize: "3.2rem", color: "white" }}>
            Nutrition Information Search
          </h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchNutrition();
          }}
          style={{ width: "100%" }}
        >
          <input
            type="text"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            placeholder="Enter food item"
            style={{
              backgroundColor: "#18181b",
              color: "white",
              border: "1px solid #991b1b",
              borderRadius: "0.375rem",
              padding: "0.5rem 1rem",
              fontSize: "2rem",
              width: "100%",
              height: "5rem",
              marginRight: "1rem",
              marginBottom: "1.5rem",
            }}
          />
          <button
            type="submit"
            onClick={handleSearchNutrition}
            style={{
              backgroundColor: "#991b1b",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              padding: "1.25rem 1rem",
              fontSize: "1.5rem",
              marginTop: "0.75rem",
              width: "15rem",
              height: "5rem",
            }}
          >
            <Search
              style={{
                marginRight: "0.5rem",
                width: "20px",
                height: "20px",
              }}
            />
            Get Nutrition
          </button>
        </form>

        {nutritionResult && (
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
              Nutrition Results
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
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>Name</th>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>
                    Serving Size
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>
                    Calories
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>
                    Total Fat
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>
                    Saturated Fat
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>
                    Cholesterol
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>
                    Sodium
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>
                    Carbohydrates
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>
                    Fiber
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>
                    Sugar
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>
                    Protein
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "0.5rem" }}>{nutritionResult.name}</td>
                  <td style={{ padding: "0.5rem" }}>100g</td>
                  <td style={{ padding: "0.5rem" }}>
                    {nutritionResult.calories}
                  </td>
                  <td style={{ padding: "0.5rem" }}>
                    {nutritionResult.fat_total_g}g
                  </td>
                  <td style={{ padding: "0.5rem" }}>
                    {nutritionResult.fat_saturated_g}g
                  </td>
                  <td style={{ padding: "0.5rem" }}>
                    {nutritionResult.cholesterol_mg}mg
                  </td>
                  <td style={{ padding: "0.5rem" }}>
                    {nutritionResult.sodium_mg}mg
                  </td>
                  <td style={{ padding: "0.5rem" }}>
                    {nutritionResult.carbohydrates_total_g}g
                  </td>
                  <td style={{ padding: "0.5rem" }}>
                    {nutritionResult.fiber_g}g
                  </td>
                  <td style={{ padding: "0.5rem" }}>
                    {nutritionResult.sugar_g}g
                  </td>
                  <td style={{ padding: "0.5rem" }}>
                    {nutritionResult.protein_g}g
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionCheckerForm;
