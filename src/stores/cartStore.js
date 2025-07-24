import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      // Add item to cart
      addToCart: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find((item) => item._id === product._id);

        if (existingItem) {
          // Update quantity if item already exists
          const updatedItems = items.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ items: updatedItems });
          toast.success(`Updated ${product.name} quantity`);
        } else {
          // Add new item
          const newItem = {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[0],
            quantity,
            stock: product.stock,
          };
          set({ items: [...items, newItem] });
          toast.success(`${product.name} added to cart`);
        }

        // Update totals
        get().updateTotals();
      },

      // Remove item from cart
      removeFromCart: (productId) => {
        const { items } = get();
        const updatedItems = items.filter((item) => item._id !== productId);
        set({ items: updatedItems });
        get().updateTotals();
        toast.success("Item removed from cart");
      },

      // Update item quantity
      updateQuantity: (productId, quantity) => {
        const { items } = get();
        const updatedItems = items.map((item) =>
          item._id === productId
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        );
        set({ items: updatedItems });
        get().updateTotals();
      },

      // Clear cart
      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 });
        toast.success("Cart cleared");
      },

      // Update totals
      updateTotals: () => {
        const { items } = get();
        const total = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        set({ total, itemCount });
      },

      // Get cart item by ID
      getCartItem: (productId) => {
        const { items } = get();
        return items.find((item) => item._id === productId);
      },

      // Check if item is in cart
      isInCart: (productId) => {
        const { items } = get();
        return items.some((item) => item._id === productId);
      },
    }),
    {
      name: "cart-storage", // unique name for localStorage key
      partialize: (state) => ({ items: state.items }), // only persist items
    }
  )
);
