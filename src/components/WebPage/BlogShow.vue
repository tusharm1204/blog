<template>
<Navbar />
<div class="container">
  <section class="container ">
    <div >
      <div style="display: flex;flex-direction: column;justify-content: center; align-items: flex-start;">
        <router-link to="/" class="d-flex" style="    align-items: baseline;">
            <i class="fa-solid fa-house" @click="backBlog"></i>
            &nbsp;<pre> <b>></b> </pre>
            <b>{{blogShow.category_name}}</b>
        </router-link>
        <br>
        <h1 class="text-4xl "><b>{{  blogShow.title }}</b></h1>
        <br>
        <p class="description d-flex justify-content" style="align-items: center;"><img src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg" style="width: 40px;">
         <i>{{ blogShow.user_name }}</i> &nbsp;&nbsp;<b>{{ blogShow.date }}</b></p>
      </div>
      <br>
      <div>
      <p class="d-flex" style="font-size: 25px;" v-html="blogShow.description"></p>
        <img :src="blogShow.image" style="width: 550px;height:550px;margin-top:10px;" >
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
          <p class="text-muted">
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

</style>