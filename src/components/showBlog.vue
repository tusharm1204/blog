<template>
  <div class="p-5 rounded border border-gray-200 bg-white shadow-sm h-auto w-4/5 px-5 py-5 flex justify-center mx-auto mt-5">
<div  class="w-full sm:px-6 lg:px-8">
    <div class="p-3">
                    <div class="flex flex-col gap-3 px-5 py-2">
                      <div class="-mt-14 h-[90px] w-[90px] overflow-hidden rounded-full border-4 border-white shadow-md text-center">
                        <img :src="showBlogData.image" class="h-full w-full rounded-full object-cover object-center" />
                      </div>
                      <!-- <div class=""> -->
                      <h3 class="flex text-xl font-bold leading-6 text-slate-900">{{ showBlogData.category_name }}</h3>
                    <!-- </div> -->

                <div class="flex flex-col gap-3"> 
                  <div class="flex w-full items-center gap-3 rounded border bg-white px-2 py-3">
                    <EnvelopeIcon class="w-6 h-6"/>
                    <div class="leading-3">
                        <p class="text-sm font-bold text-slate-700">CategoryName</p>
                  </div>
                        <p class="ml-auto self-start text-sm text-slate-500 mr-[1rem]">{{ showBlogData.category_name }}</p>
                  </div> <div class="flex w-full items-center gap-3 rounded border bg-white px-2 py-3">
                    <EnvelopeIcon class="w-6 h-6"/>
                    <div class="leading-3">
                        <p class="text-sm font-bold text-slate-700">Title</p>
                  </div>
                        <p class="ml-auto self-start text-sm text-slate-500 mr-[1rem]">{{ showBlogData.title }}</p>
                  </div>
                  <div class="flex w-full items-center gap-3 rounded border bg-white px-2 py-3">
                    <DevicePhoneMobileIcon class="w-6 h-6"/>
                    <div class="leading-3">
                        <p class="text-sm font-bold text-slate-700">User Name</p>
                  </div>
                        <p class="ml-auto self-start text-sm text-slate-500 mr-[1rem]">{{ showBlogData.user_name }}</p>
                  </div>
                   <div class="flex w-full items-center gap-3 rounded border bg-white px-2 py-3">
                    <CakeIcon class="w-6 h-6"/>
                    <div class="leading-3">
                      <p class="text-sm font-bold text-slate-700">Date</p>
                    </div>
                    <p class="ml-auto self-start text-sm text-slate-500 mr-[1rem]">{{ showBlogData.date }}</p>
                  </div>
                  <div class="flex w-full items-center gap-3 rounded border bg-white px-2 py-3">
                    <CakeIcon class="w-6 h-6"/>
                    <div class="leading-3">
                      <p class="text-sm font-bold text-slate-700">Description</p>
                    </div>
                    <p class="ml-auto self-start text-sm text-slate-500 mr-[1rem]" v-html="showBlogData.description"></p>
                  </div>
                </div>
                <div class="mt-3 flex items-center justify-end gap-x-6">
                    <router-link to="/admin/blog">
                        <button  class="bg-slate-950 text-white rounded-sm text-center p-2">Cancel</button>
                    </router-link>
                </div>
              </div>  
              <div class="relative overflow-x-auto sm:rounded-lg mt-4 mx-auto px-5">
</div>
        </div>
  </div>
  </div>
       <!-- <h1>BLOG</h1>
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
                     <img :src="showBlogData.image" style="width:1125px;height:500px;margin-top:30px;object-fit: contain;" >
                   </div>
                   <div>
                     <p class="text-justify" style="font-size:23px;font-family: circular;margin:23px 0px 0px 161px;width: 54%;" v-html="showBlogData.description"></p>
                   </div>
                   </div>
                  </div>
       </div> -->
</template>
<script setup>

import {ref,onMounted} from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import {useLoading} from 'vue-loading-overlay';
const $loading = useLoading({});
const showBlogData = ref({});
const route = useRoute();
import { useToast } from "vue-toastification";
const  toast = useToast();
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
          showBlogData.value = res.data.data   
   }).catch((err) =>{
    toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
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