import { useState } from 'react';

export default function usePizza({ pizzas, input }) {
  // Create some state to hold our order
  const [order, setOrder] = useState([]);
  // Make a function add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // Make a function remove thins from order
  function removeFromOrder(index) {
    setOrder([
      // everyhing before the removed item
      ...order.slice(0, index),
      // everyhing after the removed item
      ...order.slice(index + 1),
    ]);
  }
  // Send this data to serverless function after checkout

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
