<script setup>
    import { reactive } from "vue"
    import {useRouter} from 'vue-router'
    import {useStore} from 'vuex'
    import { useToast } from 'vue-toastification';
    const toast=useToast()

    const store=useStore()
    const router=useRouter()    

    const apiClient=store.state.apiClient

    const state=defineProps({
        toggleUser:Function
    })

    const user=reactive({
      username:'',
      password:'',
    })

    function loginUser(){
      // console.log(user)
      if(user.username.length<5){
        toast.warning('User name should have atleast 5 letters')
      }else if(user.password.length<8){
        toast.warning('Password is too small, min 8 letters req')
      }else{
        store.dispatch('loginUser',{user,router})
      }
    }
</script>

<template>
    <form @submit.prevent="loginUser" class=" border bg-white  shadow-md shadow-grey-600  rounded-lg my-4 p-4 flex flex-col  gap- 3 ">
      <div class="mb-3 ">
        <label class="block text-gray-700 font-700 mb-3" for="name">Username</label>
        <input class="border rounded w-full py-2 px-3 mb-2" v-model="user.username"  type="text" name="" id="name">
      </div>
      <div class="mb-3 ">
        <label class="block text-gray-700 font-700 mb-3" for="password">Password</label>
        <input class="border rounded w-full py-2 px-3 mb-2" v-model="user.password"  type="password" name="" id="password">
      </div>
      <button class="rounded-xl bg-orange-500 text-white p-2" type="submit">Login</button>
      <p class="py-3 text-center hover:cursor-pointer pb-5" @click="state.toggleUser">Don't have an account? <span class="font-bold text-blue-500 ">Sign Up</span></p>
    </form>
</template>
