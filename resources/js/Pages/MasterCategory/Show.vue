<script>
import AppLayout from "@/Layouts/AppLayout.vue";
import {Head} from "@inertiajs/vue3";
import CategoryBox from "@/Components/Categories/CategoryBox.vue";

export default {
    name: "Show",
    components: {
        CategoryBox,
        Head,
    },
    layout: AppLayout,
    props: {
        masterCategory: Object,
        subCategories: Object
    },
}
</script>

<template>
    <Head :title="masterCategory.data.attributes.title" />

    <div class="container mx-auto py-6">
        <h1 class="text-2xl font-black text-center mb-8">{{ masterCategory.data.attributes.title }}</h1>
        <div class="grid grid-cols-3 gap-4">
            <CategoryBox v-for="category in subCategories.data" :key="category.id" :title="category.attributes.title" :link="category.links.self" :description="category.attributes.description" />
        </div>
    </div>

</template>

<style scoped>

</style>
