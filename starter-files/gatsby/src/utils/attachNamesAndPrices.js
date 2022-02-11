import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function attachNamesAndPrices(order, pizzas) {
  return order.map((item) => {
    const pizza = pizzas.find((element) => element.id === item.id);
    return {
      ...item,
      name: pizza.name,
      price: formatMoney(calculatePizzaPrice(pizza.price, item.size)),
    };
  });
}
