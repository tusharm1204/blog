<template>
<Navbar />
    <section class="container max-w-6xl p-6 mx-auto md:space-y-6 space-y-16">
      <div class="flex justify-end items-center">
            <router-link to="/" >
            <a  class="inline-flex text-sm bg-[#271f1f] text-white items-center font-semibold w-16 p-2"><button class=""></button> <span><i class="fa-solid fa-arrow-left w-5"></i></span>
             <span>Back</span></a>
           </router-link>
        </div>
        <h2 class="text-4xl font-bold flex justify-start">{{ blog.title }}</h2>
        <p class="items-center gap-3 justify-start flex">By<img class="h-8 w-8 flex-shrink-0 rounded-full object-cover" :src="blog.image">
            {{ blog.user_name }} on 
            <span class="taghover text-sm text-gray-400 cursor-pointer">{{ blog.date }}
            <h2 class="px-2 py-1 text-xs bg-slate-100 border-[0.5px] border-black hidden absolute text-black">{{ blog.date }}</h2></span>
        </p>
        <div class="flex gap-2 border-b-[1px] py-5 flex-wrap">
            <button class="gap-2 inline-flex items-center px-8 text-white text-sm py-1 bg-[#3059b0]"> <i class="fa-brands fa-facebook-f"></i>SHARE</button>
            <button class="gap-2 inline-flex items-center px-8 text-white text-sm py-1 bg-[#55acef]"> <i class="fa-brands fa-twitter"></i>SHARE</button>
            <span> <EllipsisVerticalIcon /></span>
        </div>
        <div class="flex justify-between gap-10">
            <p v-html="blog.description" class="w-[80%]"></p>
            <img :src="blog?.image" alt="" class="object-cover rounded w-[40%] h-[4 00px] lg:col-span-7 dark:bg-gray-500">

        </div>

        <div class="flex border-b-[1px] py-4 items-center gap-4">
          <img :src="blog.user_image" alt="" class="h-[74px] w-[74px]  rounded-full object-cover mt-1">
          <div class="flex flex-col gap-1">
            <span class="taghover text-lg font-medium cursor-pointer">{{ blog.user_name }}
            <h2 class="px-3 py-1 text-xs bg-slate-100  border-[0.5px] border-black hidden absolute text-black">Author Profile</h2>
            </span>
            <span class="text-sm dark:text-gray-400">{{ blog.title }}</span>
          </div> 

        </div>


        <h2 class="font-bold text-2xl  pb-2">RELATED POSTS</h2>
        <section class="container mt-5 justify-center flex">
        <div class="flex gap-2 pb-4">      

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 md:grid-cols-2" @click="changeCategory">
    <div v-for="blogs in relatedBlogs" :key="blogs"  class="main mt-5 hover:text-white-500 font-semibold text-base grid-container bg-white shadow rounded-lg"> 
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
    </div>

  </section>   
    </section>
<div class="mt-28">
    <Footer />
</div>
</template>

<script setup>
import axios from 'axios';
import {onMounted ,ref} from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './Navbar.vue';
import Footer from '../WebPage/Footer.vue';
import {useLoading} from 'vue-loading-overlay';
import { useToast } from "vue-toastification";
const  toast = useToast();
const $loading = useLoading({});
const route = useRoute();
const blog = ref({});
const relatedBlogs = ref({});

const showBlogs = () => {
  axios.get(`https://blog-api-dev.octalinfotech.com/blogs/${route.params.id}/show`, {
      headers: {
        token: "7ELX2CnkfqWpipzXNB5QV9sxSf4dPk",
      },
    })
    .then((res) => {
      blog.value = res.data.data.blog;
      relatedBlogs.value = res.data.data.latestPost;
    })
    .catch((err) => {
      toast.error(err.response.data.message, {
              position: "top-right",
              timeout: 5000,
              });
    });
};

const changeCategory  = () => {
  axios.get(`https://blog-api-dev.octalinfotech.com/blogs/${route.params.id}/show`, {
      headers: {
        token: "7ELX2CnkfqWpipzXNB5QV9sxSf4dPk",
      },
    })
    .then((res) => {
      blog.value = res.data.data.blog;
      relatedBlogs.value = res.data.data.latestPost;
    })
    .catch((err) => {
      toast.error(err.response.data.message, {
              position: "top-right",
              timeout: 5000,
              });
    });
}

onMounted ( () =>{
  const loader = $loading.show({});
   showBlogs(1);
 loader.hide();
})



</script>

<style scoped>
body {
  background-color: #eee
}

.icon {
  width: 50px;
  height: 50px;
  background-color: #eee;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 39px
}
.taghover:hover h2{
 display: block;
}



</style>