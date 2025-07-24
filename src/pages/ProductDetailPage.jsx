import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Share2, ArrowLeft } from "lucide-react";
import { useProductStore } from "../stores/productStore";
import { useAuthStore } from "../stores/authStore";
import { useCartStore } from "../stores/cartStore";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { currentProduct, isLoading, fetchProduct, addRating } =
    useProductStore();
  const { isAuthenticated } = useAuthStore();
  const { addToCart, isInCart } = useCartStore();

  useEffect(() => {
    fetchProduct(id);
  }, [id, fetchProduct]);

  const handleAddToCart = () => {
    if (!currentProduct) return;

    addToCart(currentProduct, quantity);
  };

  const handleAddRating = () => {
    if (!isAuthenticated()) {
      // Redirect to login
      return;
    }

    addRating(id, { rating, review });
    setRating(5);
    setReview("");
    setShowReviewForm(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Product not found</p>
      </div>
    );
  }

  const {
    name,
    description,
    price,
    images,
    stock,
    averageRating,
    totalRatings,
    ratings,
    category,
  } = currentProduct;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-primary-600">
          Home
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-primary-600">
          Products
        </Link>
        <span>/</span>
        <Link
          to={`/products?category=${category?._id}`}
          className="hover:text-primary-600"
        >
          {category?.name}
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <img
            src={images?.[selectedImage] || "/placeholder-product.jpg"}
            alt={name}
            className="w-full h-96 object-cover rounded-lg"
          />

          {/* Thumbnail */}
          {images && images.length > 1 && (
            <div className="mt-4 flex gap-3 flex-wrap">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-transform duration-200 ${
                    selectedImage === index
                      ? "border-primary-600 ring-2 ring-primary-300"
                      : "border-gray-200 hover:scale-105"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4 space-x-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= averageRating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                  title={`${averageRating?.toFixed(1)} out of 5`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({totalRatings || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ${price?.toFixed(2)}
            </span>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                stock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-gray-600">{description}</p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="mb-6">
            <div className="flex items-end sm:items-center gap-4 flex-col sm:flex-row">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="input w-24"
                >
                  {[...Array(Math.min(stock, 10)).keys()].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={stock === 0}
                className={`btn flex-1 flex items-center justify-center gap-2 disabled:opacity-50 ${
                  isInCart(currentProduct?._id)
                    ? "btn-secondary"
                    : "btn-primary"
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                {isInCart(currentProduct?._id) ? "In Cart" : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="btn btn-outline flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </button>
            <button className="btn btn-outline flex items-center">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          {isAuthenticated() && (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn btn-primary"
            >
              Write a Review
            </button>
          )}
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="card p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                  className="input"
                  placeholder="Share your thoughts about this product..."
                />
              </div>

              <div className="flex space-x-4">
                <button onClick={handleAddRating} className="btn btn-primary">
                  Submit Review
                </button>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {ratings && ratings.length > 0 ? (
            ratings.map((rating, index) => (
              <div
                key={index}
                className="bg-white shadow-sm border border-gray-100 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-600">
                      {rating.user?.name?.charAt(0) || "U"}
                    </div>
                    <span className="font-semibold text-gray-800">
                      {rating.user?.name || "Anonymous"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= rating.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {rating.review && (
                  <p className="text-gray-600 text-sm">{rating.review}</p>
                )}
                <div className="text-xs text-gray-400 mt-2">
                  {new Date(rating.date).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
