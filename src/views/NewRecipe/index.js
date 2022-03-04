import React, { useState } from 'react'
import axios from "axios";

import Header from '../../components/Header'

function NewRecipe() {

  const [recipe, setRecipe] = useState({
    name:"",
    description: "",
  })

  const saveRecipe = () => {
    console.log(recipe)
    axios.post("http://localhost:5000/saveRecipe", recipe);
    
  }

  const handler = (e) => {
    setRecipe((previousVal)=>{
      return {...previousVal, [e.target.name]: e.target.value}
    })
  }



  return (
    <>
      <Header/>
      <main className="container">
        <input type="text" name="name" placeholder="name" onChange={(e) => handler(e)}/>
        <input type="text" name="description" placeholder='description' onChange={(e) => handler(e)}/>
        <button onClick={saveRecipe}>Send</button>
      </main>
    </>
    )
}

export default NewRecipe