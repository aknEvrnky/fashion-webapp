import React, { createContext, useState, useEffect, useContext } from 'react';
import CartService from '../services/CartService';
import FeedbackService from '../services/FeedbackService';
import { products as staticProducts } from "../assets/assets";
import { ToastContainer, toast } from 'react-toastify';
import { router } from '@inertiajs/react';

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children, auth }) => {
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
    const [products, setProducts] = useState(staticProducts);

    // Debug auth data
    useEffect(() => {
        console.log('Auth in ShopContext:', auth);
    }, [auth]);

    const updateCartStateFromResponse = (apiResponse) => {
        setCartItems(apiResponse.cart || {});
        setItemCount(apiResponse.count || 0);
        setTotalAmount(apiResponse.total || 0.0);
    };

    useEffect(() => {
        setIsLoadingCart(true);
        CartService.getCart()
            .then(response => {
                updateCartStateFromResponse(response);
            })
            .catch(error => {
                console.error("ShopContext: Failed to fetch initial cart", error);
                updateCartStateFromResponse({ cart: {}, count: 0, total: 0.0 });
            })
            .finally(() => {
                setIsLoadingCart(false);
            });
    }, []);

    const addToCartAPI = async (productId, options = {}) => {
        const { quantity = 1 } = options;

        try {
            setIsLoadingCart(true);
            const response = await CartService.addItem(productId, quantity);
            updateCartStateFromResponse(response);
            toast.success('Item added to cart!');

            try {
                await FeedbackService.storeFeedback(FeedbackService.FeedbackType.ADD_TO_CART, productId, `Added to cart: quantity ${quantity}`);
                console.log('ShopContext: ADD_TO_CART feedback sent for product', productId);
            } catch (feedbackError) {
                console.error("ShopContext: Failed to send ADD_TO_CART feedback", feedbackError);
            }

        } catch (error) {
            console.error("ShopContext: Failed to add item to cart", error);
            toast.error(error.message || 'Failed to add item.');
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
        cartItems,
        itemCount,
        totalAmount,
        isLoadingCart,
        addToCart: addToCartAPI,
        removeFromCart: removeFromCartAPI,
        updateCartItemQuantity: updateCartItemQuantityAPI,
        clearCart: clearCartAPI,
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        router,
        auth,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
            <ToastContainer />
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
