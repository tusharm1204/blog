<template>
<footer class=" text-center text-white footer" style="background: #212121">
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
@media (max-width: 1200px){
    .footer{
        width: 145%;
    }
}
 </style>