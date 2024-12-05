<script setup>
  import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
  import axios from 'axios';
  import {useStore} from 'vuex'
  import { provide } from 'vue';
  import {computed} from 'vue'
  const store=useStore()
  const router=useRouter()
  const username= computed(()=>store.state.username)
  console.log(username.value);
  function isActiveLink(link){
    const route=useRoute()
    return link===route.path
  }


  function logoutUser(){
    console.log('logoutUser executed');
    sessionStorage.removeItem('userToken')
    store.commit('resetState')
    router.push('/')
  }

</script>

<template>
  <div>
      <header class="min-w-[300px]">
    <div class="row p-3 bg-orange-500 flex flex-row items-center justify-between">
      <h1 class="text-center  font-bold text-2xl sm:text-4xl " >Task Tracker</h1>
      <ul class="flex flex-row  max-w-[230px] sm:min-w-[300px] items-center justify-around  p-2 text-center gap-2 sm:gap-4 font-bold text-white">
        <RouterLink to="/tasks" :class="'p-2 rounded-md py-3 text-sm '+(isActiveLink('/tasks')?'bg-orange-900  ':'bg-orange-500 hover:bg-gray-500')">Task Page</RouterLink>
        <RouterLink to="/add-tasks" :class="'p-2 rounded-md py-3 text-sm '+(isActiveLink('/add-tasks')?'bg-orange-900  ':'bg-orange-500 hover:bg-gray-500')">Add Task</RouterLink>
      </ul>
       <div v-if="useRoute().name!=='login' && useRoute().name!=='404-page'" 
          @click="logoutUser"
          class="p-2 rounded-md py-3 bg-white hover:bg-black  d-flex items-center justify-center">
          <i  class="pi pi-sign-out text-orange-900 text-xl"></i>
      </div>

    </div>
  </header>
  <RouterView/>

  </div>
</template>

<style >

</style>