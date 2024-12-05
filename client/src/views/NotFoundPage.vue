<script setup>
    import {RouterLink} from 'vue-router'
</script>

<template>
    <div class="p-3 bg-orange-100 min-h-[85vh] flex flex-col gap-3 justify-center items-center">
        <i class="pi pi-exclamation-triangle text-yellow-500 text-7xl"></i>
        <h1 class="text-4xl mb-4 font-bold">404 Not Found</h1>
        <p class="text-xl mb-5">This page does not exist</p>
        <RouterLink to="/" class="text-white py-3 px-5 bg-orange-700 hover:bg-orange-900 rounded-md">
           Go Back 
        </RouterLink>
    </div>
</template>
