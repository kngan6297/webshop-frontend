import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Search, Grid, List } from "lucide-react";
import { useProductStore } from "../stores/productStore";
import ProductCard from "../components/ProductCard";

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const {
    products,
    categories,
    isLoading,
    pagination,
    filters,
    fetchProducts,
    fetchCategories,
    updateFilters,
    clearFilters,
  } = useProductStore();

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  useEffect(() => {
    // Fetch categories on component mount
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const currentFilters = {
      search: searchQuery,
      category: categoryFilter,
      minPrice,
      maxPrice,
    };

    fetchProducts(currentPage, currentFilters);
  }, [
    currentPage,
    searchQuery,
    categoryFilter,
    minPrice,
    maxPrice,
    fetchProducts,
  ]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    updateFilters(newFilters);

    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  };

  const handlePageChange = (page) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    setSearchParams(newSearchParams);
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Browse Our Products
        </h1>
        <p className="text-gray-500 text-base">
          {pagination.total} products found – Use filters to narrow your search
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64">
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline w-full flex items-center justify-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
            <div className="card p-6 shadow-lg rounded-xl border border-gray-100 bg-white">
              <h3 className="text-lg font-semibold text-primary-600 mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" /> Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="input pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="input"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) =>
                      handleFilterChange("minPrice", e.target.value)
                    }
                    className="input"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) =>
                      handleFilterChange("maxPrice", e.target.value)
                    }
                    className="input"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={handleClearFilters}
                className="btn btn-secondary w-full"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* View Mode Toggle */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 hidden sm:block">
                View Mode:
              </span>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md border transition ${
                  viewMode === "grid"
                    ? "bg-primary-600 text-white shadow"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                title="Grid View"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md border transition ${
                  viewMode === "list"
                    ? "bg-primary-600 text-white shadow"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Products */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : products.length > 0 ? (
            <>
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination – smooth & elegant */}
              {pagination.pages > 1 && (
                <div className="flex justify-center mt-12">
                  <nav
                    className="inline-flex rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    {Array.from(
                      { length: pagination.pages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 border text-sm font-medium transition ${
                          page === currentPage
                            ? "bg-primary-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        } ${page !== pagination.pages ? "border-r" : ""}`}
                      >
                        {page}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl font-medium">
                Oops! No products matched your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
