import React, { useState, useEffect } from "react";

export default function LoadData(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoaded) {
      //Note: I need the if statement
      //So I can fetch only once
      //Otherwise because I need to use props as depedancies
      //The fetch happens multiple times
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      };
      fetch(
        "https://prod-179.westeurope.logic.azure.com:443/workflows/7c84997dd6894507a60796acb06e5c43/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6hFoizfo2w62d0iQK_Zyt7a3Ycr9akAkXdCPAG0ecwQ&usr=416c6b6973",
        requestOptions
      )
        .then((response) => response.json())
        .then((json) => {
          setIsLoaded(true);
          props.onGetData([...json.value]);
        })
        //error handling
        .catch((error) => {
          setIsLoaded(true);
          setError(error);
        });
    }
  }, [props, isLoaded]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <React.Fragment></React.Fragment>;
  }
}
