<template>
   <div class="min-h-full">
      <div class="bg-white">
         <div class="px-4 sm:px-6 lg:mx-auto lg:px-8">
            <div class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
               <div class="min-w-0 flex-1">
                  <div class="flex items-center">
                     <img class="hidden h-16 w-16 rounded-full sm:block" src="https://ims-api-dev.octalinfotech.com/images/avatar.png" alt="">
                     <div>
                        <div class="flex items-center">
                           <img class="h-16 w-16 rounded-full sm:hidden" src="https://ims-api-dev.octalinfotech.com/images/avatar.png" alt="">
                           <h1 class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">Good Morning, admin</h1>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
         <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div class="hover:scale-105 duration-500 relative overflow-hidden gap-5 px-8 py-3 bg-pink-50 rounded-sm border-b-4 border-pink-500 mx-2 my-1 pb-2 pt-4 shadow sm:px-6 sm:pt-6">
                    <div class="flex justify-between">
                        <div  class="flex flex-col gap-2">
                           <h5 class="mb-4 text-2xl font-semibold tracking-tight text-pink-500 dark:text-white">Blogs</h5>
                        </div>
                        <div class="h-6 rounded-md w-11">
                           <h1 class="text-2xl font-semibold text-black">{{blogData.blog}}</h1>
                        </div>
                    </div>
                </div>
                <div class="hover:scale-105 duration-500 gap-5 px-8 py-3 bg-green-50 rounded-sm border-b-4 border-green-500 mx-2 my-1 pb-2 pt-4 shadow sm:px-6 sm:pt-6">
                    <div class="flex justify-between">
                        <div  class="flex flex-col gap-2">
                           <h5 class="mb-4 text-2xl font-semibold tracking-tight text-green-700 dark:text-white">Categories</h5>
                        </div>
                        <div class="h-6 rounded-md w-11">
                           <h1 class="text-2xl font-semibold text-black">{{blogData.category}}</h1>
                        </div>
                    </div>
                </div>
                <div class="hover:scale-105 duration-500 gap-5 px-8 py-3 bg-yellow-50 rounded-sm border-b-4 border-yellow-500 mx-2 my-1 pb-2 pt-4 shadow sm:px-6 sm:pt-6">
                    <div class="flex justify-between">
                        <div  class="flex flex-col gap-2">
                           <h5 class="mb-4 text-2xl font-semibold tracking-tight text-yellow-700 dark:text-white">Users</h5>
                        </div>
                        <div class="h-6 rounded-md w-11">
                           <h1 class="text-2xl font-semibold text-black">{{blogData.user}}</h1>
                        </div>
                    </div>
                </div>
                <div class="hover:scale-105 duration-500 relative overflow-hidden gap-5 px-8 py-3 bg-blue-50 rounded-sm border-b-4 border-blue-500 mx-2 my-1 pb-4 pt-4 shadow sm:px-6 sm:pt-6">
                    <div class="flex justify-between">
                        <div  class="flex flex-col gap-2">
                           <h5 data-v-cef1fb98="" class="mb-2 text-2xl font-semibold tracking-tight text-blue-600 dark:text-white">Tags</h5>
                        </div>
                        <div class="h-6 rounded-md w-11">
                           <h1 data-v-cef1fb98="" class="text-2xl font-semibold text-black">{{blogData.tag}}</h1>
                        </div>
                    </div>
                </div>
         </div>
      </div>
   <!-- <div class="mx-4">
 
  <div style=" text-shadow: 0 0 2px;">
         DASHBOARD
      </div>
      <div class="flex items-center mt-5">
         <img src="https://ca.slack-edge.com/T04HNPJ1PV3-U04L50M135K-e9c7087e3b5a-512" style="position: relative;height:66px;border-radius: 100%;">
         <h1 class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">Good Morning , {{name}}</h1>
      </div>
      <div class="mx-auto mt-5">
            <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div class="hover:scale-105 duration-500 relative overflow-hidden gap-5 px-8 py-3 bg-pink-50 rounded-sm border-b-4 border-pink-500 mx-2 my-1 pb-2 pt-4 shadow sm:px-6 sm:pt-6">
                    <div class="flex justify-between">
                        <div  class="flex flex-col gap-2">
                           <h5 class="mb-4 text-2xl font-semibold tracking-tight text-pink-500 dark:text-white">Blogs</h5>
                        </div>
                        <div class="h-6 rounded-md w-11">
                           <h1 class="text-2xl font-semibold text-black">{{blogData.blog}}</h1>
                        </div>
                    </div>
                </div>
                <div class="hover:scale-105 duration-500 relative overflow-hidden gap-5 px-8 py-3 bg-green-50 rounded-sm border-b-4 border-green-500 mx-2 my-1 pb-2 pt-4 shadow sm:px-6 sm:pt-6">
                    <div class="flex justify-between">
                        <div  class="flex flex-col gap-2">
                           <h5 class="mb-4 text-2xl font-semibold tracking-tight text-green-700 dark:text-white">Categories</h5>
                        </div>
                        <div class="h-6 rounded-md w-11">
                           <h1 class="text-2xl font-semibold text-black">{{blogData.category}}</h1>
                        </div>
                    </div>
                </div>
                <div class="hover:scale-105 duration-500 relative overflow-hidden gap-5 px-8 py-3 bg-yellow-50 rounded-sm border-b-4 border-yellow-500 mx-2 my-1 pb-2 pt-4 shadow sm:px-6 sm:pt-6">
                    <div class="flex justify-between">
                        <div  class="flex flex-col gap-2">
                           <h5 data-v-cef1fb98="" class="mb-2 text-2xl font-semibold tracking-tight text-yellow-600  dark:text-white">Users</h5>
                        </div>
                        <div class="h-6 rounded-md w-11">
                           <h1 data-v-cef1fb98="" class="text-2xl font-semibold text-black">{{blogData.user}}</h1>
                        </div>
                    </div>
                </div>
                
                <div class="hover:scale-105 duration-500 relative overflow-hidden gap-5 px-8 py-3 bg-blue-50 rounded-sm border-b-4 border-blue-500 mx-2 my-1 pb-4 pt-4 shadow sm:px-6 sm:pt-6">
                    <div class="flex justify-between">
                        <div  class="flex flex-col gap-2">
                           <h5 data-v-cef1fb98="" class="mb-2 text-2xl font-semibold tracking-tight text-blue-600 dark:text-white">Tags</h5>
                        </div>
                        <div class="h-6 rounded-md w-11">
                           <h1 data-v-cef1fb98="" class="text-2xl font-semibold text-black">{{blogData.tag}}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <!-- <div class="grid-item flex flex-wrap justify-between gap-5 px-8 py-3 bg-green-50 rounded-sm shadow border-b-4 border-green-500"><a data-v-cef1fb98="" href="/student/complete-tasks" class="" style="text-decoration: none;"><h5 data-v-cef1fb98="" class="mb-2 text-2xl font-semibold tracking-tight text-green-600 dark:text-white">Blogs</h5></a><h1 data-v-cef1fb98="" class="text-2xl font-semibold text-black">{{blogData.blog}}</h1></div> -->

      <!-- <div class="mx-auto  px-4 sm:px-6 lg:px-8 mb-5"> -->
        <!-- <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"> -->

          <!-- <div class="border-l-4 border-pink-500 hover:scale-105 duration-500 relative rounded-lg bg-white px-3 py-3 mx-2  pb-2 pt-4 shadow sm:px-6 sm:pt-6">
               <div class="gap-y-5">
              <div class="truncate text-xl font-semibold text-pink-700 flex justify-between w-full">
                     <h5 class="mb-4 text-2xl font-semibold tracking-tight text-pink-500 dark:text-white">Blogs</h5>
                        <div class="text-pink-500 text-3xl">
                           <h1 class="text-2xl font-semibold text-black">{{blogData.blog}}</h1>
                        </div>
              </div>
            </div>
        </div> -->

                <!-- <div class="border-l-4 border-yellow-700 hover:scale-105 duration-500 relative rounded-lg bg-white py-2 mx-2 pb-2 pt-4 shadow sm:px-6 sm:pt-6">
                  <div class="gap-y-5">
                      <div class="truncate text-xl font-semibold text-yellow-700 flex justify-between w-full">
                           <h5 class="mb-4 text-2xl font-semibold tracking-tight text-yellow-700 dark:text-white">Categories</h5>
                        <div class="text-yellow-700">
                     <h1 class="text-2xl font-semibold text-black">{{blogData.category}}</h1>
                     </div>
              </div>
            </div>
        </div> -->
        <!-- <div class="grid-item flex flex-wrap justify-between gap-5 px-8 py-3 bg-green-50 rounded-sm shadow border-b-4 border-green-500"><a data-v-cef1fb98="" href="/student/complete-tasks" class="" style="text-decoration: none;"><h5 data-v-cef1fb98="" class="mb-2 text-2xl font-semibold tracking-tight text-green-600 dark:text-white">Blogs</h5></a><h1 data-v-cef1fb98="" class="text-2xl font-semibold text-black">{{blogData.blog}}</h1></div> -->
        <!-- <div class="grid-item flex flex-wrap justify-between gap-5 px-8 py-3 bg-red-50 rounded-sm shadow border-b-4 border-red-500"><a data-v-cef1fb98="" href="/student/complete-tasks" class="" style="text-decoration: none;"><h5 data-v-cef1fb98="" class="mb-2 text-2xl font-semibold tracking-tight text-red-600 dark:text-white">Categories</h5></a><h1 data-v-cef1fb98="" class="text-2xl font-semibold text-black">{{blogData.category}}</h1></div> -->
        <!-- <div class="grid-item flex flex-wrap justify-between gap-5 px-8 py-3 bg-yellow-50 rounded-sm shadow border-b-4 border-yellow-500"><a data-v-cef1fb98="" href="/student/complete-tasks" class="" style="text-decoration: none;"><h5 data-v-cef1fb98="" class="mb-2 text-2xl font-semibold tracking-tight text-yellow-600  dark:text-white">Users</h5></a><h1 data-v-cef1fb98="" class="text-2xl font-semibold text-black">{{blogData.user}}</h1></div> -->
        <!-- <div class="grid-item flex flex-wrap justify-between gap-5 px-8 py-3 bg-blue-50 rounded-sm shadow border-b-4 border-blue-500"><a data-v-cef1fb98="" href="/student/complete-tasks" class="" style="text-decoration: none;"><h5 data-v-cef1fb98="" class="mb-2 text-2xl font-semibold tracking-tight text-blue-600 dark:text-white">Tags</h5></a><h1 data-v-cef1fb98="" class="text-2xl font-semibold text-black">{{blogData.tag}}</h1></div> -->
      <!-- </div> -->
    <!-- </div> -->
      
     <!-- <div class="mx-auto  px-4 sm:px-6 lg:px-8">
            <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            </div>
        </div>
       <div class="grid-container container mt-5 gap-5" >
       </div> -->
   </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
const  toast = useToast();
import axios from 'axios';
import {ref, onMounted } from 'vue';
import {useLoading} from 'vue-loading-overlay'
const $loading = useLoading({});
const blogData = ref({});
const name = ref('');

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
         toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
      })
}


onMounted(async ()=>{
const loader = $loading.show({});
 await  showDashboard();
 loader.hide();
//  this.name = JSON.parse(localStorage.getItem('user')).name;
name.value = JSON.parse(localStorage.getItem('user')).name;
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