import React, { useState } from "react";
import { InputPrice, BtnPage } from "../styles/styled";
import { PopupInfo } from "./PopupInfo";

export const Counter = (props) => {
  const [counter, setCounter] = useState(props.start);

  //Función que al pulsar el botón de suma, suma uno
  const sumNumber = () => {
    setCounter(converToNumber(counter) + 1);
    props.onChange(counter + 1);
  };

  //Función que al pulsar el botón de menos, resta uno
  const restNumber = () => {
    if (counter > 0) {
      setCounter(converToNumber(counter) - 1);
      props.onChange(counter - 1);
    }
  };

  //Función que recoge el valor del input
  const setNumber = (e) => {
    props.onChange(e.target.value);
    setCounter(e.target.value);
  };

  //Función para convertir a un entero un string
  const converToNumber = (val) => {
    return parseInt(val);
  };

  return (
    <div className="containerButton">
      <BtnPage type="button" onClick={sumNumber}>
        +
      </BtnPage>
      <InputPrice
        type="text"
        value={counter}
        placeholder="0"
        onChange={setNumber}
      />
      <BtnPage type="button" onClick={restNumber}>
        -
      </BtnPage>
      <PopupInfo value={counter} />
    </div>
  );
};
