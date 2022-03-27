import { useState, useEffect } from "react";
import { products } from "../utils/Products";
import { PanelWeb } from "../components/PanelWeb";
import { Bill } from "../components/Bill";
import { Container } from "../styles/styled";
import logoSearch from "../assets/logoSearch.png";
import { useNavigate, useLocation } from "react-router-dom";

const localStorageKey = "storedData";
const clientListKey = "clientListKey";

export const ScreenPagWeb = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const [price, setPrice] = useState(0);
  const [data, setData] = useState(products);
  const [client, setClient] = useState({
    nombre: "",
    presupuesto: "",
  });
  const [clientList, setClientList] = useState([]);
  const [search, setSearch] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (!loadFromStore()) loadFromParams();
    const storedClient = window.localStorage.getItem(clientListKey);
    if (storedClient) {
      const valuesClient = JSON.parse(storedClient);
      setClientList(valuesClient);
    }
  }, []);

  const loadFromStore = () => {
    const storedData = window.localStorage.getItem(localStorageKey);
    if (storedData) {
      const values = JSON.parse(storedData);
      setData(values);
      const totalPrice = getTotalPrice(values);
      setPrice(totalPrice);
      return true;
    }
    return false;
  };

  const loadFromParams = () => {
    const values = products.map((p) => {
      const isChecked = query.get(p.name);
      var item = { ...p, checked: isChecked === "true" };
      if (isChecked && p.name === "web") {
        item.suplement = 8;
        item.suplemenItems = [
          {
            name: "page",
            count: parseInt(query.get("page")),
          },
          {
            name: "language",
            count: parseInt(query.get("language")),
          },
        ];
      }
      return item;
    });
    setData(values);
    const totalPrice = getTotalPrice(values);
    setPrice(totalPrice);
  };

  //Función que recoge los input chequeados
  const handleCheckbox = (item) => {
    if (item.checked) {
      item.checked = false;
      item.suplemenItems = item.suplemenItems.map((s) => ({ ...s, count: 0 }));
    } else item.checked = true;
    const productsState = JSON.stringify(data);
    window.localStorage.setItem(localStorageKey, productsState);
    calculateTotalPrice();
    navigateUrl();
  };

  const navigateUrl = () => {
    navigate(buildUrl());
  };

  const buildUrl = () => {
    let params = data.reduce(
      (str, p, index) =>
        str + p.name + "=" + p.checked + (index < data.length - 1 ? "&" : ""),
      ""
    );

    const webData = data.find((x) => x.name === "web");
    if (webData.checked === true) {
      params = webData.suplemenItems.reduce(
        (str, p) => str + "&" + p.name + "=" + p.count,
        params
      );
    }

    return "/screenPagWeb?" + params;
  };

  //Función que calcula el suplemento de páginas e idiomas
  const addSuplement = (item, value) => {
    item.suplement = value.total;
    item.suplemenItems = value.items;
    navigateUrl();
    calculateTotalPrice();
  };

  const calculateTotalPrice = () => {
    const priceTotal = getTotalPrice(data);
    setPrice(priceTotal);
  };

  //Función que calcula el precio
  const getTotalPrice = (values) => {
    const valueSelected = values.filter((item) => item.checked === true);
    const priceTotal = valueSelected.reduce(
      (acc, item) => acc + (item.price + item.suplement),
      0
    );
    return priceTotal;
  };

  const handleInputChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  //Función que guarda los presupuestos
  const sendBill = (e) => {
    e.preventDefault();
    const item = {
      index: clientList.length + 1,
      ...client,
      date: new Date(Date.now()),
      data: data.map((p) => ({ ...p })),
      price: price,
    };
    const listUpdated = [...clientList, item];
    const listUpdatedStored = JSON.stringify(listUpdated);
    window.localStorage.setItem(clientListKey, listUpdatedStored);
    setClientList(listUpdated);
  };

  //Funcion que ordena alfabeticamente los presupuestos
  const orderListBill = () => {
    const copy = [...clientList];
    copy.sort((a, b) => {
      if (a.presupuesto > b.presupuesto) return 1;
      if (a.presupuesto < b.presupuesto) return -1;
      return 0;
    });
    setClientList(copy);
    setShowList(false);
  };

  //Función que ordena por fecha los presupuestos
  const orderListDate = () => {
    const copy = [...clientList];
    copy.sort((a, b) => {
      if (a.date > b.date) return 1;
      if (a.date < b.date) return -1;
      return 0;
    });
    console.log(copy);
    setClientList(copy);
    setShowList(false);
  };

  //Funcion que reinicia los presupuestos
  const resetList = () => {
    const copy = [...clientList];
    copy.sort((a, b) => {
      if (a.index > b.index) return 1;
      if (a.index < b.index) return -1;
      return 0;
    });
    setClientList(copy);
    setShowList(false);
  };

  //Funcion para buscar por nombre del presupuesto
  const searchBill = (e) => {
    const clientListBill = clientList.filter((x) => {
      return x.presupuesto === e.target.value;
    });
    setSearch(clientListBill);
    if (clientListBill.length !== 0) {
      setShowList(!showList);
    }
  };

  return (
    <Container>
      <div className="containerProducts">
        <form onSubmit={sendBill}>
          <h3>¿Qué quieres hacer?</h3>
          {data.map((item) => {
            return (
              <div key={item.name}>
                <br />
                <input
                  type="checkbox"
                  name={item.name}
                  checked={item.checked}
                  onChange={(x) => handleCheckbox(item)}
                />
                {item.text}
                {item.checked && item.name === "web" && (
                  <PanelWeb onChanged={(x) => addSuplement(item, x)} />
                )}
              </div>
            );
          })}
          <p>Precio: {price} €</p>
          <br />
          Introduce el nombre del presupuesto:
          <br />
          <input
            type="text"
            name="presupuesto"
            onChange={handleInputChange}
            required
          />
          <br />
          Introduce el nombre del cliente:
          <br />
          <input
            type="text"
            name="nombre"
            onChange={handleInputChange}
            required
          />
          <br />
          <button type="submit" className="btnEnviar">
            Enviar
          </button>
        </form>
      </div>

      <div>
        {clientList.length !== 0 && (
          <div>
            <input
              className="inputSearch"
              type="text"
              placeholder="Busca el nombre del presupuesto"
              onChange={searchBill}
            />
            <img src={logoSearch} alt="" className="logoSearch" />
            <br />
            <button onClick={orderListBill} className="btnOrder">
              Ordenar por presupuesto
            </button>
            <button onClick={orderListDate} className="btnOrder">
              Ordenar por fecha
            </button>
            <button onClick={resetList} className="btnOrder">
              Reiniciar
            </button>
          </div>
        )}
        {showList ? <Bill list={search} /> : <Bill list={clientList} />}
      </div>
    </Container>
  );
};
