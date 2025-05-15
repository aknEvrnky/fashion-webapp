import React, { createContext, useState, useEffect, useContext } from 'react';
import CartService from '../services/CartService'; // Adjust path if necessary
import FeedbackService from '../services/FeedbackService'; // Import FeedbackService
import { products as staticProducts } from "../assets/assets"; // Assuming this is a fallback or static list
import { ToastContainer, toast } from 'react-toastify'; // Keep if used for other things
import { router } from '@inertiajs/react'; 

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    // State for the new API-driven cart
    const [cartItems, setCartItems] = useState({}); // From API: { productId: itemDetails, ... }
    const [itemCount, setItemCount] = useState(0);  // From API
    const [totalAmount, setTotalAmount] = useState(0.0); // From API
    const [isLoadingCart, setIsLoadingCart] = useState(true);

    // Existing state from your previous context (if still needed)
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const currency = '$';
    const delivery_fee = 10;
    // `products` from your old context, might be a static list or fetched differently.
    // If this is meant to be dynamic, it needs its own fetching logic.
    const [products, setProducts] = useState(staticProducts); 

    // Helper to update cart state from API response
    const updateCartStateFromResponse = (apiResponse) => {
        setCartItems(apiResponse.cart || {});
        setItemCount(apiResponse.count || 0);
        setTotalAmount(apiResponse.total || 0.0);
    };

    // Fetch initial cart on mount
    useEffect(() => {
        setIsLoadingCart(true);
        CartService.getCart()
            .then(response => {
                updateCartStateFromResponse(response); 
            })
            .catch(error => {
                console.error("ShopContext: Failed to fetch initial cart", error);
                updateCartStateFromResponse({ cart: {}, count: 0, total: 0.0 }); // Reset on error
            })
            .finally(() => {
                setIsLoadingCart(false);
            });
    }, []);

    // Cart modification functions using CartService
    const addToCartAPI = async (productId, options = {}) => {
        const { quantity = 1 } = options;

        try {
            setIsLoadingCart(true);
            const response = await CartService.addItem(productId, quantity);
            updateCartStateFromResponse(response);
            toast.success('Item added to cart!');

            // Send feedback after successful cart addition
            try {
                await FeedbackService.storeFeedback(FeedbackService.FeedbackType.ADD_TO_CART, productId, `Added to cart: quantity ${quantity}`);
                console.log('ShopContext: ADD_TO_CART feedback sent for product', productId);
            } catch (feedbackError) {
                console.error("ShopContext: Failed to send ADD_TO_CART feedback", feedbackError);
                // Optionally notify user or handle silently
            }

        } catch (error) {
            console.error("ShopContext: Failed to add item to cart", error);
            toast.error(error.message || 'Failed to add item.'); // Display error message from service or a generic one
        } finally {
            setIsLoadingCart(false);
        }
    };

    const removeFromCartAPI = async (productId) => {
        try {
            setIsLoadingCart(true);
            const response = await CartService.removeItem(productId);
            updateCartStateFromResponse(response);
            toast.info('Item removed from cart.');
        } catch (error) {
            console.error("ShopContext: Failed to remove item from cart", error);
            toast.error('Failed to remove item.');
        } finally {
            setIsLoadingCart(false);
        }
    };

    const updateCartItemQuantityAPI = async (productId, quantity) => {
        try {
            setIsLoadingCart(true);
            const response = await CartService.updateItem(productId, quantity);
            updateCartStateFromResponse(response);
            toast.success('Cart updated.');
        } catch (error) {
            console.error("ShopContext: Failed to update item quantity", error);
            toast.error('Failed to update cart.');
        } finally {
            setIsLoadingCart(false);
        }
    };

    const clearCartAPI = async () => {
        try {
            setIsLoadingCart(true);
            const response = await CartService.clearCart();
            updateCartStateFromResponse(response); 
            toast.info('Cart cleared.');
        } catch (error) {
            console.error("ShopContext: Failed to clear cart", error);
            toast.error('Failed to clear cart.');
        } finally {
            setIsLoadingCart(false);
        }
    };

    const contextValue = {
        // New API-driven cart state and functions
        cartItems,          // Object of items in cart from API
        itemCount,          // Total item count from API
        totalAmount,        // Total cart amount from API
        isLoadingCart,
        addToCart: addToCartAPI, // This now points to the updated function
        removeFromCart: removeFromCartAPI,
        updateCartItemQuantity: updateCartItemQuantityAPI,
        clearCart: clearCartAPI,

        // Existing context values (conditionally keep or refactor)
        products,           // Your existing products state
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        router,             // Inertia router
        // If you still need the old local cart logic for some reason, they can be added back,
        // but it's recommended to rely on the API-driven state (itemCount, totalAmount).
        // getCartCount: () => itemCount, // Example: if you want to keep the same function name
        // getCartAmount: () => totalAmount,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
            <ToastContainer /> {/* Ensure ToastContainer is rendered for notifications */}
        </ShopContext.Provider>
    );
};

export const useShopContext = () => {
    const context = useContext(ShopContext);
    if (context === undefined) {
        throw new Error('useShopContext must be used within a ShopContextProvider');
    }
    return context;
};
