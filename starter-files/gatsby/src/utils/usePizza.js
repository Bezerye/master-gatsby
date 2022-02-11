import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
  // Create some state to hold our order
  // We moved useState to contextProvider
  // const [order, setOrder] = useState([]);
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setloading] = useState(false);
  const [message, setMessage] = useState('');
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

  // Submit handler
  async function submitOrder(e) {
    e.preventDefault();
    setloading(true);
    setError(null);
    setMessage(null);
    // gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      gender: values.gender,
    };
    // Send this data to serverless function after checkout
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());

    // Check if everything worked
    if (res.status >= 400 && res.status <= 600) {
      setloading(false);
      setError(text.message);
    } else {
      setloading(false);
      setMessage('Success! Come on down for your pizza');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
