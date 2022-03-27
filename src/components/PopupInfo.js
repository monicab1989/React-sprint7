import React from "react";
import infoLogo from "../assets/infoLogo.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../App.css";

//Función para pintar el modal del icono de info
export const PopupInfo = (props) => {
  return (
    <Popup
      trigger={
        <button className="btnInfo">
          <img src={infoLogo} alt="" />{" "}
        </button>
      }
      position="end left"
      modal
    >
      <div className="content">
        <h3>
          Su página web va a tener {props.value}{" "}
          {props.value === 1 ? "página" : "páginas"}
        </h3>
      </div>
    </Popup>
  );
};
