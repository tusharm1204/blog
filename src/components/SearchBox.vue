
<script setup>
import {defineEmits} from 'vue';

const emit = defineEmits(['search']);

const debounceSearch = (event) => {
    emit('search', event.target.value)
}

</script>
<template>
    <div>
        <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-slate-100 overflow-hidden">
            <div class="grid place-items-center h-full w-12">
            </div>

            <input @input="debounceSearch"
                class="peer h-full w-full outline-none text-sm bg-slate-100 text-gray-700 bg-s pr-2 border-none" type="text" id="search"
                placeholder="Search something.." />
        </div>
    </div>
</template>
    
<script>

</script>