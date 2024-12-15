<script setup>
    import { reactive, inject, computed } from "vue"
    import {useRoute, useRouter } from 'vue-router'
    import {useStore} from 'vuex'
    import { useToast } from 'vue-toastification';
    const toast=useToast()

    const store=useStore()
    const router= useRouter()

    const state=defineProps({
        toggleUser:Function
    })

    const isDisabled=computed(()=>store.state.isDisabled)

    const user=reactive({
      username:'',
      password:'',
      confirmpassword:''
    })

    function createUser(){
      // console.log(user)
      if(user.username.length<5){
        toast.warning('User name should have atleast 5 letters')
      }else if(user.password.length<8){
          toast.warning('Password is too small, min 8 letters req')
      }else if(user.password!==user.confirmpassword){
        toast.warning('password and confirm pasword not same')
      }
      else{
        // console.log('ok ok')
        store.commit('setDisable',true)
        store.dispatch('signupUser',{user,router})
      }
    }

</script>

<template>
    <form @submit.prevent="createUser" class="border bg-white  shadow-md shadow-grey-600  rounded-lg my-4 p-4 flex flex-col gap- 3 ">
      <div class="mb-3 ">
        <label class="block text-gray-700 font-700 mb-3" for="name">Username</label>
        <input class="border rounded w-full py-2 px-3 mb-2" type="text" name="" id="name" v-model="user.username">
      </div>
      <div class="mb-3 ">
        <label class="block text-gray-700 font-700 mb-3" for="password">Password</label>
        <input class="border rounded w-full py-2 px-3 mb-2" type="password" name="" id="password" v-model="user.password">
      </div>
      <div class="mb-3 ">
        <label class="block text-gray-700 font-700 mb-3" for="password2">Confirm Password</label>
        <input class="border rounded w-full py-2 px-3 mb-2" type="password" name="" id="password2" v-model="user.confirmpassword">
      </div>
      <button :disabled="isDisabled" class="rounded-xl bg-orange-500 text-white p-2" type="submit">SignUp</button>
      <p class="py-3 text-center hover:cursor-pointer pb-5" @click="state.toggleUser">Already have a account <span class="font-bold text-blue-500 ">Login</span></p>
    </form>
</template>
