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
    category: "",
    img: "recipeDefault.jpg",
    userId: getCurrentUserId(),
    userName: getNameFromUser(),
    cost: "€",
    duration: 0,
  });
  const [ingredients, setIngredients] = useState([]);
  const [options, setOptions] = useState([]);

  const [optionsCategory, setOptionsCategory] = useState([
    { value: "asiatica", label: "Asiatica" },
    { value: "arroces", label: "Arroces" },
    { value: "ensalada", label: "Ensalada" },
    { value: "hamburguesa", label: "Hamburguesa" },
    { value: "pasta", label: "Pasta" },
    { value: "pizza", label: "Pizza" },
    { value: "postre", label: "Postre" },
  ]);

  //Cuando creo la receta navego a su vista
  let navigate = useNavigate();

  const getIngredients = () => {
    axios.get("https://servercookeat.herokuapp.com/ingredients").then((result) => {
      setIngredients(result.data);
    });
  };

  const getRecipe = () => {
    axios.get(`https://servercookeat.herokuapp.com/recipes/${id}`).then((result) => {
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
      urlImg = await axios.post("https://servercookeat.herokuapp.com/uploadImg", formData, {
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
    const ivalues = e.map((ivalue) => ivalue.value);
    console.log(ivalues);
    setRecipe((previousVal) => {
      return { ...previousVal, ingredients: ivalues };
    });
  };

  const handlerCategory = (e) => {
    setRecipe((previousVal) => {
      return { ...previousVal, category: e.value };
    });
  };

  const handleRadio = (e) => {
    setRecipe((previousVal) => {
      return { ...previousVal, cost: e.target.value };
    });
  };

  const handlerDuration = (e) =>{
    setRecipe((previousVal) => {
      return { ...previousVal, duration: e.target.value };
    });
  }

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
    console.log(recipe);
    if (isSave) {
      if (id) {
        axios
          .put(`https://servercookeat.herokuapp.com/updateRecipe/${id}`, recipe)
          .then((res) => {
            navigate(`/showRecipe/${res.data._id}`);
          });
      } else {
        axios.post("https://servercookeat.herokuapp.com/saveRecipe", recipe).then((res) => {
          navigate(`/showRecipe/${res.data._id}`);
        });
      }
    }
    if (isFirst) {
      console.log(recipe);
      setImage(`/assets/recipeImages/${recipe.img}`);
      if (!id || recipe.img !== "recipeDefault.jpg") {
        setIsFirst(false);
      }
    }
  }, [recipe]);

  return (
    <>
      <Header />
      <main className="container newRecipeContainer">
        <Form>
          {/* Imagen de la receta */}
          <div className="selectorImg mt-5">
            <img src={image} alt="preview image" className="recipeImg" />
            <p className="mt-4 buttonImg">
              <input
                type="file"
                onChange={onImageChange}
                className="file-select"
              />
            </p>
          </div>
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
          <div className="row">
            <Select
              value={options.filter((option) =>
                recipe.ingredients.includes(option.label)
              )}
              options={options}
              name="ingredients"
              placeholder="Ingredientes *"
              isMulti
              onChange={(e) => handlerIngredients(e)}
              className="col-md-6 mt-2"
            />

            <Select
              value={optionsCategory.filter(
                (option) => option.value == recipe.category
              )}
              options={optionsCategory}
              name="category"
              placeholder="Categoría *"
              className="col-md-6 mt-2"
              onChange={(e) => handlerCategory(e)}
            />
          </div>

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
          <div className="row mt-5 mb-5">
            <div key={`inline-radio`} className="col-6 row">
              <div className="col-1">
              Coste:

              </div>
              <div className="col-11">
              <Form.Check
                inline
                label="€"
                name="group"
                type="radio"
                id={`inline-radio-1`}
                value="€"
                onChange={(e) => handleRadio(e)}
                defaultChecked
              />
              <Form.Check
                inline
                label="€€"
                name="group"
                type="radio"
                id={`inline-radio-2`}
                value="€€"
                onChange={(e) => handleRadio(e)}
              />
              <Form.Check
                inline
                label="€€€"
                name="group"
                type="radio"
                id={`inline-radio-2`}
                value="€€€"
                onChange={(e) => handleRadio(e)}
              />
              </div>
            </div>
            <div className="col-6 row">
              <div className="col-2">
                Duración:
              </div>
              <div className="col-9">
                <Form.Control
                  required
                  type="number"
                  name="duration"
                  min='0'
                  className="mb-3 time"
                  onChange={(e) => handlerDuration(e)}
                  value={recipe.duration}
                />
              </div>
              <div className="col-1">min.</div>
            </div>
          </div>

          <Button
            id="button"
            onClick={saveRecipe}
            className="buttonForm mb-5"
            disabled={
              !(
                recipe.name !== "" &&
                recipe.steps !== "" &&
                recipe.ingredients.length !== 0 &&
                recipe.duration != ""
              )
            }
          >
            Crear Receta
          </Button>
        </Form>

      </main>
    </>
  );
}

export default NewRecipe;
