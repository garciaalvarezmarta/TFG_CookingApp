import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import CardRecipe from "../../components/CardRecipe";

function FilteredRecipes() {
  const [recipes, setRecipes] = useState([]);
  const { category } = useParams();
  const getByCategory = async () => {
    axios
      .get("https://servercookeat.herokuapp.com/getRecipeByCategory/" + category)
      .then((result) => {
        setRecipes(result.data);
      });
  };

  useEffect(() => {
    getByCategory();
  }, []);

  return (
    <div>
      <Header></Header>
      <h1 className="title">{category.toUpperCase()}</h1>
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

export default FilteredRecipes;
