import React, { useState, useEffect } from "react";
import axios from "axios";
import Ingredient from "../../models/Ingredient";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import Header from "../../components/Header";
import { getCurrentUserId, getNameFromUser } from "../../firebase";
import "./style.css";

function NewRecipe() {
  let navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    steps: "",
    ingredients: [],
    userId: getCurrentUserId(),
    userName: getNameFromUser()
  });

  const [ingredients, setIngredients] = useState([]);
  const [options, setOptions] = useState([]);

  const getIngredients = () => {
    axios.get("http://localhost:5000/ingredients").then((result) => {
      setIngredients(result.data);
    });
  };

  const saveRecipe = () => {
    console.log(recipe);
    axios.post("http://localhost:5000/saveRecipe", recipe).then((res) => {
      navigate(`/showRecipe/${res.data._id}`);
    });
  };

  const handler = (e) => {
    setRecipe((previousVal) => {
      return { ...previousVal, [e.target.name]: e.target.value };
    });
  };

  const handlerIngredients = (e) => {
    console.log(e);
    const ivalues = e.map((ivalue) => (
      ivalue.value
    ))
    console.log(ivalues);
    setRecipe((previousVal) => {
      return { ...previousVal, "ingredients": ivalues}
    })
  }

  useEffect(() => {
    getIngredients();
  }, []);

  useEffect(() => {
    setOptions(
      ingredients.map((ingredient) => ({
        value: ingredient.name,
        label: ingredient.name,
      }))
    );
  }, [ingredients]);

  return (
    <>
      <Header />
      <main className="container">
        <Form>
          <Form.Control
            required
            type="text"
            placeholder="Título *"
            name="name"
            className="mb-3 tittleArea"
            onChange={(e) => handler(e)}
          />
          <FloatingLabel
            controlId="floatingTextarea"
            label="Descripción"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave"
              name="description"
              className="descriptionArea"
              onChange={(e) => handler(e)}
            />
          </FloatingLabel>

          <Select
            options={options}
            name="ingredients"
            placeholder="Ingredientes *"
            isMulti
            onChange={(e) => handlerIngredients(e)}
          />

          <FloatingLabel
            controlId="floatingTextarea"
            label="Preparación *"
            className="mb-3"
          >
            <Form.Control
              required
              as="textarea"
              placeholder="Leave"
              name="steps"
              className="stepsArea"
              onChange={(e) => handler(e)}
            />
          </FloatingLabel>

          <Button
            id="button"
            variant="primary"
            onClick={saveRecipe}
            className="sendButton"
            disabled={!(recipe.name !== "" && recipe.steps !== "" && recipe.ingredients.length !== 0)}
          >
            Send
          </Button>
        </Form>
      </main>
    </>
  );
}

export default NewRecipe;
