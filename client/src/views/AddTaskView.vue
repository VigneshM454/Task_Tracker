<script setup>
    import TaskFormVue from "../components/TaskForm.vue";
    const data={
        title:'',
        desc:'',
        deadline: new Date(),
        type:'Personal'
    }
</script>

<template>
    <main class="bg-orange-100 p-3  min-h-[88vh] items-center gap-1 py-2 "> 
        <TaskFormVue :isEdit=false :data=data />
    </main>
</template>