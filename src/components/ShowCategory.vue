<template>
    <Navbar @search="search"/>
    <section class="mt-5 w-[100%] md:w-[100%]  md:justify-end xl:justify-end justify-center sticky bottom-0">
      <Carousel :items-to-show="9">
        <Slide v-for="category in categories" :key="category">
        <div @click="changeCategory(category.id)"> 
            <div>
              <router-link :to="`/categories/${category.id}/blogs`">
                <img :src="category.image" alt="" class="rounded-full w-[50px] h-[40px] md:w-[145px] xl:w-[40px] lg:w-[145px] border-2 md:h-[145px] lg:h-[145px] xl:h-[40px]">
                <div class="mt-3 text-base text-center cursor-pointer">
                  <h1 class="text-xl dark:text-gray-400 hover-underline-animation text-black"  :class="category.id == currentActiveId ? 'active' :''">
                    {{ category.name }}
                  </h1>
                </div>
              </router-link>
            </div>
             </div>
      </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
</section>
    <section class="mt-5 justify-center flex">
      <template v-if="Blogs.length > 0">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 md:grid-cols-2">
      <div v-for="blogs in Blogs" :key="blogs"  class="main mt-5 hover:text-white-500 font-semibold text-base grid-container bg-white shadow-md rounded-lg"> 
          <div >
            <router-link :to="'/blogs/'+blogs.id">
                        <img :src="blogs.image" alt="" class=" w-[330px] h-[230px] object-contain">
            </router-link>
          </div>
          <div class="text-base text-center cursor-pointer mt-2 justify-content">
            <div class="flex justify-between items-center mx-7 mt-1">
                <span class="text-xs dark:text-gray-400 flex gap-1"><i class="fa-solid fa-user h-4 w-4"></i>{{ blogs.user_name}}</span>
                <span class="text-xs dark:text-gray-400 flex gap-1"><i class="fa-solid fa-calendar-days h-4 w-4"></i>{{ blogs.date }}</span>
            </div>
            <div class="text-md text-gray-900 font-bold flex justify-center mt-3 mb-3" v-html="blogs.title"></div>

          </div> 
      </div> 
    </div>
      </template> 
      <template v-else>
        <div class="text-3xl border-b border-black/100 mt-5 flex justify-center">
          <h1>Blog data not found</h1>
        </div>
      </template>
      
    </section>

    <div class="mt-64" @click="changeCategory">
    <Footer />
</div>
</template>

<script setup>
import Navbar from '../components/WebPage/Navbar.vue';
import Footer from '../components/WebPage/Footer.vue';
import { ref,onMounted  } from 'vue';
import axios  from "axios";
import {useRoute } from 'vue-router';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
const route = useRoute();



let categories = ref([]);
let Blogs = ref({});
let currentActiveId = ref(null);

onMounted(() => {
    getBlog(1);
    getCategories(1); 
});

const search = (value) => {
  getBlog(1,value)
}

const getBlog = (page,search = '') => {
    axios.get(`https://blog-api-dev.octalinfotech.com/api/categories/${route.params.id}/blogs?page=${page}&search=${search}` ,{

})
.then((res) =>{
  currentActiveId.value = route.params.id;
    Blogs.value = res.data.data.data
    console.log(route.params.id);
}).catch((error)=>{
console.log(error);
});
}




// const showBlog = (page,search = '') => {
//     axios.get(`https://blog-api-dev.octalinfotech.com/api/categories/${route.params.id}/blogs?page=${page}&search=${search}`)
// .then((res) =>{
//   currentActiveId.value = route.params.id;
//     Blogs.value = res.data.data.data
//     console.log(route.params.id);
// }).catch((error)=>{
// console.log(error);
// });
// }



const changeCategory  = () => {
  axios.get(`https://blog-api-dev.octalinfotech.com/api/categories/${route.params.id}/blogs`)
  .then((res) =>{
    currentActiveId.value = route.params.id;
    Blogs.value = res.data.data.data;
}).catch((error)=>{
console.log(error);
})
}

// const changeName  = () => {
//   axios.get(`https://blog-api-dev.octalinfotech.com/api/categories/${route.params.id}/blogs`)
//   .then((res) =>{
//     Blogs.value = res.data.data.data;
//     currentActiveId.value = route.params.id;
// }).catch((error)=>{
// console.log(error);
// })
// }


const getCategories = () =>{

axios.get('https://blog-api-dev.octalinfotech.com/categories?page=1&search' ,{
   headers : {
    token: '7ELX2CnkfqWpipzXNB5QV9sxSf4dPk'   
   }
})
.then((res) =>{
    categories.value = res.data.data.data;
}).catch((error)=>{
console.log(error);
})
}


</script>

<style>
.cell-breakword {
    word-break: break-all;
    max-width:300px;
}
.active{
  border-bottom:3px solid black;
  color: red !important;
}


</style>