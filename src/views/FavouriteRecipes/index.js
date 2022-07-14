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
      .get("https://servercookeat.herokuapp.com/getFavoriteRecipes/" + getCurrentUserId())
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
          <div className="col-12 col-md-6 col-lg-3">
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

export default FavouriteRecipes;
