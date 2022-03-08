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
    axios.get("http://localhost:5000/").then((result) => {
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
          {/*RECETA DEL MES*/}

          <img
            src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/01/12/16420042054594.jpg"
            className="mainImg"
          />
          <h1 className="mt-3 mb-5">Receta del mes del alquiñado</h1>
          <hr />
          {/*ÚLTIMAS RECETAS*/}
          <div className="row mt-5 mb-5">
            {recipes.map((recipe) => (
              <CardRecipe name={recipe.name} img={recipe.img} key={recipe._id} id={recipe._id}></CardRecipe>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
