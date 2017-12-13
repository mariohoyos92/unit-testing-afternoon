const cart = require("./cart");
const cars = require("./data/cars");

describe("Cart Properties:", () => {
  test("Cart should be empty", () => {
    expect(Array.isArray(cart.cart)).toEqual(true);
    expect(cart.cart).toHaveLength(0);
  });
  test("Total should be 0", () => {
    expect(cart.total).toBe(0);
  });
});

describe("Cart Methods:", () => {
  afterEach(() => {
    cart.cart = [];
    cart.total = 0;
  });
  test("addToCart should increase cart length by 1", () => {
    cart.addToCart(cars[0]);
    expect(cart.cart.length).toBe(1);
    expect(cart.cart[0]).toBe(cars[0]);
  });
  test("addToCart should increment total by price", () => {
    cart.addToCart({ price: 10 });
    expect(cart.total).toBe(10);
  });
  test("RemoveFromCart should decrease length by one and keep items in line", () => {
    cart.addToCart(cars[0]);
    cart.addToCart(cars[1]);
    cart.addToCart(cars[2]);

    cart.removeFromCart(1, cars[1].price);

    expect(cart.cart.length).toEqual(2);
    expect(cart.cart[0]).toEqual(cars[0]);
    expect(cart.cart[1]).toEqual(cars[2]);
  });
  test("removeFromCart() should decrease the total property.", function() {
    cart.addToCart(cars[0]);
    cart.addToCart(cars[8]);
    cart.addToCart(cars[2]);

    cart.removeFromCart(0, cars[0].price);
    cart.removeFromCart(1, cars[2].price);

    expect(cart.total).toEqual(cars[8].price);
  });
  test("checkout() shoud empty the cart array and set total to 0.", function() {
    cart.addToCart(cars[0]);
    cart.addToCart(cars[1]);
    cart.addToCart(cars[2]);
    cart.addToCart(cars[3]);

    cart.checkout();

    expect(cart.cart.length).toEqual(0);
    expect(cart.total).toEqual(0);
  });
});
