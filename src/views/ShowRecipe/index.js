import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import RelatedRecipes from "../../components/RelatedRecipes";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { getCurrentUserId } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

import {
  faPenToSquare,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faStar } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";

function ShowRecipe() {
  let navigate = useNavigate();
  const { id } = useParams();
  const currentUserId = getCurrentUserId();

  const [numberComments, setNumberComments] = useState(0);
  const [commentsShow, setCommentsShow] = useState();

  const [comment, setComment] = useState({
    recipeId: id,
    uid: "",
    value: "",
    stars: 0,
  });

  const [stars, setStars] = useState(0);
  const reStart = 5;

  const [recipeComments, setRecipeComments] = useState([]);

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    img: "",
    ingredients: [],
    userName: "",
    userId: "",
    category: ""
  });
  const [isSaved, setIsSaved] = useState(false);
  const [user, setUser] = useState("");

  const getUserComment = async (uid) => {
    const result = await axios.get(`http://localhost:5000/getUserById/${uid}`);
    console.log("user",result)
    setUser(result.data);
  };

  const getRecipe = () => {
    axios.get(`http://localhost:5000/recipes/${id}`).then((result) => {
      setRecipe(result.data);
    });
  };

  const getComments = () => {
    axios
      .get(`http://localhost:5000/getCommentsByRecipe/${id}`)
      .then((result) => {
        setRecipeComments(result.data);
      });
  };

  const getIsSaved = () => {
    axios
      .get(`http://localhost:5000/isFavouriteSaved/${currentUserId}/${id}`)
      .then((result) => {
        setIsSaved(result.data);
      });
  };

  const deleteRecipe = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta receta?")) {
      console.log("ELIMINAR");
      axios
        .delete(`http://localhost:5000/deleteRecipe/${id}`)
        .then((result) => {
          navigate(`/myRecipes`);
        });
    }
  };

  const saveFavouriteRecipe = () => {
    if (!isSaved) {
      // Guardarla --> llamar axios actualizar
      console.log(id);
      axios
        .put(`http://localhost:5000/addFavouriteRecipe/${currentUserId}`, {
          id: id,
        })
        .then((result) => {
          setIsSaved(true);
        });
    } else {
      axios
        .put(`http://localhost:5000/removeFavouriteRecipe/${currentUserId}`, {
          id: id,
        })
        .then((result) => {
          setIsSaved(false);
        });
    }
  };

  const handleComment = (e) => {
    setComment((previousVal) => {
      return { ...previousVal, value: e.target.value };
    });
  };

  const saveComment = () => {
    console.log("comment", comment);
    if (stars === 0) {
      alert("Valora esta receta antes de dejar tu comentario.");
    } else {
      axios.post("http://localhost:5000/saveComment", comment).then((res) => {
        getComments();
      });
    }
  };

  const handleStar = (index) => {
    setStars(index + 1);
  };

  const starsShow = () => {
    let result = [];
    for (let index = 0; index < stars; index++) {
      result.push(
        <span
          className="startIcon"
          key={index}
          onClick={(e) => handleStar(index)}
        >
          <FontAwesomeIcon icon={faStarSolid} />
        </span>
      );
    }
    for (let index = 0; index < reStart - stars; index++) {
      result.push(
        <span
          className="startIcon"
          key={index + stars}
          onClick={(e) => handleStar(index + stars)}
        >
          <FontAwesomeIcon icon={faStar} />
        </span>
      );
    }
    return result;
  };

  const starsShowComment = (starsNumber) => {
    let result = [];
    for (let index = 0; index < starsNumber; index++) {
      result.push(
        <span className="startIcon2" key={index}>
          <FontAwesomeIcon icon={faStarSolid} />
        </span>
      );
    }
    for (let index = 0; index < reStart - starsNumber; index++) {
      result.push(
        <span className="startIcon2" key={index + starsNumber}>
          <FontAwesomeIcon icon={faStar} />
        </span>
      );
    }
    return result;
  };

  useEffect(() => {
    setComment((previousVal) => {
      return { ...previousVal, stars: stars };
    });
  }, [stars]);

  useEffect(() => {
    console.log(isSaved);
    //Cambiar icono
  }, [isSaved]);

  useEffect(() => {
    if (recipeComments) {
      setNumberComments(recipeComments.length);
    }
  }, [recipeComments]);

  useEffect(() => {
    console.log(numberComments);
    if (numberComments === 0) {
      setCommentsShow("No hay comentarios por el momento.");
    } else {
      setCommentsShow(
        recipeComments.map((comment) => {
          //const userComment = await getUserComment(comment.userId)
          return (
            <div className="comment">
              <p className="userName">
                <Image
                  src={"https://github.com/mshaaban0.png"}
                  roundedCircle
                  style={{ width: "30px" }}
                />
                <span> {comment.userId}</span>
              </p>
              {starsShowComment(comment.stars)}
              <p className="mt-4">{comment.commentValue}</p>
              <div className="time">
                <small>
                  {new Date(comment.date).getDay() +
                    "/" +
                    new Date(comment.date).getMonth() +
                    "/" +
                    new Date(comment.date).getFullYear() +
                    " a las " +
                    new Date(comment.date).getHours() +
                    ":" +
                    new Date(comment.date).getMinutes()}
                </small>
              </div>
            </div>
          );
        })
      );
    }
  }, [numberComments]);

  useEffect(() => {
    getRecipe();
    //Esta Guarda
    getIsSaved();
    //Comments
    getComments();

    getUserComment(currentUserId);
  }, []);

  useEffect(()=>{
    if(user){

      setComment((previousVal) => {
        return { ...previousVal, uid: user?.username };
      });
    }
  },[user])



  const editDeleteButton = (
    <span className="buttons">
      <button className="btn btn-danger button" onClick={deleteRecipe}>
        <FontAwesomeIcon icon={faPenToSquare} /> Eliminar
      </button>
      <Link to={"/editRecipe/" + id} className="editButton">
        <button className="btn btn-primary button">
          <FontAwesomeIcon icon={faPenToSquare} /> Edit
        </button>
      </Link>
    </span>
  );

  return (
    <div>
      <Header />
      <div className=" container-fluid row recipeContainer">
        <main className="col-md-9 main">
          <h1>
            <FontAwesomeIcon
              className="saveIcon"
              icon={isSaved ? faSolidBookmark : faBookmark}
              onClick={saveFavouriteRecipe}
            />
            {recipe.name}{" "}
            <small className="category">
              · {recipe.category?.toUpperCase()}
            </small>
          </h1>
          {getCurrentUserId() == recipe.userId ? editDeleteButton : ""}
          <img
            src={"/assets/recipeImages/" + recipe.img}
            className="imgRecipe"
          />
          <div>
            <p>{recipe.description}</p>
            <hr />
            <h2>Ingredientes:</h2>

            {recipe.ingredients.map((ingredient) => (
              <p key={ingredient}>- {ingredient}</p>
            ))}
            <hr />
            <h2>Elaboración:</h2>
            <p>{recipe.steps}</p>
            <p>Subido por {recipe.userName}</p>
          </div>

          {/*Ecribir comentario*/}
          <textarea
            className="commentField"
            placeholder="Deja tu comentario..."
            onChange={(e) => handleComment(e)}
          ></textarea>
          {starsShow()}
          <button className="btn btn-primary button" onClick={saveComment}>
            Enviar
          </button>

          {/*Mostrar comentarios*/}
          <h2 className="mt-5">Comentarios</h2>

          {commentsShow}
        </main>
        <aside className="col-md-3 moreRecipes">
          <div className="p">
            <h2>Recetas relacionadas</h2>
            <RelatedRecipes category={recipe.category} id={id}></RelatedRecipes>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ShowRecipe;
