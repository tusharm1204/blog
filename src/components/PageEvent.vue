<script setup>
import { ref } from 'vue';
import defineEmits from "vue"

const numbers = ref([10, 15, 20]);
// const value = ref();
const emit = defineEmits(['onChange']);

const onChange = (event) => {
    emit('onChange', event.target.value);
};
</script>

<template>
    <div class="mt-2 py-1 px-1 min-w-[25px]">
        <label for="number" class=" mx-2 text-[13px] font-medium text-[#333] dark:text-white  items-center inline-flex">Show
            <select name="number" @change="onChange" id="number" class=" bg-gray-50 border-2 border-gray-300 mx-[2px] text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500">
                <option v-for="number in numbers" :key="number" :value="number">{{ number }}</option>
            </select>
            entries</label>
    </div>
</template>
