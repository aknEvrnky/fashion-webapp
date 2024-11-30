<script>
import AppLayout from "@/Layouts/AppLayout.vue";
import {Head} from "@inertiajs/vue3";
import CategoryBox from "@/Components/Categories/CategoryBox.vue";

export default {
    name: "Index",
    components: {
        CategoryBox,
        Head,
    },
    layout: AppLayout,
    props: {
        masterCategories: Object,
    }
}
</script>

<template>
    <Head title="Master Categories" />
    <div class="container mx-auto py-6">
        <h1 class="text-2xl font-black text-center mb-8">Master Categories</h1>
        <div class="grid grid-cols-3 gap-4">
            <CategoryBox v-for="category in masterCategories.data" :key="category.id" :title="category.attributes.title" :link="category.links.self" :description="category.attributes.description" />
        </div>
    </div>
</template>

<style scoped>

</style>
