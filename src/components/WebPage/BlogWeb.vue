<template>

    <Navbar />
<section class="container mt-5" style="margin-left:380px;width: 60%;">

      <Carousel :items-to-show="2.5" :wrap-around="true"  >
        <Slide v-for="categories in categoriesDatas" :key="categories" class="containers">
        <div  style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
            <div class="item ">
                  <img :src="categories.image" alt="" class="imges " style="width:145px;border: 4px solid;height: 145px;">
              </div>
              <div class="mt-3 text-base text-center cursor-pointer mt-2">
                  <h1 class="text-xs dark:text-gray-400 hover-underline-animation" style="font-size: 20px;font-weight:700;color: black;">
                  {{ categories.name }}
                  </h1>
              </div>
             </div>
      </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
</section><br><br><br><br><br><br>
<section class="container" style="margin-left:400px;">
    <div class=" grid grid-cols-3 container">
      <div v-for="blogs in blogDatas" :key="blogs" class="main mt-5 hover:text-white-500 font-semibold text-base grid-container">
          <div >
            <router-link :to="'/blogs/'+blogs.id">
                        <img :src="blogs.image" alt="" class=" w-full h-44 dark:bg-gray-500 " style=" width:330px;height: 230px;object-fit: contain;margin-left: -73px;" @click="showBlogs">
            </router-link>
          </div>
          <div class="text-base text-center cursor-pointer mt-2 justify-content">
              <h1 class="d-flex justify-content mt-3 hover-underline-animation">
              {{ blogs.name }}
            </h1>
            <div class="description" style="" v-html="blogs.description"></div>
              <img :src="blogs.user_image" alt="" style="width: 50px;height: 50px;border-radius: 100%;margin-top: 5px;margin-left:-11px;">
              <span class="text-xs dark:text-gray-400 user_name" style="margin-left: 46px;top: 1px;margin-top: -33px;display: flex;">{{ blogs.user_name}}</span>
              <span class="text-xs dark:text-gray-400 date" style="    display: flex; margin-left:95px; margin-top: -15px;">   {{ blogs.date }}</span>
              <span class="text-xs dark:text-gray-400" style="display: flex; margin-left: 54px; margin-top: 5px;">{{ blogs.slug }}</span>
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
  <div style="margin-top: 80px;">
    <Footer />
  </div>
 </template>
 
   <script setup>
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { ref,onMounted } from "vue";
import axios  from "axios";
import {useLoading} from 'vue-loading-overlay'
const $loading = useLoading({});
import Navbar from './Navbar.vue';
import Footer from '../WebPage/Footer.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

  const categoriesDatas = ref({});
  const blogDatas = ref({});
  const showCatagory = () =>{

      axios.get('https://blog-api-dev.octalinfotech.com/categories?page=1&search' ,{
         headers : {
          token: '7ELX2CnkfqWpipzXNB5QV9sxSf4dPk'   
         }
      })
      .then((res) =>{
          categoriesDatas.value = res.data.data.data
      }).catch((err)=>{
        toast.error(err.response?.data?.message, {
                       position: toast.POSITION.TOP_RIGHT,
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
        toast.error(err.response?.data?.message, {
                       position: toast.POSITION.TOP_RIGHT,
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
   i{
    padding: 6px;
   }
 .imges{
    width: 130px;
    height: 130px;
    border-radius: 100%;
    border: 1px solid;
 }
  .description{
    width: 180px;
    height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size:13px;
    font-weight:500;
  }
  .containers{
    width:26%;
    height:30%;
  }
  @media only screen and (max-width:1200px) {
    #carouselExampleControls{
      margin-left: 50px;
    }
    .containers{
      width:40%;
      height:30%;
    }
    .imges{
     display: none;
   }
  }
 </style>