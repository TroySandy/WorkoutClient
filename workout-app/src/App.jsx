import React, { useState, useEffect } from "react";
import Sitebar from "./home/Navbar.jsx";
import Auth from "./auth/Auth.jsx";
import WorkoutIndex from "./workouts/WorkoutIndex.jsx";

function App() {
  const [sessionToken, setSessionToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
      // console.log("1", sessionToken);
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    // console.log(sessionToken);
  };

  const updateUserId = (newId) => {
    localStorage.setItem('owner_id', newId);
    setUserId(newId);
    console.log('Updated User Id',userId);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
    console.log("done");
  };

  const protectedViews = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <WorkoutIndex token={sessionToken} owner_id={userId} />
    ) : (
      <Auth updateToken={updateToken} updateUserId= {updateUserId} />
    );
  };

  return (
    <div>
      <Sitebar clickLogout={clearToken} />
      {protectedViews()}
    </div>
  );
}

export default App;
