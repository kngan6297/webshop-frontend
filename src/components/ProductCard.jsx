import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/cartStore";

const ProductCard = ({ product }) => {
  const { _id, name, price, images, averageRating, totalRatings, category } =
    product;

  const { addToCart, isInCart } = useCartStore();
  const inCart = isInCart(_id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="card group hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={images?.[0] || "/placeholder-product.jpg"}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={handleAddToCart}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            title="Add to Cart"
          >
            <ShoppingCart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 justify-between p-4">
        <div>
          {/* Category */}
          <div className="mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              {category?.name}
            </span>
          </div>

          {/* Name */}
          <Link to={`/products/${_id}`}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>

          {/* Rating & Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">
                {averageRating?.toFixed(1) || "0.0"}
              </span>
              <span className="text-xs text-gray-400">
                ({totalRatings || 0})
              </span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              ${price?.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={`w-full btn mt-auto ${
            inCart ? "btn-secondary" : "btn-primary"
          }`}
        >
          {inCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
