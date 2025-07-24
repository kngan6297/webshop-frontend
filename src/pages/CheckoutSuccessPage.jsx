import { Link } from "react-router-dom";
import { CheckCircle, Home, Package } from "lucide-react";

const CheckoutSuccessPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center py-20">
        <div className="mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank you for your order!
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Your order has been successfully placed. You will receive an email
            confirmation shortly with your order details and tracking
            information.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md mx-auto mb-8">
          <div className="flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              Order Confirmed
            </h2>
          </div>
          <p className="text-gray-600 mb-4">
            Order #:{" "}
            <span className="font-mono font-medium">
              ORD-{Date.now().toString().slice(-8)}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Estimated delivery: 3-5 business days
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn btn-primary flex items-center justify-center"
          >
            <Home className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
          <Link
            to="/products"
            className="btn btn-outline flex items-center justify-center"
          >
            <Package className="h-4 w-4 mr-2" />
            Browse More Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
