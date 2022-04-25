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
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

function Header() {
  return (
    <Navbar expand="sm" className="navbar">
      <Container fluid>
        <Navbar.Brand href="#" className="d-block d-sm-none">
          Cooking App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <BsSearch className="searchIcon" />
            <NavDropdown title="Recetas" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Vegetarianas</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Celiacos</NavDropdown.Item>
              <NavDropdown.Item href="#action5">Saladas</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav className="d-flex">
            <Nav.Link href="/newRecipe">
              <GrFormAdd className="addIcon" /> Añadir Receta
            </Nav.Link>
            <NavDropdown
              align="end"
              title="Usuario"
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
