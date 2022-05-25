import React from "react";
import { Accordion } from "react-bootstrap";
import CardGroup from "../../components/CardGroup";
import './style.css'

function CategoriesAccordion() {
  return (
    <Accordion defaultActiveKey={"0"}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h1 className="categoriesTitle">Explora por categorías</h1>
        </Accordion.Header>
        <Accordion.Body>
          <div className="row">
            <CardGroup
              title="Arroces"
              color="#ff6961"
              img="/assets/risotto.png"
            />
            <CardGroup title="Pasta" color="#77dd77" img="/assets/pasta.png" />
            <CardGroup
              title="Ensalada"
              color="#fdfd96"
              img="/assets/salad.png"
            />
            <CardGroup title="Pizza" color="#fdcae1" img="/assets/pizza.png" />
            <CardGroup
              title="Hamburguesa"
              color="#b0c2f2"
              img="https://www.pngall.com/wp-content/uploads/2016/05/Burger-Free-Download-PNG.png"
            />
            <CardGroup
              title="Asiatica"
              color="#84b6f4"
              img="/assets/ramen.png"
            />
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default CategoriesAccordion;
