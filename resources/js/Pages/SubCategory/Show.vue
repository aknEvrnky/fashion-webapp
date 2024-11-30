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
        subCategory: Object,
        articleTypes: Object
    },
}
</script>

<template>
    <Head :title="subCategory.data.attributes.title" />

    <div class="container mx-auto py-6">
        <h1 class="text-2xl font-black text-center mb-8">{{ subCategory.data.attributes.title }}</h1>
        <div class="grid grid-cols-3 gap-4">
            <CategoryBox v-for="articleType in articleTypes.data" :key="articleType.id" :title="articleType.attributes.title" :link="articleType.links.self" :description="articleType.attributes.description" />
        </div>
    </div>

</template>

<style scoped>

</style>
