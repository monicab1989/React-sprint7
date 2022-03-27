import React from "react";
import { Panel } from "../styles/styled";
import { Counter } from "./Counter";
import "../App.css";

const pageWeb = [
  {
    name: "page",
    text: "Número de páginas.",
    count: 0,
  },
  {
    name: "language",
    text: "Número de idiomas.",
    count: 0,
  },
];

export const PanelWeb = (props) => {
  //Función que calcula el precio de la web
  const inputChange = (value, item) => {
    item.count = value;
    const sum = pageWeb.reduce((acc, val) => acc * val.count, 1);
    const total = sum * 30;
    props.onChanged({ items: [...pageWeb], total: total });
  };

  return (
    <Panel>
      {pageWeb.map((item) => {
        return (
          <div key={item.name} className="containerInputPage">
            {item.text}
            <Counter start={0} onChange={(x) => inputChange(x, item)} />
            <br />
          </div>
        );
      })}
    </Panel>
  );
};
