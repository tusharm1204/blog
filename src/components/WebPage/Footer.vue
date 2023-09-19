<template>
<footer class=" text-center text-white" style="background: #212121">
    <div class="container p-4">
      <section class="mb-4" style="gap: 12px;justify-content: center;display: flex;">
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i class="fab fa-facebook-f"></i
        ></a>
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i class="fab fa-twitter"></i
        ></a>
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i class="fab fa-google"></i
        ></a>
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i class="fab fa-instagram"></i
        ></a>
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i class="fab fa-linkedin-in"></i
        ></a>
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i class="fab fa-github"></i
        ></a>
      </section>
        <div class="d-flex justify-content-center">
            <div class="col-sm-4 col-md-3 item mt-1">
                <h1>SERVICES</h1>
                <ul class="mt-2">
                    <li><a href="#" >Web design</a></li>
                    <li><a href="#">Development</a></li>
                    <li><a href="#">Hosting</a></li>
                </ul>
            </div>
            <div class="col-sm-4 col-md-3 item">
                <h1>ABOUT</h1>
                <ul class="mt-2">
                    <li><a href="#">Company</a></li>
                    <li><a href="#">Team</a></li>
                    <li><a href="#">Legacy</a></li>
                </ul>
            </div>
            <div class="col-sm-4 col-md-3 item">
                <h1>CAREERS</h1>
                <ul class="mt-2">
                    <li><a href="#">Job openings</a></li>
                    <li><a href="#">Employee success</a></li>
                    <li><a href="#">Benefits</a></li>
                </ul>
            </div>
        </div>
        <div class="mt-3">
            <p><i class="fa fa-location-arrow"></i> 9878/25 sec 9 rohini 35 </p>
            <p><i class="fa fa-phone"></i>  +91-9999878398  </p>
            <p><i class="fa fa fa-envelope"></i> octalinfotech@gmail.com</p>
        </div>
    </div>
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
      <a class="text-white" href="https://www.octalinfotech.com/">https://www.octalinfotech.com</a>
    </div>
   
  </footer>
  <!-- <vue-slider v-model="value" /> -->


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
 .head{
     display: flex;
     gap: 20px;
     justify-content: center;
     align-items: center;
 }
 </style>