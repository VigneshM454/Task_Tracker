<script setup>
    import { reactive,ref, inject } from 'vue'
    import SignupVue from '../components/Signup.vue'
    import LoginVue from './../components/Login.vue'
    import LoginImg from '/src/assets/productivity-2.avif'

    const isNewUser=ref(false)
    // const apiClient=inject('apiClient');

    function toggleUser(){
        isNewUser.value=!isNewUser.value
    }

    
</script>

<template>
    <main class="bg-orange-100 p-3 grid grid-cols-1 grid-rows-1 sm:grid-cols-2 items-center min-h-[88vh] gap-1 py-2"> 
        <div class="imgDiv p-1  px-3 ">
        <img :src="LoginImg" alt="" class="rounded-xl ">
        </div>
        
        <SignupVue :toggleUser=toggleUser v-if='isNewUser' />
        <LoginVue :toggleUser=toggleUser v-else />
  </main>

</template>