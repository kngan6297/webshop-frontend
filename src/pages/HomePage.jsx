import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Truck, Shield, Clock, ShoppingBag } from "lucide-react";
import { useProductStore } from "../stores/productStore";
import { useAuthStore } from "../stores/authStore";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const navigate = useNavigate();
  const { featuredProducts, fetchFeaturedProducts, isLoading } =
    useProductStore();
  const { isAuthenticated, isAdmin } = useAuthStore();

  useEffect(() => {
    // Redirect admin users to admin dashboard
    if (isAuthenticated() && isAdmin()) {
      navigate("/admin", { replace: true });
      return;
    }
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts, navigate, isAuthenticated, isAdmin]);

  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Payment",
      description: "100% secure payment processing",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Fast Delivery",
      description: "Same day shipping on most items",
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Easy Returns",
      description: "30-day return policy",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-28 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Discover. Shop. Smile.
          </h1>
          <p className="text-lg md:text-2xl text-primary-100 mb-10">
            Your one-stop shop for everything awesome
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg flex items-center justify-center shadow-md transition"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/products"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold flex items-center justify-center transition"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-primary-100 text-primary-600 rounded-full mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked items our customers love the most
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-14">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition"
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Explore?
          </h2>
          <p className="text-lg md:text-xl text-primary-100 mb-8">
            Start shopping now and get exclusive offers!
          </p>
          <Link
            to="/products"
            className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
