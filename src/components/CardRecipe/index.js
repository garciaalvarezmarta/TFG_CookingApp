import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function CardRecipe(props) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Link to={"/showRecipe/"+props.id} className="link">
        <img src={props.img} className="recipeImage" />
        <h2>{props.name}</h2>
      </Link>
    </div>
  );
}

export default CardRecipe;
