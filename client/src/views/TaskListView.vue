<script setup>
    import { onMounted ,inject, computed} from "vue";
    import TaskVue from "../components/Task.vue";
    import axios from "axios";
    import { useStore } from 'vuex'
    import { useRouter } from "vue-router";
    
    const router=useRouter()
    const store=useStore()
    const username=computed(()=>store.state.username)
    const tasks= computed(()=>store.state.tasks) //inject('tasks')

    onMounted(async()=>{
        if(username.value==''){
            store.dispatch('getUserData',{router})
        }else{
            console.log('data already exist');
        }
    })
</script>

<template>
    <div class="p-3 bg-orange-100 min-h-[80vh] flex flex-col gap-3">
        <h1 class="text-bold text-orange-700 font-bold text-xl">Hello {{store.state.username}}</h1>
        <div v-if="tasks.length>0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3  max-h-[80vh]  overflow-y-auto ">
            <div v-for="task,index in tasks" :key="task._id" class="bg-orange-500 max-h-[fit-content]">
                <TaskVue  :task=task :index=index />
            </div>
        </div>
        <div v-else class="flex items-center justify-center min-h-[70vh] ">
            <h1 class="text-2xl">No task so far, plese add some</h1>
        </div>
    </div>
</template>