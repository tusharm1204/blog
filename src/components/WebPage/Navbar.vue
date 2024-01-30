<template>
    <nav class="navbar" >
         <div class="navbar-container container">
             <input type="checkbox" name="" id="">
             <div class="hamburger-lines">
                 <span class="line line1"></span>
                 <span class="line line2"></span>
                 <span class="line line3"></span>
             </div>
             <ul class="menu-items">
                 <li><a href="#" class="p-4 font-semibold text-gray-600 ">Home</a></li>
                 <li><a href="#" class="p-4font-semibold text-gray-600 ">Category</a></li>
                 <li><a href="#" class="p-4 font-semibold text-gray-600 ">Blog</a></li>
                 <li><a href="#" class="p-4 font-semibold text-gray-600 ">Contact</a></li>
             </ul>
             <router-link to="/">
            <div class="head">
            <img src="https://octalinfotech.com/img/octal-logo.png" style="width: 40px;border-radius: 25px;" class=" w-10">
             <span class="ml-3 text-xl octal">Octal infotech</span>
            </div>
        </router-link>
         </div>
     </nav><br><br><br>

 </template>
 
   <script setup>

 
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
 .img{
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
     z-index: 999;
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
 .head{
     display: flex;
     gap: 20px;
     justify-content: center;
     align-items: center;
 }

 @media(max-width:770px){

    .head{
        margin-top: -525px;
        margin-left: -424px;
    }
 }
 </style>