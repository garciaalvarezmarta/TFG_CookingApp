import React, { useState, useEffect } from "react";
import axios from "axios";
import Ingredient from "../../models/Ingredient";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { getCurrentUserId, getNameFromUser } from "../../firebase";
import "./style.css";

function NewRecipe() {
  const { id } = useParams();
  const [isFirst, setIsFirst] = useState(true);
  //Ruta de la img local para previsualizar la img cuando la cambiamos
  const [image, setImage] = useState("recipeDefault.jpg");
  //Archivo que guardamos en el proyecto
  const [imgFile, setImgFile] = useState(null);
  const [isSave, setIsSave] = useState(false);
  //Guardar el estado de la receta creada
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    steps: "",
    ingredients: [],
    img: "recipeDefault.jpg",
    userId: getCurrentUserId(),
    userName: getNameFromUser(),
  });
  const [ingredients, setIngredients] = useState([]);
  const [options, setOptions] = useState([]);

  //Cuando creo la receta navego a su vista
  let navigate = useNavigate();

  const getIngredients = () => {
    axios.get("http://localhost:5000/ingredients").then((result) => {
      setIngredients(result.data);
    });
  };

  const getRecipe = () => {
    axios.get(`http://localhost:5000/recipes/${id}`).then((result) => {
      setRecipe(result.data);
    });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImgFile(event.target.files[0]);
    }
  };

  const saveRecipe = async () => {
    let urlImg = { data: "recipeDefault.jpg" };
    if (imgFile) {
      let formData = new FormData();
      formData.append("image", imgFile);
      //Esperar a que se haga la llamada --> res ruta de la imagen
      urlImg = await axios.post("http://localhost:5000/uploadImg", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
    setIsSave(true);
    setRecipe((previousVal) => {
      return { ...previousVal, img: urlImg?.data };
    });
  };

  const handler = (e) => {
    setRecipe((previousVal) => {
      return { ...previousVal, [e.target.name]: e.target.value };
    });
  };

  const handlerIngredients = (e) => {
    console.log(e);
    const ivalues = e.map((ivalue) => ivalue.value);
    console.log(ivalues);
    setRecipe((previousVal) => {
      return { ...previousVal, ingredients: ivalues };
    });
  };

  useEffect(() => {
    getIngredients();
    if (id) {
      getRecipe();
    }
  }, []);

  useEffect(() => {
    setOptions(
      ingredients.map((ingredient) => ({
        value: ingredient.name,
        label: ingredient.name,
      }))
    );
  }, [ingredients]);

  useEffect(() => {
    if (isSave) {
      if (id) {
        axios.put(`http://localhost:5000/updateRecipe/${id}`, recipe).then((res) => {
          navigate(`/showRecipe/${res.data._id}`);
        });
      } else {
        axios.post("http://localhost:5000/saveRecipe", recipe).then((res) => {
          navigate(`/showRecipe/${res.data._id}`);
        });
      }
    }
    if (isFirst) {
      console.log(recipe);
      setImage(`/assets/recipeImages/${recipe.img}`);
      if(!id || recipe.img !== "recipeDefault.jpg"){
        setIsFirst(false);
      }
    }
  }, [recipe]);

  return (
    <>
      <Header />
      <main className="container">
        <Form>
          {/* Imagen de la receta */}
          <img src={image} alt="preview image" className="recipeImg" />
          <input type="file" onChange={onImageChange} />
          <Form.Control
            required
            type="text"
            placeholder="Título *"
            name="name"
            className="mb-3 tittleArea"
            onChange={(e) => handler(e)}
            value={recipe.name}
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
              value={recipe.description}
            />
          </FloatingLabel>

          <Select
            value={options.filter((option) =>
              recipe.ingredients.includes(option.label)
            )}
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
              value={recipe.steps}
            />
          </FloatingLabel>

          <Button
            id="button"
            variant="primary"
            onClick={saveRecipe}
            className="sendButton"
            disabled={
              !(
                recipe.name !== "" &&
                recipe.steps !== "" &&
                recipe.ingredients.length !== 0
              )
            }
          >
            Send
          </Button>
        </Form>
      </main>
    </>
  );
}

export default NewRecipe;
