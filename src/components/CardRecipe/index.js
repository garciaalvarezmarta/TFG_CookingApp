import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock
} from "@fortawesome/free-regular-svg-icons";

function CardRecipe(props) {
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <Link to={"/showRecipe/" + props.id} className="linkRecipe">
        <img src={"/assets/recipeImages/"+props.img} className="recipeImage" />
        <div className="row">
          <p className="cardRecipeTitle">{props.name}</p>
          <div></div>
        </div>
        <div className="row">
          <small className="recipeProperties"> <FontAwesomeIcon icon={faClock}/> 25-30 min • €€€  </small>
        </div>
      </Link>
    </div>
  );
}

export default CardRecipe;
