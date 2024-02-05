
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
              <router-link :to="`/categories/${category.id}/blogs`"  class="flex items-center gap-2 text-white" :class="category.id == isAcive ? 'router-link-active' : ''">
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
    const isAcive = ref(null);

  onMounted(()=>{
    getCategories();
  });
  
  const getCategories  = (id) => {
    
  console.log(id);
  axios.get(`https://blog-api-dev.octalinfotech.com/api/categories/count` ,{
    headers : {
    token: '7ELX2CnkfqWpipzXNB5QV9sxSf4dPk'   
   }
})
.then((res) =>{
  categoryCount.value = res.data.data.data
}).catch((error)=>{
console.log(error);
})
}
    </script>
    
    <style scoped>
 .router-link-active {
    background-color: #f1f5f9!important;
    color: black!important;
}   
      </style>
      