class Order {
  constructor(cartValue, deliveryDistance, numberOfItems, time) {
    this.cartValue = cartValue;
    this.deliveryDistance = deliveryDistance;
    this.numberOfItems = numberOfItems;
    this.time = time
  }
}

module.exports = Order;