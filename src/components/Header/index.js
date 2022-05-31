import React from "react";
import { logout } from "../../firebase";
import "./style.css";
import { BsSearch } from "react-icons/bs";
import { GrFormAdd } from "react-icons/gr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  faUser,
  faBookmark,
  faSignOut,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, NavDropdown, Container, Image } from "react-bootstrap";

function Header() {

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar expand="sm" className={`navbar ${offset !== 0 ? "navbarShadow" : ""}`}>
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
          <Nav className="me-auto" style={{ maxHeight: "100px" }} navbarScroll>
            <BsSearch className="searchIcon" />
            <NavDropdown
              title="Recetas"
              id="navbarScrollingDropdown"
              style={{ marginRight: "30px" }}
            >
              <NavDropdown.Item href="#action3">Vegetarianas</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Celiacos</NavDropdown.Item>
              <NavDropdown.Item href="#action5">Saladas</NavDropdown.Item>
            </NavDropdown>

            <Link to="/" className="navbarLinks">Home</Link>
          </Nav>
          <Nav className="d-flex">
            <Link to="/newRecipe" style={{ marginRight: "30px", marginTop: "5px" }} className="navbarLinks">
              <GrFormAdd className="addIcon" /> Añadir Receta
            </Link>
            <NavDropdown
              align="end"
              title={
                <Image
                  src={"https://github.com/mshaaban0.png"}
                  roundedCircle
                  style={{ width: "40px" }}
                />
              }
              id="navbarScrollingDropdown "
            >
              <NavDropdown.Item href="#action3">
                <FontAwesomeIcon className="userIcon" icon={faUser} />
                Mi Perfil
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/myRecipes" className="navItemLink">
                <FontAwesomeIcon className="userIcon" icon={faUtensils} />
                Mis Recetas
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/myFavouriteRecipes" className="navItemLink">
                <FontAwesomeIcon className="userIcon" icon={faBookmark} />
                Recetas guardadas
                </Link>
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
