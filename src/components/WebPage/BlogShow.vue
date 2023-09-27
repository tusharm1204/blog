<template>
<Navbar />
  <div class="container">
    <section class="container">
      <div >
        <div style="display: flex;flex-direction: column;justify-content: center; align-items: flex-start;">
          <router-link to="/" class="d-flex" style="align-items: baseline;">
              <i class="fa-solid fa-house" @click="backBlog"></i>
              &nbsp;<pre> <b>></b> </pre>
              <b style="font-family: 'circular';">{{blogShow.category_name}}</b>
          </router-link>
          <br>
          <h1 class="text-4xl "><b>{{  blogShow.title }}</b></h1>
          <br>
          <p class="description d-flex justify-content" style="align-items: center;margin-left: -13px;"><img src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg" style="width: 40px;">
           <span style="font-weight: 900;">{{ blogShow.user_name }}</span> &nbsp;&nbsp;<span style="font-family: 'circular';">{{ blogShow.date }}</span></p>
        </div>
        <br>
        <div>
        <div class="text-start mt-3 flex gap-2 border-b-[1px] py-5 flex-wrap">
          <button class="gap-2 inline-flex items-center px-8 text-white text-sm py-1 bg-[#3059b0]"><i class="fa-brands fa-facebook"></i>facebook</button>
          <button class="gap-2 inline-flex items-center px-8 text-white text-sm py-1 bg-[#e52731]"><i class="fa-brands fa-twitter"></i>twitter</button>
          <button class="gap-2 inline-flex items-center px-8 text-white text-sm py-1 bg-[#55acef]"> <i class="fa-solid fa-envelope"></i>envelope</button>
          <button class="gap-2 inline-flex items-center px-8 text-white text-sm py-1 bg-[#3330fb] ">   <i class="fa-brands fa-linkedin"></i>in.</button>
        </div>
       <div class="d-flex">
        <div>
          <img :src="blogShow.image" style="width:1020px;height:500px;margin-top:30px;object-fit: cover;" >
        </div>
        <div>
          <p class="text-justify" style="font-size:23px;font-family: circular;margin:23px 0px 0px 161px;width: 54%;" v-html="blogShow.description"></p>
        </div>
        </div>
       </div>
      </div>
      
    </section><br><br><br><br>
  </div>
  <div id="carouselExampleControls" class="carousel slide text-center carousel-dark" data-mdb-ride="carousel" style="width: 65%;margin-left:371px;margin-top:50px;">
    <div class="carousel-inner">
      <div class="carousel-item active">
        
        <div class="row d-flex justify-content-center">
          <div class="col-lg-8">
            <p style="font-size: 25px;font-weight: 700;">Octal Infotech</p>
            <p class="text-muted" style="font-family: 'circular';">
              <i class="fas fa-quote-left pe-2"></i>
              One-stop solution for a wide range of web development services. Fully customized and responsive websites - world class solutions to our valued customers. Experise at fullscale, personalized - unlocking endless possibilities.
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
<div style="margin-top:50px;">
    <Footer />
</div>
</template>

<script setup>
import axios from 'axios';
import {onMounted ,ref} from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute();
import Navbar from './Navbar.vue';
import Footer from '../WebPage/Footer.vue';
const blogShow = ref({})
const showBlogs = () => {
        console.log( route.params.id);
  axios.get(`https://blog-api-dev.octalinfotech.com/blogs/${route.params.id}/show`, {
      headers: {
        token: "7ELX2CnkfqWpipzXNB5QV9sxSf4dPk",
      },
    })
    .then((res) => {
      console.log(res);
      console.log(res.data.data);
      blogShow.value = res.data.data
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted (() =>{
    showBlogs()
})


</script>

<style scoped>
body {
  background-color: #eee
}

.card {
  border: none;
  border-radius: 10px
}

.c-details span {
  font-weight: 300;
  font-size: 13px
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

.badge span {
  background-color: #fffbec;
  width: 60px;
  height: 25px;
  padding-bottom: 3px;
  border-radius: 5px;
  display: flex;
  color: #fed85d;
  justify-content: center;
  align-items: center
}

.progress {
  height: 10px;
  border-radius: 10px
}

.text1 {
  font-size: 14px;
  font-weight: 600
}

.text2 {
  color: #a5aec0
}
</style>