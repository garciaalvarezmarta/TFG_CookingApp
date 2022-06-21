import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock
} from "@fortawesome/free-regular-svg-icons";

function CardRecipe(props) {
  return (
      <Link to={"/showRecipe/" + props.id} className="linkRecipe">
        <img src={"/assets/recipeImages/"+props.img} className="recipeImage" />
        <div className="row">
          <p className="cardRecipeTitle">{props.name}</p>
          <div></div>
        </div>
        <div className="row">
          <small className="recipeProperties"> <FontAwesomeIcon icon={faClock}/> {props.duration} min • {props.cost}  </small>
        </div>
      </Link>
  );
}

export default CardRecipe;
