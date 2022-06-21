import axios from 'axios';
import React, { useState, useEffect } from "react";
import CardRecipe from '../CardRecipe';


function RelatedRecipes(props) {

    const [recipes, setRecipes] = useState([]);

    const getRecipesByCategory =  () => {
        console.log("categoria", props.category)
        axios.get(`http://localhost:5000/getRecipeByCategory/${props.category}`).then(result =>{
            setRecipes(result.data)
        })
    }


    useEffect(()=>{
        getRecipesByCategory()
    },[props]);

  return (
    <div className="row">
        {

            recipes.filter((recipe) => recipe._id != props.id).map( (recipe) => (
                <div  className="col-12 mt-3">
                    <CardRecipe
                    name={recipe.name}
                    img={recipe.img}
                    key={recipe._id}
                    id={recipe._id}
                    duration={recipe.duration}
                    cost={recipe.cost}
                  ></CardRecipe>
                </div>
            )
            )
        }
    </div>
  )
}

export default RelatedRecipes;