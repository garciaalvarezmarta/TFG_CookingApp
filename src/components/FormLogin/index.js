import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { registerWithEmail, loginWithEmail, loginWithGoogle } from "../../firebase";
import "./style.css";

function FormLogin(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let inputName = "";
  let buttonText = "Iniciar Sesión";
  let switchPage = (
    <Link to="/Register" className="link">
      ¿No tienes cuenta? Regístrate.
    </Link>
  );
  let submitType = (e) => {
    e.preventDefault();
    loginWithEmail(email, password);
  };

  if (props.type === "register") {
    inputName = (
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          value={username}
          placeholder="Nombre"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
    );

    buttonText = "Registrarme";

    submitType = (e) => {
      // e es la etiqueta en la que se ejecuta la acción
      e.preventDefault(); //que no se ejecute nada por defecto
      registerWithEmail(email, password, username);
    };

    switchPage = (
      <Link to="/" className="link">
        ¿Ya tienes cuenta? Iniciar Sesión.
      </Link>
    );
  }

  return (
    <main className="container">
      <div className="formContainer col-lg-4">
        <div className="formCard mainCard">
          <Form>
            <h1 className="mb-3">Cooking App</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {inputName}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={submitType}
              className="buttonForm"
            >
              {buttonText}
            </Button>
            <hr />
            <Button variant="primary" onClick={loginWithGoogle} className="googleButton">
              <img src="/assets/google.png" className="googleIcon"/>
              oogle
            </Button>
          </Form>
        </div>

        <div className="formCard">{switchPage}</div>
      </div>
    </main>
  );
}

export default FormLogin;
