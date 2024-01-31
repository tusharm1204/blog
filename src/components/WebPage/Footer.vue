<!-- <template>
<div class=""> 
  <footer class="w-[100%] sm:w-[100%] text-center text-white   xl:w-[100%] lg:w-[100%] md:w-[100%]" style="background: #212121">
    <div class="container p-4">
      <section class="mb-4 flex gap-2 justify-center">
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
                <h1>Services</h1>
                <ul class="mt-2 text-white">
                    <li><a href="#" class="text-white" >Web design</a></li>
                    <li><a href="#" class="text-white">Development</a></li>
                    <li><a href="#" class="text-white">Hosting</a></li>
                </ul>
            </div>
            <div class="col-sm-4 col-md-3 item">
                <h1>About</h1>
                <ul class="mt-2">
                    <li><a href="#" class="text-white">Company</a></li>
                    <li><a href="#" class="text-white">Team</a></li>
                    <li><a href="#" class="text-white">Legacy</a></li>
                </ul>
            </div>
            <div class="col-sm-4 col-md-3 item">
                <h1>Categories</h1>
                <ul class="mt-2 text-sm flex justify-end flex-col">
            <li v-for="category in categoryCount" :key="category" class="flex gap-3 justify-center text-justify">
                <div class="text-white">{{category.name}}</div>
                <div class="text-white">({{category.blog_count}})</div>
            </li>
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
</div>


 </template>
 
   <script setup>
  import {ref,onMounted} from 'vue';
  import axios from 'axios';

 const categoryCount = ref('')
  onMounted(()=>{
    getCategories();
  })

  const getCategories  = (id) => {
    let data = localStorage.getItem("user");
  data = JSON.parse(data);
  let token = data.token;

  console.log(id);
  axios.get(`https://blog-api-dev.octalinfotech.com/api/categories/count` ,{
    headers: {
        Authorization: `Bearer ${token}`,
      },
})
.then((res) =>{
  categoryCount.value = res.data.data.data
}).catch((error)=>{
console.log(error);
})
}
 
   </script> -->
   <template>
    <div class=" bg-gray-800 mt-10">
        <div class="text-white flex gap-16 justify-center">
                  <div>
                    <div class="text-center mt-10 flex gap-3 items-center">
                      <div>
                          <img src="../../assets/octal_infotech-logo_480.png" alt="" class="w-[7rem] h-[4rem] rounded-xl object-cover">
                        </div>
                            <div>
                              <h3 class="text-4xl">Octal Infotech</h3>
                            </div>
                          </div>
                      
                  </div>
            
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4 mt-10">
            <div class="flex justify-center">
                            <ul class="space-y-4 text-sm">
                              <li>
                                <a href="#" class="font-medium text-white text-xl"> Company </a>
                              </li> 
                                  <li>
                                <a href="#" class="text-white transition hover:opacity-75"> About </a>
                              </li>
    
                              <li>
                                <a href="#" class="text-white transition hover:opacity-75"> Meet the Team </a>
                              </li>
    
                              <li>
                                <a href="#" class="text-white transition hover:opacity-75"> Accounts Review </a>
                              </li>
                            </ul>
                          </div>
    
            <div>
              <p class="font-medium text-white text-xl">Connect</p>
    
              <ul class="mt-6 space-y-4 text-sm">
                <li>
                  <a href="https://www.facebook.com/octalinfotech8" target="_blank"  class="text-white transition hover:opacity-75"><i class="fa-brands fa-facebook text-white p-1 rounded-md"></i> Facebook </a>
                </li>
    
                <li>
                  <a href="https://www.instagram.com/octal_infotech/" target="_blank" class="text-white transition hover:opacity-75"><i class="fa-brands fa-instagram text-white p-1 rounded-md"></i>  Instagram </a>
                </li>
    
                <li>
                  <a href="https://twitter.com/octal_infotech" target="_blank"  class="text-white transition hover:opacity-75"><i class="fa-brands fa-twitter text-white p-1 rounded-md"></i>  Twitter </a>
                </li>
                <li>
                  <a href="https://github.com/infoanil/octal"  target="_blank" class="text-white transition hover:opacity-75"><i class="fa-brands fa-github text-white p-1 rounded-md"></i>  GitHub </a>
                </li>
                 <li>
                  <a href="https://www.linkedin.com/company/octal-infotech" target="_blank"  class="text-white transition hover:opacity-75"><i class="fa-brands fa-linkedin text-white p-1 rounded-md"></i>  LinkedIn </a>
                </li>
              </ul>
            </div>
    
            <div>
              <p class="font-medium text-white text-xl">Categories</p>
              <ul class="text-sm">
            <li v-for="category in categoryCount" :key="category">
              <router-link :to="`/categories/${category.id}/blogs`"  class="flex items-center gap-2 text-white">
                <div>{{category.name}}</div>
                <div>({{category.blog_count}})</div>
              </router-link>
            </li>
          </ul> 
            </div>
          </div>    
        </div>
    </div>
    </template>
    
    <script setup>
   import {ref,onMounted} from 'vue';
  import axios from 'axios';

    
    const categoryCount = ref('');

  onMounted(()=>{
    getCategories();
  });
  
  const getCategories  = (id) => {
    let data = localStorage.getItem("user");
  data = JSON.parse(data);
  let token = data.token;

  console.log(id);
  axios.get(`https://blog-api-dev.octalinfotech.com/api/categories/count` ,{
    headers: {
        Authorization: `Bearer ${token}`,
      },
})
.then((res) =>{
  categoryCount.value = res.data.data.data
}).catch((error)=>{
console.log(error);
})
}
    </script>
    
    <style scoped>
    
      </style>
      