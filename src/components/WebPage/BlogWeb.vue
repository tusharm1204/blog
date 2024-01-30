<template>
    <Navbar />
    <div class="mx-auto max-w-full px-2 sm:px-6 md:px-8">
      <section class="mt-5 w-[100%] md:w-[100%]  md:justify-end xl:justify-end justify-center">
      <Carousel :items-to-show="11" :wrap-around="true"  >
        <Slide v-for="category in categories" :key="category">
        <div>
            <div class="item">
              <router-link :to="'/categories/'+category.id+'/blogs'">
                <img :src="category.image" alt="" class="rounded-full w-[50px] h-[40px] md:w-[145px] xl:w-[40px] lg:w-[145px] border-2 md:h-[145px] lg:h-[145px] xl:h-[40px]">
              </router-link>
              <div class="mt-3 text-base text-center cursor-pointer">
                  <h1 class="text-xl dark:text-gray-400 hover-underline-animation text-black">
                  {{ category.name }}
                  </h1>
              </div>
              </div>
             </div>
      </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
</section>
<!-- <section class="container mt-5 w-[100%] md:w-[100%]  md:justify-end xl:justify-end justify-center">
      <Carousel :items-to-show="3" :wrap-around="true"  >
        <Slide v-for="categories in categoriesDatas" :key="categories">
        <div>
            <div class="item">
                  <img :src="categories.image" alt="" class="rounded-full w-[300px] md:w-[145px] xl:w-[145px] lg:w-[145px] border-2 h-[145px] md:h-[145px] lg:h-[145px] xl:h-[145px]">
              </div>
              <div class="mt-3 text-base text-center cursor-pointer">
                  <h1 class="text-xl dark:text-gray-400 hover-underline-animation text-black">
                  {{ categories.name }}
                  </h1>
              </div>
             </div>
      </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
</section> -->
<section class="container mt-5 justify-center flex">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 md:grid-cols-2">
    <div v-for="blogs in blogDatas" :key="blogs" class="main mt-5 hover:text-white-500 font-semibold text-base grid-container"> 
          <div >
            <router-link :to="'/blogs/'+blogs.id">
                        <img :src="blogs.image" alt="" class=" w-[330px] h-[230px] object-contain" @click="showBlogs">
            </router-link>
          </div>
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
      </div> 
    </div>

  </section><br><br><br><br>
  <div id="carouselExampleControls" class="carousel slide text-center carousel-dark" data-mdb-ride="carousel" style="width: 65%;margin-left:371px;margin-top: 100px;">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class=" shadow-1-strong mb-4 w-10  rounded-full"
          src="http://octalinfotech.com/img/octal-logo.png" alt="avatar"
          style="width: 150px;margin:50px;margin-left: 543px;" />
        <div class="row d-flex justify-content-center">
          <div class="col-lg-8">
            <p style="font-size: 25px;font-weight: 700;">Octal Infotech</p>
            <p class="text-muted">
              <i class="fas fa-quote-left pe-2"></i>
              One-stop solution for a wide range of web development services. Fully customized and responsive websites - world class solutions to our valued customers. Experise at fullscale, personalized - unlocking endless possibilities.
              Shopify and Shopify Plus development is Octal Infotech's specialty.We have a top team of ecommerce web developers.
            </p>
          </div>
        </div>
        <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
          <li><i class="fas fa-star fa-sm"></i></li>
          <li><i class="fas fa-star fa-sm"></i></li>
          <li><i class="fas fa-star fa-sm"></i></li>
          <li><i class="fas fa-star fa-sm"></i></li>
          <li><i class="fas fa-star fa-sm"></i></li>
        </ul>
      </div>
    </div>
  </div>
  <section class="container mt-5">
    <div style="width: 100%;">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.914081130329!2d72.85587637518222!3d21.23525538046629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f30b7912685%3A0x96e904c8eb74102e!2sOctal%20Infotech!5e0!3m2!1sen!2sin!4v1696482035861!5m2!1sen!2sin" width="1500" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
</section>
</div>
  <div style="margin-top: 80px;">
    <Footer />
  </div>
 </template>
 
   <script setup>
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { ref,onMounted } from "vue";
import axios  from "axios";
import {useLoading} from 'vue-loading-overlay'
const $loading = useLoading({});
import Navbar from './Navbar.vue';
import Footer from '../WebPage/Footer.vue';
import { useToast } from "vue-toastification";
const  toast = useToast();

  const categories = ref({});
  const blogDatas = ref({});
  const showCatagory = () =>{

      axios.get('https://blog-api-dev.octalinfotech.com/categories?page=1&search' ,{
         headers : {
          token: '7ELX2CnkfqWpipzXNB5QV9sxSf4dPk'   
         }
      })
      .then((res) =>{
        categories.value = res.data.data.data
      }).catch((err)=>{
        toast.error(err.response.data.message, {
              position: "top-right",
              timeout: 5000,
              });
      })
  }
  
  const showBlog  = () =>{
  
  axios.get('https://blog-api-dev.octalinfotech.com/blogs?page=1&search=' , {
      headers :{
          token : '7ELX2CnkfqWpipzXNB5QV9sxSf4dPk'
      }
  })
  .then((res) =>{
      blogDatas.value = res.data.data.data 
  }).catch((err)=>{
    toast.error(err.response.data.message, {
              position: "top-right",
              timeout: 5000,
              });
      })
  }
  
  const showBlogs = () =>{
  }
  onMounted (async() =>{
  const loader = $loading.show({});
    await  showCatagory();
    await  showBlog();
    await  showBlogs();
 loader.hide();
  })
   </script>
   <style scoped>
.cell-breakword {
    word-break: break-all;
    max-width:300px;
}

.cell-breakword:hover {
    overflow: visible;
    white-space: normal;
    height: auto;
}
 </style>