import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "../../components/Header";

import "./style.css";
import CardRecipe from "../../components/CardRecipe";

function Home() {
  const [recipes, setRecipes] = useState([]);

  //Llamar a getReceta

  //Protocolo HTTP -->

  const getRecipes = () => {
    axios.get("http://localhost:5000/allRecipes").then((result) => {
      setRecipes(result.data);
    });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <Header></Header>
      <main className="container">
        <div className="col-12 mainContainer">
          {/* nombre de la receta*/}
          <h1>Receta del mes</h1>
          <img
            src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/01/12/16420042054594.jpg"
            className="mainImg"
          />
          {recipes.map((recipe) => (
            <CardRecipe name={recipe.name} description={recipe.description}></CardRecipe>
         ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
