<script setup>
    import { computed, inject, onBeforeMount, onMounted } from "vue";
    import {useStore} from 'vuex'
    import { useRoute,useRouter } from "vue-router";
    import TaskFormVue from "../components/TaskForm.vue";
    const route=useRoute()

    const store=useStore()
    const taskArr= computed(()=>store.state.tasks)  //inject('tasks')

    let task=taskArr.value[route.params.id]

    onMounted(()=>{
        if(!task){
            const router=useRouter()
            router.push('/tasks')
        }
    })

</script>

<template>
    <main class="bg-orange-100 p-3  min-h-[88vh] items-center gap-1 py-2 "> 
        <TaskFormVue v-if="task" :isEdit=true :data=task />
        <div v-else class="p3 text-center">Loading ...</div>
    </main>
</template>