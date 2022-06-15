import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

function CardGroup(props) {
  return (
    <div className="cardGroupContainer">
        <div
          className="groupContainer"
          style={{ backgroundColor: props.color }}
        >
          <h3 className="titleGroup">{props.title}</h3>
          <img src={props.img} className="backImg" />
        </div>
    </div>
  );
}

export default CardGroup;
