import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart, handleChange, userIds }) => {
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.amount * item.price));
    setPrice(ans);
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    let totalPrice = 0;
    updatedCart.forEach((item) => {
      totalPrice += item.price;
    });
    setPrice(totalPrice);
  };

  const handlePlaceOrder = () => {
    const requestData = {
      userIds: userIds,
      cart: cart,
    };

    axios
      .post("http://localhost:8001/store-cart", requestData)
      .then((response) => {
        console.log("Order placed successfully:", response.data);
        setCart([]);
        navigate("./payment");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  useEffect(() => {
    handlePrice();
  });

  return (
    <div className="container mx-auto py-8 px-4 sm:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cart.map((item) => (
          <div
            className="bg-white shadow-md rounded-lg overflow-hidden"
            key={item.id}
          >
            <div className="cart-img">
              <img
                src={`http://localhost:8001/images/${item.image}`}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
              <p className="text-gray-500 mb-4">R{item.price} each</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={() => handleChange(item, -1)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-l focus:outline-none"
                  >
                    -
                  </button>
                  <button className="bg-blue-500 text-white px-3 py-1 focus:outline-none">
                    {item.amount}
                  </button>
                  <button
                    onClick={() => handleChange(item, +1)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-r focus:outline-none"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded focus:outline-none"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-8">
        <div className="font-semibold text-lg">Total price: R{price}</div>
        <button
          onClick={handlePlaceOrder}
          className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-green-600"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;