<script>
import CategoryBox from "@/Components/Categories/CategoryBox.vue";
import {Head} from "@inertiajs/vue3";
import AppLayout from "@/Layouts/AppLayout.vue";
import Pagination from "@/Components/Pagination.vue";
import ProductBox from "@/Components/Products/ProductBox.vue";

export default {
    name: "Show",
    components: {
        ProductBox,
        Pagination,
        CategoryBox,
        Head,
    },
    layout: AppLayout,
    props: {
        articleType: Object,
        products: Object
    },
}
</script>

<template>
    <Head :title="articleType.data.attributes.title" />

    <div class="container mx-auto py-6">
        <h1 class="text-2xl font-black text-center mb-8">{{ articleType.data.attributes.title }}</h1>
        <div class="grid grid-cols-3 gap-4">
            <ProductBox v-for="product in products.data" :key="product.id" :product="product" />
        </div>
    </div>

    <div class="container mx-auto">
        <Pagination :links="products.links" :meta="products.meta" />
    </div>

</template>

<style scoped>

</style>
