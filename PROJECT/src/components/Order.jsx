import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();

  const initialProducts = [
    {
      id: 1,
      name: "Pizza",
      desc: "Cheesy Margherita Pizza",
      price: 150,
      count: 0,
      image:
        "https://avatars.mds.yandex.net/i?id=e6d7cc377248fe674e4d7f58616437538632e2d9-3861735-images-thumbs&n=13",
    },
    {
      id: 2,
      name: "Burger",
      desc: "Spicy Veggie Burger",
      price: 120,
      count: 0,
      image:
        "https://avatars.mds.yandex.net/i?id=1e1a10263da564693149214adfccdfb6309cb02f-5092559-images-thumbs&n=13",
    },
    {
      id: 3,
      name: "Pasta",
      desc: "Creamy Alfredo Pasta",
      price: 200,
      count: 0,
      image:
        "https://avatars.mds.yandex.net/i?id=72118dd72f5cf4f47c3ec214d580263c2c9dbd83-5873671-images-thumbs&n=13",
    },
    {
      id: 4,
      name: "Sandwich",
      desc: "Grilled Veg Sandwich",
      price: 180,
      count: 0,
      image:
        "https://avatars.mds.yandex.net/i?id=6b005eb5824494500ab8c9c0cbb0892c21a8bb72-5341800-images-thumbs&n=13",
    },
    {
      id: 5,
      name: "French Fries",
      desc: "Crispy Masala Fries",
      price: 90,
      count: 0,
      image:
        "https://avatars.mds.yandex.net/i?id=371dbb5d4c49d4dfcdefe5d440a82eb02d7e8d93-9236689-images-thumbs&n=13",
    },
    {
      id: 6,
      name: "Noodles",
      desc: "Spicy Veg Hakka Noodles",
      price: 220,
      count: 0,
      image:
        "https://avatars.mds.yandex.net/i?id=d03440d91b91ac52f156917e5bd7ebb2cd5542f5-5490022-images-thumbs&n=13",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [showPopup, setShowPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderType, setOrderType] = useState("");

  const handleCounter = (id, opr, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              count:
                opr === "+"
                  ? product.count + value
                  : Math.max(0, product.count - value),
            }
          : product
      )
    );
  };

  const handleDelete = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const totalPrice = products.reduce(
    (acc, item) => acc + item.count * item.price,
    0
  );
  const totalCount = products.reduce((acc, item) => acc + item.count, 0);

  const handlePurchase = () => {
    const isValid = totalCount >= 1 && orderType && paymentMethod;

    if (!isValid) {
      setShowPopup(true);
      return;
    }

    if (paymentMethod === "Card") {
      navigate("/card-payment");
    } else {
      alert(
        `✅ Order placed successfully!\n\n🛒 Total: ₹${totalPrice}\n📦 Order Type: ${orderType}\n💳 Payment: ${paymentMethod}`
      );
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-white font-sans text-black py-10 px-4 transition-all duration-500">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-12 drop-shadow-md">
        🍽️ Food Ordering
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-3xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative group"
          >
            {/* Product Image & Info */}
            <div className="flex items-center gap-5">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-2xl w-28 h-28 object-cover shadow-md transition-transform duration-300 group-hover:scale-110"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.desc}
                </p>
                <p className="text-base font-medium text-green-600 mt-2">
                  ₹{product.price}
                </p>
              </div>
            </div>
            {/* counter */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center gap-3">
                <button
                  className="text-xl font-bold"
                  onClick={() => handleCounter(product.id, "-", 1)}
                >
                  −
                </button>
                <span className="text-xl font-bold">{product.count}</span>
                <button
                  className="text-xl font-bold"
                  onClick={() => handleCounter(product.id, "+", 1)}
                >
                  +
                </button>
              </div>
              {/* delete */}
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-500 text-sm font-medium hover:text-red-600 hover:underline transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-300 rounded"
              >
                Delete
              </button>
            </div>
            {/* Pricing */}
            {product.count > 0 && (
              <p className="text-right text-sm text-gray-500 mt-3">
                SubTotal: ₹{product.count * product.price}
              </p>
            )}
          </div>
        ))}
      </div>

      {products.length > 0 && (
        <section className="mt-16 bg-white p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto border border-gray-200">
          {totalPrice > 0 && (
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-600">
                💰 Total: ₹{totalPrice}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                You're just one step away from deliciousness!
              </p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-700 flex items-center gap-2">
              <span className="text-xl">📦</span> Order Type
            </h3>
            <div className="flex flex-wrap gap-6">
              {["Dining", "Delivery", "Takeaway"].map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    orderType === type
                      ? "bg-blue-100 border-blue-500 text-blue-800 font-medium"
                      : "border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-700"
                  } transition-all duration-200 cursor-pointer`}
                >
                  <input
                    type="radio"
                    name="orderType"
                    value={type}
                    checked={orderType === type}
                    onChange={(e) => setOrderType(e.target.value)}
                    className="accent-blue-500"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-blue-700 flex items-center gap-2">
              <span className="text-xl">💳</span> Payment Method
            </h3>
            <div className="flex flex-wrap gap-6">
              {["UPI", "Card", "Cash on Delivery"].map((method) => (
                <label
                  key={method}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    paymentMethod === method
                      ? "bg-green-100 border-green-500 text-green-800 font-medium"
                      : "border-gray-300 text-gray-600 hover:border-green-400 hover:text-green-700"
                  } transition-all duration-200 cursor-pointer`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-green-500"
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handlePurchase}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-10 py-3 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Confirm Purchase
            </button>
          </div>
        </section>
      )}

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white p-6 rounded-2xl shadow-2xl border border-red-300 w-[90%] max-w-sm transform transition-all scale-100 animate-fade-in">
            <p className="text-lg font-semibold text-red-600 mb-4">
              Please select at least one item, order type, and payment method.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-2 px-6 py-2 text-sm font-medium bg-red-500 text-white rounded-xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Order;
