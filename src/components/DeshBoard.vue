<template>
   <div>
 
  <div style=" text-shadow: 0 0 2px;">
         DASHBOARD
      </div>
      <div style="margin-top: 50px;text-align: start;margin-left: 40px;display: flex; ">
         <img src="https://ca.slack-edge.com/T04HNPJ1PV3-U04L50M135K-e9c7087e3b5a-512" style="position: relative;height:66px;border-radius: 100%;">
         <h1 style="font-size: 25px;font-weight: 800;margin:15px;">Good Morning , Tushar Makwana</h1>
      </div>
      <div class="grid-container container mt-5 gap-5" >
         <div data-v-cef1fb98="" style="width: 25%;" class="grid-item flex flex-wrap justify-between gap-5 px-8 py-3 bg-red-50 rounded-sm shadow border-b-4 border-red-500"><a data-v-cef1fb98="" href="/student/complete-tasks" class="" style="text-decoration: none;"><h5 data-v-cef1fb98="" class="mb-2 text-2xl font-semibold tracking-tight text-red-600 dark:text-white">Categories</h5></a><h1 data-v-cef1fb98="" class="text-2xl font-semibold text-black">{{blogData.category}}</h1></div>
            <div data-v-cef1fb98="" style="width: 25%;" class="grid-item flex flex-wrap justify-between gap-5 px-8 py-3 bg-green-50 rounded-sm shadow border-b-4 border-green-500"><a data-v-cef1fb98="" href="/student/complete-tasks" class="" style="text-decoration: none;"><h5 data-v-cef1fb98="" class="mb-2 text-2xl font-semibold tracking-tight text-green-600 dark:text-white">Blogs</h5></a><h1 data-v-cef1fb98="" class="text-2xl font-semibold text-black">{{blogData.blog}}</h1></div>
            <div data-v-cef1fb98="" style="width: 25%;" class="grid-item flex flex-wrap justify-between gap-5 px-8 py-3 bg-yellow-50 rounded-sm shadow border-b-4 border-yellow-500"><a data-v-cef1fb98="" href="/student/complete-tasks" class="" style="text-decoration: none;"><h5 data-v-cef1fb98="" class="mb-2 text-2xl font-semibold tracking-tight text-yellow-600  dark:text-white">Users</h5></a><h1 data-v-cef1fb98="" class="text-2xl font-semibold text-black">{{blogData.user}}</h1></div>
            <div data-v-cef1fb98="" style="width: 25%;" class="grid-item flex flex-wrap justify-between gap-5 px-8 py-3 bg-blue-50 rounded-sm shadow border-b-4 border-blue-500"><a data-v-cef1fb98="" href="/student/complete-tasks" class="" style="text-decoration: none;"><h5 data-v-cef1fb98="" class="mb-2 text-2xl font-semibold tracking-tight text-blue-600 dark:text-white">Tags</h5></a><h1 data-v-cef1fb98="" class="text-2xl font-semibold text-black">{{blogData.tag}}</h1></div>
      </div>
      
   </div>
</template>

<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axios from 'axios';
import {ref, onMounted } from 'vue';
import {useLoading} from 'vue-loading-overlay'
const $loading = useLoading({});
const blogData = ref({});

const showDashboard = () =>{
   let data = localStorage.getItem('user');
      data = JSON.parse(data);
      let token = data.token

      axios.get('https://blog-api-dev.octalinfotech.com/api/dashboard' , {
         headers: {
            Authorization:`Bearer ${token}`
         }
      }).then((res) =>{
         blogData.value = res.data.data
      }).catch((err) =>{
         toast.error(err.response?.data?.message, {
           position: toast.POSITION.TOP_RIGHT,
          });
      })
}


onMounted(async ()=>{
const loader = $loading.show({});
 await  showDashboard();
 loader.hide();

})

</script>   
<style>
.grid-container {
   display: flex;
   grid-template-columns: auto auto auto;
   padding: 10px;
 }
 .grid-item {
   font-size: 30px;
   text-align: center;
 }

 @media (max-width: 1000px) {
   .grid-container {
      grid-template-columns: auto;
      padding: 5px;
    }
    .grid-item {
      font-size: 30px;
      text-align: center;
      width: 50%;
    }
 }
</style>