<template>
       <h1>BLOG</h1>
       <div class="container">
              <div style="display: flex;flex-direction: column;justify-content: center; align-items: flex-start;">
                     <router-link to="/admin/blog" class="d-flex" style="align-items: baseline;">
                         <butto class=" btns" style="margin-top: 67px;">Back</butto>&nbsp;<pre> <b>></b> </pre>
                         <b style="font-family: 'circular';">{{showBlogData.category_name}}</b>
                     </router-link>
                     <br>
                     <h1 class="text-4xl "><b>{{  showBlogData.title }}</b></h1>
                     <br>
                     <p class="description d-flex justify-content" style="align-items: center;margin-left: -13px;"><img src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg" style="width: 40px;">
                      <span style="font-weight: 900;">{{ showBlogData.user_name }}</span> &nbsp;&nbsp;<span style="font-family: 'circular';">{{ showBlogData.date }}</span></p>
                   </div>
                   <br>
                   <div>
                  <div class="d-flex">
                   <div>
                     <img :src="showBlogData.image" style="width:1125px;height:500px;margin-top:30px;object-fit: cover;" >
                   </div>
                   <div>
                     <p class="text-justify" style="font-size:23px;font-family: circular;margin:23px 0px 0px 161px;width: 54%;" v-html="showBlogData.description"></p>
                   </div>
                   </div>
                  </div>
       </div>
</template>
<script setup>

import {ref,onMounted} from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import {useLoading} from 'vue-loading-overlay';
const $loading = useLoading({});
const showBlogData = ref({});
const route = useRoute();

const showBlog = () =>{         
   let data = localStorage.getItem('user');
   data = JSON.parse(data);
   let token = data.token;

   axios.get(`https://blog-api-dev.octalinfotech.com/api/blogs/${route.params.id}/show` , {
          headers :{
                    Authorization :`Bearer ${token}`
          }
   })
   .then((res)=>{
       console.log(res.data.data);
          showBlogData.value = res.data.data   
   })

} 


onMounted(async() =>{
  const loader = $loading.show({});
      await showBlog();
      loader.hide();
})
</script>

<style >
.blog{
       display: flex;
       justify-content: start;
       margin-top: 50px;
       margin-left: 30px;
       font-size: 27px;
       font-weight: 700;
       text-shadow: 0 0 2px;
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
     .btns {
       background-color: #969696;
       border: none;
       color: white;
       padding: 8px 25px;
       text-align: center;
       text-decoration: none;
       display: inline-block;
       font-size: 16px;
       margin: 4px 2px;
       cursor: pointer;
       transition-duration: 0.4s;
       box-shadow: 0 5px 2px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

     }

</style>