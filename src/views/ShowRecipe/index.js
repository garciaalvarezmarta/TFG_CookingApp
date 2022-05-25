import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { getCurrentUserId } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function ShowRecipe() {
  let navigate = useNavigate();
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

  const deleteRecipe = () =>{
    if (window.confirm("¿Estás seguro de que quieres eliminar esta receta?")){
      console.log("ELIMINAR")
      axios.delete(`http://localhost:5000/deleteRecipe/${id}`).then((result) => {
        navigate(`/myRecipes`);
      });
    }
  }

  const editDeleteButton = (
    <span className="buttons">
      <Link to={"/editRecipe/" + id} className="editButton">
        <button className="btn btn-primary">
          <FontAwesomeIcon icon={faPenToSquare} /> Edit
        </button>
      </Link>
      <button className="btn btn-danger" onClick={deleteRecipe}>
          <FontAwesomeIcon icon={faPenToSquare} /> Eliminar
      </button>
    </span>
  );

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div>
      <Header />
      <div className=" container-fluid row recipeContainer">
        <main className="col-md-9 main">
          <h1>{recipe.name}</h1>
          {getCurrentUserId() == recipe.userId ? editDeleteButton : ""}
          <img
            src={"/assets/recipeImages/" + recipe.img}
            className="imgRecipe"
          />
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
