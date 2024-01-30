<template>
    <Navbar />
    <section class="mt-5 w-[100%] md:w-[100%]  md:justify-end xl:justify-end justify-center sticky bottom-0">
      <Carousel :items-to-show="11" :wrap-around="true"  >
        <Slide v-for="category in categories" :key="category">
        <div @click="changeCategory(category.id)"> 
            <div>
              <router-link :to="`/categories/${category.id}/blogs`">
                <img :src="category.image" alt="" class="rounded-full w-[50px] h-[40px] md:w-[145px] xl:w-[40px] lg:w-[145px] border-2 md:h-[145px] lg:h-[145px] xl:h-[40px]">
                <div class="mt-3 text-base text-center cursor-pointer">
                  <h1 class="text-xl dark:text-gray-400 hover-underline-animation text-black"  :class="category.id === currentActiveId ? 'active' :''">
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
        <div v-for="blogs in Blogs" :key="blogs" class="main mt-5 hover:text-white-500 font-semibold text-base grid-container"> 
          <div >
            <router-link :to="'/blogs/'+blogs.id">
                        <img :src="blogs.image" alt="" class=" w-[330px] h-[230px] object-contain">
        
          <div class="text-base text-center cursor-pointer mt-2 justify-content">
              <h1 class="d-flex justify-content mt-3 hover-underline-animation">
              {{ blogs.name }}
            </h1>
            <div class="description cell-breakword truncate" style="" v-html="blogs.description"></div>
         <div class="flex justify-center gap-2 items-center">
          <div>
            <img :src="blogs.user_image" alt="" class="w-8 h-8 rounded-full">
          </div>
              <div class="flex gap-3">
                <span class="text-xs dark:text-gray-400 flex">{{ blogs.user_name}}</span>
                <span class="text-xs dark:text-gray-400 date">   {{ blogs.date }}</span>
              </div>
            </div>
            <span class="text-xs dark:text-gray-400">{{ blogs.slug }}</span>
          </div> 
		</router-link>
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

<div class="mt-64">
    <Footer />
</div>
</template>

<script setup>
import Navbar from '../components/WebPage/Navbar.vue';
import Footer from '../components/WebPage/Footer.vue';
import { ref,onMounted  } from 'vue';
import axios  from "axios";
import {useRouter } from 'vue-router';
// import { useStore } from 'vuex';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
// import { useToast } from "vue-toastification";
// const  toast = useToast();
const router = useRouter();



let categories = ref([]);
let Blogs = ref({});
let currentActiveId = ref(null);

onMounted(() => {
    // getBlog(1);
    getCategories(1);    
    // getBlog(1)
});

const getBlog = () => {
    let data = localStorage.getItem("user");
  data = JSON.parse(data);
  let token = data.token;
    console.log(router.params.id);
    axios.get(`https://blog-api-dev.octalinfotech.com/api/categories/${router.params.id}/blogs` ,{
        headers: {
        Authorization: `Bearer ${token}`,
      },
})
.then((res) =>{
    Blogs.value = res.data.data.data
    console.log(res);
}).catch((error)=>{
console.log(error);
});
}

const changeCategory  = (id) => {
    let data = localStorage.getItem("user");
  data = JSON.parse(data);
  let token = data.token;
  currentActiveId.value = id;
  console.log(id);
  axios.get(`https://blog-api-dev.octalinfotech.com/api/categories/${id}/blogs` ,{
    headers: {
        Authorization: `Bearer ${token}`,
      },
})
.then((res) =>{
    Blogs.value = res.data.data.data
}).catch((error)=>{
console.log(error);
})
}


const getCategories = () =>{

axios.get('https://blog-api-dev.octalinfotech.com/categories?page=1&search' ,{
   headers : {
    token: '7ELX2CnkfqWpipzXNB5QV9sxSf4dPk'   
   }
})
.then((res) =>{
    categories.value = res.data.data.data;
    getBlog(1);
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

.cell-breakword:hover {
    overflow: visible;
    white-space: normal;
    height: auto;
}
.active{
  border-bottom:3px solid black;
  color: red;
}
</style>