import React from "react";
import axios from "axios";
import { getCurrentUserId } from "../../firebase";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import CardRecipe from "../../components/CardRecipe";
import "./style.css";

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState("");

  const getByUser = async () => {
    axios
      .get("https://servercookeat.herokuapp.com/userRecipes/" + getCurrentUserId())
      .then((result) => {
        setRecipes(result.data);
      });
  };

  const getUser = async () => {
    axios
      .get("https://servercookeat.herokuapp.com/getUserById/" + getCurrentUserId())
      .then((result) => {
        setUser(result.data);
      });
  };

  useEffect(() => {
    getByUser();
    getUser();
  }, []);

  return (
    <div>
      <Header></Header>
      <h1 className="title">Recetas de {user?.username}</h1>
      <div className="row p-4">
        {recipes.map((recipe) => (
            <div className="col-12 col-md-6 col-lg-3 mb-4">
            <CardRecipe
              name={recipe.name}
              img={recipe.img}
              key={recipe._id}
              id={recipe._id}
              cost={recipe.cost}
              duration={recipe.duration}
            ></CardRecipe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyRecipes;
