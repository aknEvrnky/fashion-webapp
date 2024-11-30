<script>
import {Link} from "@inertiajs/vue3";

export default {
    name: "Pagination",
    props: {
        meta: {
            type: Object,
            required: true,
        },
        links: {
            type: Object,
            required: true,
        }
    },
    components: {
        Link,
    },
};
</script>

<template>
    <nav v-if="meta && links" role="navigation" aria-label="Pagination Navigation" class="flex items-center justify-between">
        <!-- For smaller screens -->
        <div class="flex justify-between flex-1 sm:hidden">
            <Link :href="links.prev"
                v-if="links.prev"
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:ring ring-gray-300 active:bg-gray-100 transition ease-in-out duration-150"
            >
                Previous
            </Link>
            <span
                v-else
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md"
            >
                Previous
            </span>

            <Link :href="links.next"
                v-if="links.next"
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:ring ring-gray-300 active:bg-gray-100 transition ease-in-out duration-150"
            >
                Next
            </Link>
            <span
                v-else
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md"
            >
                Next
            </span>
        </div>

        <!-- For larger screens -->
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-700 leading-5">
                    Showing <span class="font-medium">{{ meta.from }}</span> to
                    <span class="font-medium">{{ meta.to }}</span> of
                    <span class="font-medium">{{ meta.total }}</span> results
                </p>
            </div>

            <div>
                <span class="relative z-0 inline-flex shadow-sm rounded-md">
                    <!-- First Page -->
                    <Link :href="links.first"
                    v-if="links.first && meta.current_page !== 1"
                    class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:text-gray-400 focus:ring ring-gray-300 active:bg-gray-100 transition ease-in-out duration-150"
                    >
                        First
                    </Link>
                    <span
                      v-else
                      class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md"
                    >
                        First
                    </span>

                    <!-- Previous Page -->
                    <Link :href="links.prev"
                      v-if="links.prev"
                      class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:text-gray-400 focus:ring ring-gray-300 active:bg-gray-100 transition ease-in-out duration-150"
                    >
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fill-rule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            />
                        </svg>
                    </Link>
                    <span
                      v-else
                      class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300"
                    >
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fill-rule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            />
                        </svg>
                    </span>

                    <!-- Page Links -->
                    <template v-for="link in meta.links" :key="link.label">
                        <Link :href="link.url"
                              v-if="link.url"
                              v-html="link.label"
                            :class="{
                            'text-gray-700 bg-white border-gray-300': !link.active,
                            'text-gray-500 bg-gray-100': link.active,
                          }"
                            class="relative inline-flex items-center px-4 py-2 text-sm font-medium border hover:text-gray-500 focus:ring ring-gray-300 active:bg-gray-100 transition ease-in-out duration-150"
                        >
                        </Link>
                    </template>

                    <!-- Next Page -->
                    <Link :href="links.next"
                        v-if="links.next"
                        class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:text-gray-400 focus:ring ring-gray-300 active:bg-gray-100 transition ease-in-out duration-150"
                    >
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fill-rule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                            />
                        </svg>
                    </Link>
                    <span
                        v-else
                        class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md"
                    >
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fill-rule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                </span>
            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>
