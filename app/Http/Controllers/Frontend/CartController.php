<?php

namespace App\Http\Controllers\Frontend;

use App\Cart\CartService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CartController extends Controller
{
    protected CartService $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    /**
     * Display the contents of the cart.
     */
    public function index()
    {
        return response()->json([
            'cart' => $this->cartService->get(),
            'count' => $this->cartService->count(),
            'total' => $this->cartService->total(),
        ]);
    }

    public function basket()
    {
        return Inertia::render('Cart', [
            'cart' => $this->cartService->get(),
            'count' => $this->cartService->count(),
            'total' => $this->cartService->total(),
        ]);
    }

    /**
     * Add an item to the cart.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|integer|exists:products,id', // Ensure product exists
            'quantity' => 'sometimes|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $productId = $request->input('product_id');
        $quantity = $request->input('quantity', 1);

        $this->cartService->add($productId, $quantity);

        return response()->json([
            'message' => 'Item added to cart.',
            'cart' => $this->cartService->get(),
            'count' => $this->cartService->count(),
            'total' => $this->cartService->total(),
        ]);
    }

    /**
     * Update an item's quantity in the cart.
     */
    public function update(Request $request, $productId) // Using route model binding implicitly for $productId if it's an ID
    {
        $validator = Validator::make($request->all(), [
            'quantity' => 'required|integer|min:0', // min:0 allows removing item by setting qty to 0
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $quantity = $request->input('quantity');

        // Ensure productId is an integer if not using route model binding for a model
        $validatedProductId = filter_var($productId, FILTER_VALIDATE_INT);
        if ($validatedProductId === false) {
             return response()->json(['errors' => ['product_id' => 'Invalid product ID.']], 422);
        }

        $this->cartService->update($validatedProductId, $quantity);

        return response()->json([
            'message' => 'Cart updated.',
            'cart' => $this->cartService->get(),
            'count' => $this->cartService->count(),
            'total' => $this->cartService->total(),
        ]);
    }

    /**
     * Remove an item from the cart.
     */
    public function destroy($productId) // Using route model binding implicitly for $productId if it's an ID
    {
        $validatedProductId = filter_var($productId, FILTER_VALIDATE_INT);
        if ($validatedProductId === false) {
             return response()->json(['errors' => ['product_id' => 'Invalid product ID.']], 422);
        }

        $this->cartService->remove($validatedProductId);

        return response()->json([
            'message' => 'Item removed from cart.',
            'cart' => $this->cartService->get(),
            'count' => $this->cartService->count(),
            'total' => $this->cartService->total(),
        ]);
    }

    /**
     * Clear the entire cart.
     */
    public function clear()
    {
        $this->cartService->clear();
        return response()->json([
            'message' => 'Cart cleared.',
            'cart' => [],
            'count' => 0,
            'total' => 0.0,
        ]);
    }
}
