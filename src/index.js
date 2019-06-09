import React, { useState } from "react";
import ReactDOM from "react-dom";
import SelectComponent from "./selectComponent";
import "./styles.css";
const data = [
  { category: "vue", value: ["evan", "gusto", "Eduardo", "Rahul"] },
  {
    category: "react",
    value: ["dan", "sunil", "Andrew", "Dominic", "Flarnie"]
  },
  { category: "coders", value: ["dan", "evan", "Rahul", "sunil"] }
];
function App() {
  const [selectedData, updateSelectedData] = useState([]);
  const callParent = data => {
    updateSelectedData(data);
  };
  return (
    <div className="App" style={{ margin: "15px auto", width: "80%" }}>
      <h1>Hello Clarisights 👋.</h1>
      <h2>Here's my implementation for assignment.</h2>

      <SelectComponent
        buttonName={"select element"}
        callParent={callParent}
        data={data}
      />
      {selectedData.length !== 0 && (
        <table className="tableStyle">
          <tr>
            <th>Category</th>
            <th>Champs</th>
          </tr>
          {selectedData.map(elm => (
            <tr>
              <td>{elm.category}</td>
              <td>{elm.value}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
