import { createContext, useState, useEffect } from "react"; // ✅ useState ve useEffect doğru import edildi
import { products } from "../assets/assets";
import { ToastContainer, toast } from 'react-toastify';
import { router } from '@inertiajs/react'; // Import Inertia router
// TODO: Remove this import - useNavigate from react-router-dom is not needed with Inertia.
// import { useNavigate } from "react-router-dom"; // Commented out: Not needed with Inertia

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    // TODO: Replace with Inertia navigation if context needs to trigger navigation. useNavigate from react-router-dom was removed.
    // const navigate = useNavigate(); // Commented out: Not needed with Inertia. TODO: Replace with Inertia navigation if context needs to trigger navigation.

    const addToCart = async (itemId, size) => {
        
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};  // ✅ Buradaki else bloğu doğru şekilde düzeltildi
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData); // ✅ setCartItems() içine veri verildi (önceden boş bırakılmıştı)
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                try {
                    if (cartItems[itemId][size] > 0) {
                        totalCount += cartItems[itemId][size]; 
                        // ✅ BURASI DÜZELTİLDİ:
                        // eskiden yanlışlıkla cartItems[items][items][item] yazılmıştı!
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async(itemId,size,quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

    }

    const getCartAmount =  () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                        
                    }
                
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        router // Provide Inertia router via context
    };

    // TODO: Ensure all functions within ShopContext that previously used navigate (from react-router-dom) are updated or marked with specific TODOs for Inertia navigation.

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
