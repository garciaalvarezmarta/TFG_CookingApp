import "./App.css";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Login from "./views/Login";
import Home from "./views/Home";
import Register from "./views/Register";
import NewRecipe from "./views/NewRecipe";
import ShowRecipe from "./views/ShowRecipe";
import MyRecipes from "./views/MyRecipes"
import ScrollToTop from "./hooks/ScrollToTop";

function App() {
  const [user, setUser] = useState();
  const authentication = getAuth();

  onAuthStateChanged(authentication, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return (
    <div className="App">
      <Router>
        <ScrollToTop/>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login />} />
          <Route exact path="/home" element={user ? <Home /> : <Login />} />
          <Route
            exact
            path="/register"
            element={user ? <Home /> : <Register />}
          />
          <Route
            exact
            path="/newRecipe"
            element={user ? <NewRecipe /> : <Login />}
          />
          <Route
            exact
            path="/editRecipe/:id"
            element={user ? <NewRecipe /> : <Login />}
          />
          <Route
            exact
            path="/showRecipe/:id"
            element={user ? <ShowRecipe /> : <Login />}
          />
          <Route
            exact
            path="/myRecipes"
            element={user ? <MyRecipes /> : <Login />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
