import React from "react";
import { logout } from "../../firebase";
import "./style.css";
import { BsSearch } from "react-icons/bs";
import { GrFormAdd } from "react-icons/gr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBookmark,
  faSignOut,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, NavDropdown, Container, Image } from "react-bootstrap";

function Header() {
  return (
    <Navbar expand="sm" className="navbar">
      <Container fluid>
        <Navbar.Brand href="#" className="d-block d-sm-none">
          <img
            src="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded"
            alt="logo"
            height="80"
          />
          Cooking App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <BsSearch className="searchIcon" />
            <NavDropdown title="Recetas" id="navbarScrollingDropdown" style={{marginRight: "30px"}}>
              <NavDropdown.Item href="#action3">Vegetarianas</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Celiacos</NavDropdown.Item>
              <NavDropdown.Item href="#action5">Saladas</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav className="d-flex">
            <Nav.Link href="/newRecipe"  style={{marginRight: "30px"}}>
              <GrFormAdd className="addIcon" /> Añadir Receta
            </Nav.Link>
            <NavDropdown
              align="end"
              title={
                <Image
                  src={"https://github.com/mshaaban0.png"}
                  roundedCircle
                  style={{ width: "40px"}}
                />
              }
              id="navbarScrollingDropdown "
            >
              <NavDropdown.Item href="#action3">
                <FontAwesomeIcon className="userIcon" icon={faUser} />
                Mi Perfil
              </NavDropdown.Item>
              <NavDropdown.Item href="/myRecipes">
                {" "}
                <FontAwesomeIcon className="userIcon" icon={faUtensils} />
                Mis Recetas
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5">
                <FontAwesomeIcon className="userIcon" icon={faBookmark} />
                Recetas guardadas
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>
                <FontAwesomeIcon className="userIcon" icon={faSignOut} />
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
