<template>
   
   <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow-sm w-auto">
<div class="w-[5rem] border-r border-gray-200 flex text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden">
    <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="fixedx flex items-center p-2 ms-3 mx-5 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
      <span class="sr-only">Open sidebar</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
      </svg>
   </button>
</div>
    <div class="flex flex-1 justify-end items-center px-4 bg-slate-50">
      <div class="ml-4 flex items-center md:ml-6"><div data-headlessui-state="open" class="relative ml-3">
          <div>
            <button @click="openModel = !openModel" class="flex max-w-xs items-center justify-between rounded-full bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <img src="https://ims-api-dev.octalinfotech.com/images/avatar.png" alt="" class="rounded-full h-8">
        </button>
        <div v-if="openModel" class="absolute right-[10%] mt-2 w-[10rem] px-5 flex justify-center  dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent">
          <ul class="dark:text-white" aria-labelledby="dropdownMenuLink">
            <li class="font-medium cursor-pointer" data-bs-toggle="modal" data-bs-target="#myModal">
              <a class=" flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700">
                <div class="mr-3">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                Profile
              </a>
            </li>
            <li class="font-medium cursor-pointer"  data-bs-toggle="modal" data-bs-target="#myModalpassword">
              <a class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700">
                <div class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 8 14 C 8.55 14 9 14.45 9 15 C 9 15.55 8.55 16 8 16 C 7.45 16 7 15.55 7 15 C 7 14.45 7.45 14 8 14 z M 12 14 C 12.55 14 13 14.45 13 15 C 13 15.55 12.55 16 12 16 C 11.45 16 11 15.55 11 15 C 11 14.45 11.45 14 12 14 z M 16 14 C 16.55 14 17 14.45 17 15 C 17 15.55 16.55 16 16 16 C 15.45 16 15 15.55 15 15 C 15 14.45 15.45 14 16 14 z"></path>
                </svg>
                </div>
                Password
              </a>
            </li>
            <hr class="dark:border-gray-700">
            <router-link to="/login"  @click.prevent="logOut">
            <li class="font-medium cursor-pointer">
              <a  class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600">
                <div class="mr-3 text-red-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </div>
                Logout
              </a>
            </li>
        </router-link>
          </ul>
        </div>
          </div>
    </div>
   </div>
   </div>
   </div>
<div class="md:flex">
   <aside id="default-sidebar" class="fixed top-0 left-0 z-[999] w-64 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div class="flex gap-3 h-16 flex-shrink-0 items-center bg-slate-50 px-3 shadow-xl z-50">
                            <img class="h-8 w-8 rounded-full object-cover" src="http://octalinfotech.com/img/octal-logo.png" alt="Your Company" />
                            <h1 class="text-black text-lg font-bold space-x-3">OCTAL INFOTECH</h1>
   </div>
   <div class="h-full px-3 py-4 overflow-y-auto flex flex-1 flex-col bg-gray-50 dark:bg-gray-800 shadow-xl fixed z-50 w-64">
      <ul class="font-medium  text-black text-lg">
                 <li  class="flex hover:bg-gray-400 hove rounded-md">  
                    <router-link to="/admin/dashboard" class="flex gap-3 items-center">
                      <i class="fa-solid fa-house text-red-500 text-[20px]"></i>
                      <div>Dashboard</div>
                    </router-link>
                </li> 
                  <li  class="flex hover:bg-gray-400 hove rounded-md">  
                    <router-link to="/admin/category" class="flex gap-3 items-center">
                      <i class="fa-solid fa-graduation-cap text-yellow-900	 text-[20px]"></i>
                      <div>Categories</div>
                    </router-link>
                </li>  
                   <li  class="flex hover:bg-gray-400 hove rounded-md">  
                    <router-link to="/admin/blog" class="flex gap-3 items-center">
                      <i class="fa-solid fa-cube text-purple-500 text-[20px]"></i>
                      <div>Blogs</div>
                    </router-link>
                </li>  
                   <li  class="flex hover:bg-gray-400 hove rounded-md">  
                    <router-link to="/admin/user" class="flex gap-3 items-center">
                      <i class="fa-solid fa-user text-green-600 text-[20px]"></i>
                      <div>Users</div>
                    </router-link>
                </li>
                     <li  class="flex hover:bg-gray-400 hove rounded-md">  
                    <router-link to="/admin/tag" class="flex gap-3 items-center">
                      <i class="fa-solid fa-tag text-blue-500 text-[20px]"></i>
                      <div>Tags</div>
                    </router-link>
                </li>   
                  <li  class="flex hover:bg-gray-400 hove rounded-md">  
                    <router-link to="/admin/contacts" class="flex gap-3 items-center">
                      <i class="fa-solid fa-clipboard text-[20px] text-gray-500"></i>
                      <div>Contacts</div>
                    </router-link>
                </li>
      </ul>
   </div>
</aside>
      </div>
    <div class="md:mx-64 mx-1.5 md:mr-0 min-h-screen bg-slate-100 bg-image">
      <router-view></router-view>
    </div>
<Modal />
</template>

<script setup>
import {ref} from 'vue'
import Modal from './Modal.vue';

const openModel = ref(false);

const logOut = () =>{
    localStorage.clear()
}

</script>


<style scoped>

</style>

