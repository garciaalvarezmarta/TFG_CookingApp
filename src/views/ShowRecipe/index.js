import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import "./style.css";
import { getCurrentUserId } from "../../firebase";

function ShowRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    img: "",
    ingredients: [],
    userName: "",
    userId: "",
  });

  const getRecipe = () => {
    axios.get(`http://localhost:5000/recipes/${id}`).then((result) => {
      setRecipe(result.data);
    });
  };

  const editButton = <button>Edit</button>;

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div>
      <Header />
      <div className=" container-fluid row recipeContainer">
        <main className="col-md-9 main">
          <h1>{recipe.name}</h1>
          {getCurrentUserId()==recipe.userId?editButton:""}
          <img src={"/assets/recipeImages/"+recipe.img} className="imgRecipe" />
          <div>
            <p>{recipe.description}</p>
            <hr />
            <h2>Ingredientes:</h2>

            {recipe.ingredients.map((ingredient) => (
              <p key={ingredient}>- {ingredient}</p>
            ))}
            <hr />
            <h2>Elaboración:</h2>
            <p>{recipe.steps}</p>
            <p>Subido por {recipe.userName}</p>
          </div>
        </main>
        <aside className="col-md-3 moreRecipes">
          <div className="p"></div>
        </aside>
      </div>
    </div>
  );
}

export default ShowRecipe;
