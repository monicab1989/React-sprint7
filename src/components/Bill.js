//Función para pintar el listado de presupuestos
export const Bill = (props) => {
  const parseDate = (date) => {
    const value = typeof date === "string" ? new Date(date) : date;
    return (
      value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear()
    );
  };

  return (
    <div>
      {props.list.map((item, index) => (
        <div key={index}>
          <p>Fecha: {parseDate(item.date)}</p>
          <h3>Nombre del presupuesto: {item.presupuesto}</h3>
          <p>Nombre del cliente: {item.nombre}</p>
          <p>Productos: </p>
          <ul>
            {item.data
              .filter((x) => {
                return x.checked === true;
              })
              .map((dataItem) => {
                return (
                  <li key={dataItem.name}>
                    {dataItem.text}
                    <ul>
                      {dataItem.suplemenItems.map((sp) => (
                        <li key={sp.name}>{sp.text + " " + sp.count}</li>
                      ))}
                    </ul>
                  </li>
                );
              })}
          </ul>

          <p>Precio total: {item.price}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};
