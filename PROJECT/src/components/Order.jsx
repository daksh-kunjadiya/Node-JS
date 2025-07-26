import React, { useState } from "react";

const Order = () => {
  const initialProducts = [
    {
      id: 1,
      name: "Product A",
      desc: "Description for product A",
      count: 0,
      image:
        "https://avatars.mds.yandex.net/i?id=e6d7cc377248fe674e4d7f58616437538632e2d9-3861735-images-thumbs&n=13",
    },
    {
      id: 2,  
      name: "Product B",
      desc: "Description for product B",
      count: 0,
      image:
        "https://avatars.mds.yandex.net/i?id=1e1a10263da564693149214adfccdfb6309cb02f-5092559-images-thumbs&n=13",
    },
    {
      id: 3,
      name: "Product C",
      desc: "Description for product C",
      count: 0,
      image:
        "https://avatars.mds.yandex.net/i?id=72118dd72f5cf4f47c3ec214d580263c2c9dbd83-5873671-images-thumbs&n=13",
    },
    {
      id: 4,
      name: "Product D",
      desc: "Description for product D",
      count: 0,
      image:
        "https://avatars.mds.yandex.net/i?id=6b005eb5824494500ab8c9c0cbb0892c21a8bb72-5341800-images-thumbs&n=13",
    },
    {
      id: 5,
      name: "Product E",
      desc: "Description for product E",
      count: 0,
      image:
        "https://avatars.mds.yandex.net/i?id=371dbb5d4c49d4dfcdefe5d440a82eb02d7e8d93-9236689-images-thumbs&n=13",
    },
    {
      id: 6,
      name: "Product F",
      desc: "Description for product F",
      count: 0,
      image:
        "https://avatars.mds.yandex.net/i?id=d03440d91b91ac52f156917e5bd7ebb2cd5542f5-5490022-images-thumbs&n=13",
    },
  ];

  const [products, setProducts] = useState(initialProducts);

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

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="Order grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-black rounded-lg p-4 flex flex-col gap-4"
          >
            {/* Image and info */}
            <div className="flex flex-row gap-6 items-center">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-xl object-cover"
              />
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-sm text-gray-600">{product.desc}</p>
              </div>
            </div>
            {/*counter*/}
            <div className="flex flex-row items-center justify-between gap-4 mt-2">
              <div className="flex flex-row items-center gap-3">
                <button
                  className="w-8 h-8 text-xl border border-black rounded-lg flex flex-column justify-center"
                  onClick={() => handleCounter(product.id, "-", 1)}
                >
                  -
                </button>
                <span className="text-xl">{product.count}</span>
                <button
                  className="w-8 h-8 text-xl border border-black rounded-lg flex flex-column justify-center"
                  onClick={() => handleCounter(product.id, "+", 1)}
                >
                  +
                </button>
              </div>
              {/* delete */}
              <button
                className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-100"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-4 col-span-2">
            No products left.
          </p>
        )}
      </div>
    </main>
  );
};

export default Order;
