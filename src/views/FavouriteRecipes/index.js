import React from "react";
import axios from "axios";
import { getCurrentUserId } from "../../firebase";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import CardRecipe from "../../components/CardRecipe";
import "./style.css"

function FavouriteRecipes() {
  const [recipes, setRecipes] = useState([]);

  const getByUser = async () => {
    axios
      .get("http://localhost:5000/getFavoriteRecipes/" + getCurrentUserId())
      .then((result) => {
        setRecipes(result.data);
      });
  };

  useEffect(() => {
    getByUser();
  }, []);

  return (
    <div>
      <Header></Header>
      <h1 className="title">Mis recetas favoritas</h1>
      <div className="row p-4">
        {recipes.map((recipe) => (
          <CardRecipe
            name={recipe.name}
            img={recipe.img}
            key={recipe._id}
            id={recipe._id}
          ></CardRecipe>
        ))}
      </div>
    </div>
  );
}

export default FavouriteRecipes;
