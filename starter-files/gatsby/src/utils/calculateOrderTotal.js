import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // loop over each item in the order
  return order.reduce((runningTotal, singleOrder) => {
    // Calc the total for that pizza
    const pizza = pizzas.find((item) => item.id === singleOrder.id);
    // add that total to the running total
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
}
