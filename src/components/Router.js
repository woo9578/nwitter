import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";



const AppRouter = ({isLoggedIn, userObj}) => {
  return (
    <Router>
        {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          //<></>Fragment 많은 요소들을 render 하고  싶을때 사용 부모요소가 없을때 div,span 같은 것을 넣기 싫을때
          <>
            <Route exact path="/" element={<Home userObj={userObj}/>}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
          </>
        ) : (
          <Route exact path="/" element={<Auth />}></Route>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;