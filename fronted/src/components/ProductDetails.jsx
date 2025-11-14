import React from "react";
import { useParams } from "react-router-dom";
import products from "../product-api/product.js";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice.js";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return <p className="p-4 text-red-500">Product not found.</p>;
  }

  const discountedPrice = (
    product.price - (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const productInCart = useSelector((state) =>
    state.cart.find((item) => item.id === product.id)
  );

  return (
    <div className="p-8 flex flex-col md:flex-row gap-8">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full md:w-1/2 h-auto rounded-lg shadow-md object-cover"
      />

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.description}</p>

        <p className="text-lg">
          <span className="font-bold text-gray-900">${discountedPrice}</span>{" "}
          <span className="line-through text-gray-400">${product.price}</span>
        </p>

        <p className="text-sm text-gray-500">
          Discount: {product.discountPercentage}% | Rating: {product.rating}
        </p>

        <button
          onClick={() => dispatch(addToCart(product))} // ✅ fixed
          disabled={!!productInCart}
          className={`w-full px-4 py-2 rounded-lg font-bold transition-colors duration-300 ${
            productInCart
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {productInCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
