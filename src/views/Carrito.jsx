import React from 'react'
import { useContext } from 'react'
import Context from '../Context'

const Carrito = () => {
  const {globalCarrito, globalTotal, globalIncrementar} = useContext(Context)
  const {carrito, setCarrito} = globalCarrito;
  const {total, setTotal} = globalTotal
  const {incrementar, setIncrementar } = globalIncrementar
  console.log(incrementar)

  const incrementarPizza = (pizza, index) =>{
    
    let nuevoCarrito = carrito

    pizza.cantidad +=1

    nuevoCarrito[index] = pizza


    setCarrito(nuevoCarrito)
    

    setIncrementar(pizza.cantidad)

    let acumulador = 0;
      carrito.forEach((pizza) => {
        acumulador += pizza.price*pizza.cantidad;
      });

      setTotal(acumulador);
  }

  const decrementarPizza = (pizza, index) =>{
    let nuevoCarrito = carrito

    pizza.cantidad -=1
    nuevoCarrito[index] = pizza
    setCarrito(nuevoCarrito)
    
    setIncrementar(pizza.cantidad)
    let acumulador = 0;
      carrito.forEach((pizza) => {
        acumulador += pizza.price*pizza.cantidad;
      });
      setTotal(acumulador);

      if(pizza.cantidad <= 0){
        let eliminar = carrito.filter((elemento) => elemento.id !== pizza.id)
        setCarrito(eliminar)
        pizza.cantidad = 0
        let acumulador = 0;
      carrito.forEach((pizza) => {
        acumulador += pizza.price*pizza.cantidad;
        console.log(acumulador);
      });
        setTotal(acumulador);
      }

  }

  const eliminarPizza = (pizza) =>{

    let eliminar = carrito.filter((elemento) => elemento.id !== pizza.id)

    setCarrito(eliminar)

    let cantidad = pizza.cantidad = 0
    let acumulador = 0;
      carrito.forEach((pizza) => {
        acumulador += pizza.price*cantidad;
      });

      setTotal(acumulador);
  }


  return (
    <div className='carrito'>
      <h1>Detalles de pedido:</h1>
      <div className='container-carrito'>
        {
          carrito.map((pizza, index) =>{
            return(
              <div className='carrito-card' key={pizza.id}>
                <div className='container-img'>
                  <img src={pizza.img} alt="imagen de pizza" className='carrito-img' />
                  <h3>{pizza.name}</h3>
                </div>

                <div className='container-price'>
                <span className='carrito-price' >${pizza.price*pizza.cantidad}</span>
                  <button className='button-carrito decrementar-carrito' onClick={()=> decrementarPizza(pizza, index)} >-</button>
                  <span className='cantidad'>{pizza.cantidad}</span>
                  <button className='button-carrito incrementar-carrito' onClick={ () => incrementarPizza(pizza, index)}>+</button>
                  <button className='eliminar' onClick={() => eliminarPizza(pizza)}>Eliminar</button>
                </div>
              </div>
            )
          })
        }
        <p className='total'>Total: $ {total} </p>
        <button className='pagar'>Ir a Pagar</button>

      </div>
      </div>
  )
}

export default Carrito