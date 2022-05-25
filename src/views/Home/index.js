import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "../../components/Header";

import "./style.css";
import CardRecipe from "../../components/CardRecipe";
import { Accordion } from "react-bootstrap";
import CardGroup from "../../components/CardGroup";
function Home() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("");
  const [isClosed, setIsClosed] = useState(false);

  //Llamar a getReceta

  //Protocolo HTTP -->

  const getRecipes = () => {
    axios.get("http://localhost:5000/recipes").then((result) => {
      setRecipes(result.data);
    });
  };

  const getRecipesByFilter = () => {
    axios
      .get(`http://localhost:5000/recipesFiltered/${filter}`)
      .then((result) => {
        setRecipes(result.data);
      });
  };

  const toggleCategories = () => {
    document.getElementsByClassName("accordion-button")[0].click();
  };

  const handlerFilter = (e) => {
    if (filter == "" && !isClosed) {
      toggleCategories();
      setIsClosed(true);
    }
    setFilter(e);
  };

  const handleClose = () => {
    setIsClosed(!isClosed)
  }

  useEffect(() => {
    getRecipesByFilter();
    if (filter == "" && isClosed) {
      toggleCategories();
      setIsClosed(false);
    }
  }, [filter]);

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
            onChange={(e) => handlerFilter(e.target.value)}
          />
          {/* GRUPOS DE RECETAS */}
          <Accordion defaultActiveKey={"0"} onClick={handleClose}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h1 className="categoriesTitle">Explora por categorías</h1>
              </Accordion.Header>
              <Accordion.Body>
                <div className="row">
                  <CardGroup
                    title="Arroces"
                    color="#ff6961"
                    img="/assets/risotto.png"
                  />
                  <CardGroup
                    title="Pasta"
                    color="#77dd77"
                    img="/assets/pasta.png"
                  />
                  <CardGroup
                    title="Ensalada"
                    color="#fdfd96"
                    img="/assets/salad.png"
                  />
                  <CardGroup
                    title="Pizza"
                    color="#fdcae1"
                    img="/assets/pizza.png"
                  />
                  <CardGroup
                    title="Hamburguesa"
                    color="#b0c2f2"
                    img="https://www.pngall.com/wp-content/uploads/2016/05/Burger-Free-Download-PNG.png"
                  />
                  <CardGroup
                    title="Asiatica"
                    color="#84b6f4"
                    img="/assets/ramen.png"
                  />
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
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
