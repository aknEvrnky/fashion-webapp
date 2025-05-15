import React from 'react';
import { useShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from "../assets/assets";
import CartTotal from '../components/CartTotal';
import AppLayout from '../layouts/AppLayout';
import {Head, usePage} from "@inertiajs/react";

export const Cart = () => {
  const { 
    cartItems,
    currency, 
    updateCartItemQuantity, 
    removeFromCart, 
    router, 
    isLoadingCart 
  } = useShopContext();

  const cartItemEntries = Object.values(cartItems || {});

  if (isLoadingCart && !Object.keys(cartItems || {}).length) {
    return (
      <AppLayout>
        <Head title="Cart" />
        <div className='border-t pt-14'>
          <Title text1={'YOUR'} text2={'CART'}/>
          <p className="text-center py-10">Loading cart...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Head title="Cart" />
      <div className='border-t pt-14'>
        <div className=' text-2x1 mb-3'>
          <Title text1={'YOUR'} text2={'CART'}/>
        </div>
        <div>
          {cartItemEntries.length === 0 && !isLoadingCart ? (
            <p className="text-center py-10">Your cart is empty.</p>
          ) : (
            cartItemEntries.map((item, index) => {
              if (!item || typeof item.quantity === 'undefined') return null;

              return (
                <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[1fr_auto_auto] sm:grid-cols-[4fr_2fr_auto_auto] items-center gap-4'>
                  <div className='flex items-start gap-6'>
                    <img className='w-16 sm:w-20' src={item.image || assets.placeholder_image} alt={item.name || "Product Image"} />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{item.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{parseFloat(item.price).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <input 
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (!isNaN(newQuantity) && newQuantity >= 1) {
                        updateCartItemQuantity(item.id, newQuantity);
                      } else if (e.target.value === '' || newQuantity <= 0) {
                      }
                    }}
                    className='border max-w-16 sm:max-w-20 px-1 sm:px-2 py-1' 
                    type="number" 
                    min={1} 
                    value={item.quantity}
                  />
                  <p className='hidden sm:block'>{currency}{(item.price * item.quantity).toFixed(2)}</p>
                  <img 
                    onClick={() => removeFromCart(item.id)} 
                    className='w-4 mr-4 sm:w-5 cursor-pointer justify-self-end' 
                    src={assets.bin_icon} 
                    alt="Remove item" 
                  />
                </div>
              );
            })
          )}
        </div>
        {cartItemEntries.length > 0 && (
          <div className='flex justify-end my-20'>
            <div className='w-full sm:w-[450px]'>
              <CartTotal/>
              <div className='w-full text-end'>
                <button onClick={()=>router.visit('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3 ' >PROCEED TO CHECKOUT</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}

export default Cart;
