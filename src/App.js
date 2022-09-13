import LoadData from "./components/Functional/LoadData";
import React, { useState } from "react";
import Events from "./components/Events/Events";
import FixData from "./components/Functional/FixData";

function App() {
  const [data, setData] = useState([]);
  const [isDataFixed, setIsDataFixed] = useState(false);

  //get data from LoadData.js
  const getDataHandler = (loadData) => {
    setData(loadData);
  };

  //fixing, sorting and filtering the data with FixData.js
  const fixedDataHandler = (fixedData) => {
    setData(fixedData);
    setIsDataFixed(true);
  };

  return (
    <React.Fragment>
      <LoadData onGetData={getDataHandler} />
      {data.length !== 0 && <FixData onSendFixedData={fixedDataHandler} data={data} />}
      {isDataFixed && <Events data={data} />}
    </React.Fragment>
  );
}

export default App;
