import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Context from "./Context";
import Carrito from "./views/Carrito";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Pizza from "./views/Pizzas";

function App() {

  const [listaPizzas, setListaPizzas] = useState([]);
  const [pizzaId, setPizzaId] = useState([])
  const [carrito, setCarrito] = useState([])
  const [total, setTotal] = useState(0)
  const [incrementar, setIncrementar] = useState([])

  const globalPizzas = {listaPizzas, setListaPizzas}
  const globalPizzaId = {pizzaId, setPizzaId};
  const globalCarrito = {carrito, setCarrito};
  const globalTotal = {total, setTotal}
  const globalIncrementar = {incrementar, setIncrementar} 


  const pizzasRender = async() =>{
    const url = '/datosPizza.json';
    const response = await fetch(url);
    const data = await response.json()
    setListaPizzas(data)
  }

  useEffect(() =>{
    pizzasRender()
  }, [])

  const añadirPizza = (pizza) => {

    let pizzaExistente = carrito.findIndex(
      (pizzaCarrito) => pizzaCarrito.id === pizza.id
    );

    if (pizzaExistente === -1) {

      const añadir = [...carrito, pizza];

      setCarrito(añadir);

      let cantidad = pizza.cantidad = 1

      let acumulador = 0;
      añadir.forEach((pizza) => {
        acumulador += pizza.price*cantidad;
        console.log(acumulador);

        alert("Se agrego Su Pizza al Carrito")
      });

      setTotal(acumulador);
    }
  };

  return (
    <div className="App">
      <Context.Provider value={{globalPizzas, globalPizzaId, globalCarrito, globalTotal, globalIncrementar, añadirPizza}}>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/pizza/:id" element={<Pizza/>} />
          <Route path="/carrito" element={<Carrito/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
