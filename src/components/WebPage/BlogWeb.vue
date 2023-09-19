<template>

    <Navbar />
<section class="container mt-5">

      <Carousel :items-to-show="1.5"  v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="categories in categoriesDatas" :key="categories" style="width:35%;height: 35%;" class="container">
            <div style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
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
<section class="container">
    <div class=" grid grid-cols-3 container">
      <div v-for="blogs in blogDatas" :key="blogs" class="main mt-5 hover:text-white-500 font-semibold text-base grid-container">
          <div >
            <router-link :to="'/blogs/'+blogs.id">
                        <img :src="blogs.image" alt="" class="object-cover w-full h-44 dark:bg-gray-500 " style=" width: 220px;height: 220px;border-radius:25px;" @click="showBlogs">
            </router-link>
          </div>
          <div class="text-base text-center cursor-pointer mt-2 justify-content">
              <h1 class="d-flex justify-content mt-3 hover-underline-animation">
              {{ blogs.name }}
              <div  style="font-size:12px;font-weight:500;text-align: start;" v-html="blogs.description"></div>
              </h1>
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
        <img class=" shadow-1-strong mb-4 w-10 animate-bounce rounded-full"
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
import Navbar from './Navbar.vue';
import Footer from '../WebPage/Footer.vue';

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
      
  })
  }
  
  const showBlogs = () =>{
  }
  onMounted (() =>{
      showCatagory();
      showBlog();
      showBlogs()
  })
   </script>
   <style scoped>
   i{
    padding: 6px;
   }
   a{
    color: white;
   }
   .carousel__item {
    min-height: 200px;
    width:1000px;
   
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
  }
 .imges{
    width: 130px;
    height: 130px;
    border-radius: 100%;
    border: 1px solid;
 }
 *,
 *::after,
 *::before{
     box-sizing: border-box;
     padding: 0;
     margin: 0;
 }
 .html{
     font-size: 62.5%;
 }
 .navbar input[type="checkbox"],
 .navbar .hamburger-lines{
     display: none;
 }
 .container{
     max-width: 1200px;
     width: 90%;
     margin: auto;
 }
 .navbar{
     box-shadow:0px 5px 10px 0px hsl(240deg 25.57% 75.25%);
     position: fixed;
     width: 100%;
     background: #fff;
     color: #000;
     opacity: 0.85;
     z-index: 1;
 }
 .navbar-container{
     display: flex;
     justify-content: space-between;
     height: 64px;
     align-items: center;
 }
 .menu-items{
     order: 2;
     display: flex;
     gap: -15px;
 }
 .octal{
    font-size: 2.25rem;
    line-height: 1.75rem;
 }
 .menu-items li{
     list-style: none;
     margin-left: 1.5rem;
     font-size: 1.3rem;
 }
 .navbar a{
     color: #444;
     text-decoration: none;
     font-weight: 500;
     transition: color 0.3s ease-in-out;
 }
 .navbar a:hover{
     color: #117964;
 }
 @media (max-width: 768px){
     .navbar{
         opacity: 0.95;
     }
     .navbar-container input[type="checkbox"],
     .navbar-container .hamburger-lines{
         display: block;
     }
     .navbar-container{
         display: block;
         position: relative;
         height: 64px;
     }
     .navbar-container input[type="checkbox"]{
         position: absolute;
         display: block;
         height: 32px;
         width: 30px;
         top: 20px;
         left: 20px;
         z-index: 5;
         opacity: 0;
         cursor: pointer;
     }
     .navbar-container .hamburger-lines{
         display: block;
         height: 28px;
         width: 35px;
         position: absolute;
         top: 20px;
         left: 20px;
         z-index: 2;
         display: flex;
         flex-direction: column;
         justify-content: space-between;
     }
     .navbar-container .hamburger-lines .line{
         display: block;
         height: 4px;
         width: 100%;
         border-radius: 10px;
         background: #333;
     }
     .navbar-container .hamburger-lines .line1{
         transform-origin: 0% 0%;
         transition: transform 0.3s ease-in-out;
     }
     .navbar-container .hamburger-lines .line2{
         transition: transform 0.2s ease-in-out;
     }
     .navbar-container .hamburger-lines .line3{
         transform-origin: 0% 100%;
         transition: transform 0.3s ease-in-out;
     }
     .navbar .menu-items{
         padding-top: 100px;
         background: #fff;
         height: 100vh;
         max-width: 300px;
         transform: translate(-150%);
         display: flex;
         flex-direction: column;
         margin-left: -40px;
         padding-left: 40px;
         transition: transform 0.5s ease-in-out;
         box-shadow:  5px 0px 10px 0px #aaa;
         overflow: scroll;
     }
     .navbar .menu-items li{
         margin-bottom: 1.8rem;
         font-size: 1.1rem;
         font-weight: 500;
     }
     .logo{
         position: absolute;
         top: 10px;
         right: 15px;
         font-size: 2.5rem;
     }
     .navbar-container input[type="checkbox"]:checked ~ .menu-items{
         transform: translateX(0);
     }
     .navbar-container input[type="checkbox"]:checked ~ .hamburger-lines .line1{
         transform: rotate(45deg);
     }
     .navbar-container input[type="checkbox"]:checked ~ .hamburger-lines .line2{
         transform: scaleY(0);
     }
     .navbar-container input[type="checkbox"]:checked ~ .hamburger-lines .line3{
         transform: rotate(-45deg);
     }
 }
 @media (max-width: 500px){
     .navbar-container input[type="checkbox"]:checked ~ .logo{
         display: none;
     }
 }
 </style>