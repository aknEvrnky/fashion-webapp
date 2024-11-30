<script>
import {Link} from "@inertiajs/vue3";
import Stars from "@/Components/Products/Stars.vue";

export default {
    name: "ProductBox",
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    components: {
        Stars,
        Link
    },
    methods: {
        addToCart() {
            alert('Not implemented yet');
        }
    }
}
</script>

<template>


    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow py-3 flex flex-col justify-between">
        <Link :href="route('products.show', product.id)">
            <img class="p-8 rounded-t-lg" :src="product.attributes.imageUrl" alt="product image" />
        </Link>
        <div class="px-5 pb-5">
            <Link :href="route('products.show', product.id)">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900">{{ product.attributes.title }}</h5>
            </Link>
            <Stars />
            <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900">${{product.attributes.price}}</span>
                <button @click="addToCart()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center:bg-blue-700:ring-blue-800">Add to cart</button>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>
