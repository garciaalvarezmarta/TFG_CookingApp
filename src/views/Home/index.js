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
  const [category, setCategory] = useState("");
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

  const getByCategory = async () => {
    axios
      .get("http://localhost:5000/getRecipeByCategory/" + category)
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

  const handleCat = (e, cat) => {
    console.log("oass");
    setCategory(cat);
  };

  const handleClose = () => {
    setIsClosed(!isClosed);
  };

  useEffect(() => {
    getRecipesByFilter();
    if (filter == "" && isClosed) {
      toggleCategories();
      setIsClosed(false);
    }
  }, [filter]);

  useEffect(() => {
    console.log(category);
    if (category != "") {
      getByCategory();
    }
  }, [category]);

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
                  <span className="col-12 col-sm-6 col-md-4 col-lg-2" onClick={(e) => handleCat(e, "arroces")}>
                    <CardGroup
                      title="Arroces"
                      color="#d67676"
                      img="/assets/risotto.png"
                      category="arroces"
                    />
                  </span>
                  <span className="col-12 col-sm-6 col-md-4 col-lg-2" onClick={(e) => handleCat(e, "pasta")}>
                    <CardGroup
                      title="Pasta"
                      color="#8fd2ae"
                      img="/assets/pasta.png"
                      category="pasta"
                    />
                  </span>
                  <span className="col-12 col-sm-6 col-md-4 col-lg-2" onClick={(e) => handleCat(e, "ensalada")}>
                    <CardGroup
                      title="Ensalada"
                      color="#fdfd96"
                      img="/assets/salad.png"
                      category="ensalada"
                    />
                  </span>
                  <span className="col-12 col-sm-6 col-md-4 col-lg-2" onClick={(e) => handleCat(e, "pizza")}>
                    <CardGroup
                      title="Pizza"
                      color="#fdcae1"
                      img="/assets/pizza.png"
                      category="pizza"
                    />
                  </span>
                  <span className="col-12 col-sm-6 col-md-4 col-lg-2" onClick={(e) => handleCat(e, "hamburguesa")}>
                    <CardGroup
                      title="Hamburguesa"
                      color="#b0c2f2"
                      img="https://www.pngall.com/wp-content/uploads/2016/05/Burger-Free-Download-PNG.png"
                      category="hamburguesa"
                    />
                  </span>
                  <span className="col-12 col-sm-6 col-md-4 col-lg-2" onClick={(e) => handleCat(e, "asiatica")}>
                    <CardGroup
                      title="Asiática"
                      color="#84b6f4"
                      img="/assets/ramen.png"
                      category="asiatica"
                    />
                  </span>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {/*ÚLTIMAS RECETAS*/}
          <div className="row mt-5 mb-5">
            {recipes.map((recipe) => (
              <div className="col-12 col-md-6 col-lg-3">
              <CardRecipe
                name={recipe.name}
                img={recipe.img}
                key={recipe._id}
                id={recipe._id}
                duration={recipe.duration}
                    cost={recipe.cost}
              ></CardRecipe>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
