import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "../../components/Header";

import "./style.css";
import CardRecipe from "../../components/CardRecipe";
import CardGroup from "../../components/CardGroup";

function Home() {
  const [recipes, setRecipes] = useState([]);

  //Llamar a getReceta

  //Protocolo HTTP -->

  const getRecipes = () => {
    axios.get("http://localhost:5000/recipes").then((result) => {
      setRecipes(result.data);
    });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <Header></Header>
      <main className="myContainer">
        <div className="col-12 mainContainer">
          {/* BUSCADOR */}
          <input
            type="text"
            placeholder="Busca tu receta favorita"
            className="searchInput"
          />

          {/* GRUPOS DE RECETAS */}
          <div className="row">
            <h1 className="categoriesTitle">Explora por categorías</h1>
            <CardGroup title="Arroces" color="#ff6961" img="/assets/risotto.png" />
            <CardGroup title="Pasta" color="#77dd77" img="/assets/pasta.png" />
            <CardGroup title="Ensalada" color="#fdfd96" img="/assets/salad.png" />
            <CardGroup title="Pizza" color="#fdcae1" img="/assets/pizza.png" />
            <CardGroup title="Hamburguesa" color="#b0c2f2" img="https://www.pngall.com/wp-content/uploads/2016/05/Burger-Free-Download-PNG.png" />
            <CardGroup title="Asiatica" color="#84b6f4" img="/assets/ramen.png" />
          </div>
          {/*ÚLTIMAS RECETAS*/}
          <div className="row mt-5 mb-5">
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
      </main>
    </div>
  );
}

export default Home;
