import React from 'react'
import './style.css'

function CardRecipe(props) {
  return (
    <div>
        <h1>{props.name}</h1>
        <p>{props.description}</p>
    </div>
  )
}

export default CardRecipe