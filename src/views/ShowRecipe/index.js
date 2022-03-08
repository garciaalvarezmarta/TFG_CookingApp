import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';


function ShowRecipe() {
    const {id} = useParams();
    const [recipe, setRecipe] = useState({
        name:"",
        description:"",
        img:""
    });

    const getRecipe = () => {
        axios.get(`http://localhost:5000/${id}`).then((result)=>{
            setRecipe(result.data);
        })
    }

    useEffect(() => {
        getRecipe()
    }, []);
  
    return (
    <div>
        <img src={recipe.img} width="100" height="100"/>
        {recipe.name}
        </div>
  )
}

export default ShowRecipe