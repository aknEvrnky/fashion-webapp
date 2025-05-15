<?php

namespace App\Cart;

use App\Models\Product; // Assuming you have a Product model
use Illuminate\Support\Facades\Session;

class CartService
{
    protected string $sessionKey = 'cart';

    /**
     * Get all items from the cart.
     *
     * @return array
     */
    public function get(): array
    {
        return Session::get($this->sessionKey, []);
    }

    /**
     * Add an item to the cart or update its quantity.
     *
     * @param int $productId
     * @param int $quantity
     * @return array The updated cart items.
     */
    public function add(int $productId, int $quantity = 1): array
    {
        $cart = $this->get();
        $product = Product::find($productId); // Fetch product details

        if (!$product) {
            // Or throw an exception, or return an error status
            return $cart;
        }

        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] += $quantity;
        } else {
            $cart[$productId] = [
                'id' => $productId,
                'product_id' => $product->id,
                'name' => $product->title, // Assuming your Product model has a title
                'price' => $product->price, // Assuming current price
                'quantity' => $quantity,
                'image' => $product->imageUrl(), // Assuming your Product model has an imageUrl
            ];
        }

        if ($cart[$productId]['quantity'] <= 0) {
            unset($cart[$productId]);
        }

        Session::put($this->sessionKey, $cart);
        return $cart;
    }

    /**
     * Remove an item from the cart.
     *
     * @param int $productId
     * @return array The updated cart items.
     */
    public function remove(int $productId): array
    {
        $cart = $this->get();
        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            Session::put($this->sessionKey, $cart);
        }
        return $cart;
    }

    /**
     * Update the quantity of an item in the cart.
     *
     * @param int $productId
     * @param int $quantity
     * @return array The updated cart items.
     */
    public function update(int $productId, int $quantity): array
    {
        $cart = $this->get();
        if (isset($cart[$productId])) {
            if ($quantity > 0) {
                $cart[$productId]['quantity'] = $quantity;
            } else {
                unset($cart[$productId]);
            }
            Session::put($this->sessionKey, $cart);
        }
        return $cart;
    }

    /**
     * Clear the entire cart.
     *
     * @return void
     */
    public function clear(): void
    {
        Session::forget($this->sessionKey);
    }

    /**
     * Get the total number of items in the cart.
     *
     * @return int
     */
    public function count(): int
    {
        $cart = $this->get();
        $count = 0;
        foreach ($cart as $item) {
            $count += $item['quantity'];
        }
        return $count;
    }

    /**
     * Get the total price of all items in the cart.
     *
     * @return float
     */
    public function total(): float
    {
        $cart = $this->get();
        $total = 0.0;
        foreach ($cart as $item) {
            $total += $item['price'] * $item['quantity'];
        }
        return $total;
    }
}
