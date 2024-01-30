<template>
  <div class=" mx-auto max-w-full px-2 sm:px-6 md:px-8">
    <div class="py-5 px-2">
        <div class="px-2 lg:px-2">
            <div class="flow-root pb-10 px-2 bg-white shadow-md h-auto rounded p-2">
                <div class="xl:flex-row xl:justify-between lg:flex-row lg:justify-between flex flex-col  gap-3 items-center bg-white md:p-4 p-3">
               <div class="w-[14rem] ml-1">
                <Multiselect :value="selectedStatus"
                  :options="allOptions"  @change="showBlog" placeholder="select status" :closeOnSelect="true" :clearOnSelect="true" :searchable="true" >
                </Multiselect>
               </div>
                  <div class="mr-2">
                    <router-link to="/admin/creatblog">
                      <button class="bg-slate-950 text-white rounded-sm p-2" @click="addBlog">Add Blog</button>
                     </router-link>
                  </div>
               </div>
                <div class="overflow-x-auto w-full py-5">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 overflow-x-auto pb-3">
                        <div class="overflow-hidden sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-300 mt-5">
                                <thead >
                                    <tr class="border-b border-black/20">
                                        <th class="py-3.5 px-6 text-base font-semibold text-gray-900" >Avtar</th>
                                        <th class="py-3.5 px-6 text-base font-semibold text-gray-900" >User</th>
                                        <th class="py-3.5 px-6 text-base font-semibold text-gray-900" >Date</th>
                                        <th class="py-3.5 px-6 text-base font-semibold text-gray-900" >Title</th>
                                        <th class="py-3.5 px-6 text-base font-semibold text-gray-900" >Categories </th>
                                        <th class="py-3.5 px-6 text-base font-semibold text-gray-900">Status</th>
                                        <th class="py-3.5 px-6 text-base font-semibold text-gray-900 text-center">Action</th>
                                    </tr>
                                </thead>
                               <tbody>
                                <tr  v-for="(blogs) in blog" :key="blogs.id" class="border-b  bg-white">
                                    <template  v-if="blogs.status === selectedStatus || !selectedStatus">
                                      <td class="whitespace-nowrap px-4 py-3 text-md text-gray-500 items-center text-center justify-center flex">
                                        <img :src="blogs.image" class="w-8 h-8 rounded-full"></td>
                                        <td class="whitespace-nowrap px-4 py-3 text-md text-gray-500">
                                            {{ blogs.user_name }}</td>
                                        <td class="whitespace-nowrap px-4 py-3 text-md text-gray-500">
                                            {{ blogs.date }}</td>
                                             <td class="whitespace-nowrap px-4 py-3 text-md text-gray-500">
                                            {{ blogs.title }}</td>
                                            <td class="whitespace-nowrap px-3 py-4 text-md text-gray-500">
                                            {{ blogs.category_name }}</td>
                                            <td class="whitespace-nowrap px-4 py-4 text-md text-gray-500" v-if="blogs.status ===0">
                                              <button style="background: rgb(62, 149, 236);padding:7px;" @click="getBlogs(blogs.id)">Pending</button></td>
                                              <td v-else class="whitespace-nowrap px-4  text-md text-gray-500">
                                                <span class=""  style="color: black;" ><span class="badge rounded-pill" style="font-size: 14px;" :class="blogs.status === 1 ? 'green' : 'red'">{{ blogs.status === 1 ?'published':'unpublished'}}</span></span></td>
                                        <td class="relative whitespace-nowrap  text-sm font-medium space-x-2 text-center">
                                          <i class="fa-solid fa-pen-to-square text-indigo-500"  @click="editBlog(blogs)"></i>
                                           <i class="fa-solid fa-trash" style="color: red"   @click.prevent="deleteBlog(blogs.id)"></i>
                                           <router-link :to="`/admin/showBlog/${blogs.id}`"><i class="fa-solid fa-eye"></i></router-link>
                                        </td>
                                        </template>
                                    </tr>
                               </tbody>
                            </table>
                          </div>
                          <div class="flex justify-end mt-3">
                            <ul class="pagination  flex justify-end">
                              <li class="page-item">
                              <a class="page-link" href="#" @click.prevent="handlePrev">Previous</a>
                              </li>
                              <li class="page-item" v-for="page in totalPage" :key="page">
                              <a class="page-link" href="#" @click.prevent="currentPage = page">{{page}}</a>
                              </li>
                              <li class="page-item">
                              <a class="page-link" href="#" @click.prevent="handleNext">Next</a>
                              </li>
                              </ul>
                              </div>
                        </div>
                      </div>
                    </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import Multiselect from '@vueform/multiselect';
import { useRouter } from 'vue-router';
import axios from "axios";
import { ref, onMounted,watch} from "vue";
import { inject } from 'vue'
import {useLoading} from 'vue-loading-overlay';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const router = useRouter();
    
const $loading = useLoading({});
const swal = inject('$swal')
const blog = ref ({});
const totalPage = ref(0);
const currentPage = ref(1);
const selectedStatus = ref('');
const allOptions = ref(['all','publish','unpublish'])


watch (currentPage,(value) =>{
  console.log(value); 
      getBlog(value);
});

const handlePrev =() =>{
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const handleNext =() =>{
  if (currentPage.value < totalPage.value) {
        currentPage.value++;
      }

};

  const getBlog = async (page = 1) => {

   
    let data = localStorage.getItem("user");
      data = JSON.parse(data);
      let token = data.token;
      await axios.get("https://blog-api-dev.octalinfotech.com/api/blogs?page=" + page, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          )
        .then((res) => {
          totalPage.value = res.data.data.last_page;
          blog.value = res.data.data.data
        })
        .catch((err) => {
          toast.error(err.response?.data?.message, {
                        theme: 'colored',
                       position: toast.POSITION.TOP_RIGHT,
                   });
        });

       
  };

  const showBlog = (value) =>{
    if (value === 'publish') selectedStatus.value = 1
    if (value === 'unpublish') selectedStatus.value = 2
    if (value === 'all') selectedStatus.value = 0
  }
  const deleteBlog = async(id)=>{
  let data = localStorage.getItem("user");
      data = JSON.parse(data);
      let token = data.token;

      swal.fire({
          title: "Are you sure?",
          text: "Are you sure that you want to leave this page?",
          icon: "warning",
          dangerMode: true,
           })
        .then((result) => {
          if (result.isConfirmed) {            
            axios
              .delete(`https://blog-api-dev.octalinfotech.com/api/blogs/${id}/delete`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
              .then((res) => {
             swal.fire("Tag Deleted successfully!", "", "success");
             toast.success(res?.data?.message, {
                        theme: 'colored',
                       position: toast.POSITION.TOP_RIGHT,
                   });             
                   getBlog();
              })
              .catch((err) => {
                toast.error(err.response?.data?.message, {
                        theme: 'colored',
                       position: toast.POSITION.TOP_RIGHT,
                   });
              });
          } 
        });
}

const getBlogs = (id) =>{
        swal.fire({
          title: 'Approved?',
        text: "Are you want to really approved this record!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Publish',
        confirmButtonColor: '#00A300',
        cancelButtonText: 'Unpublish',
        cancelButtonColor: '#FF0000',
        reverseButtons: true,
})
.then((res)=>{
    let data = localStorage.getItem('user');
  data = JSON.parse(data);
  let token = data.token;
  let status = res.isConfirmed ? 1 : 2;
  console.log(status);
  axios.post(`https://blog-api-dev.octalinfotech.com/api/blogs/${id}/publish`, {status : status},{
    headers:{
      Authorization :`Bearer ${token}`,
    }
  })
  .then((res)=>{
    console.log(res);
    let message = res.isConfirmed ? 'Your file has been Publish.' : 'Your file has been Unpublish.'
    swal.fire(res.isConfirmed ? 'Publish!' : 'Unpublished!',message,'success' )
    getBlog();
  }).catch((err)=>{
    toast.error(err.response?.data?.message, {
                        theme: 'colored',
                       position: toast.POSITION.TOP_RIGHT,
     });
  })

})

}

const editBlog = (data) => {
  router.push({
                    name: 'EditBlog',
                    params: {id: data.id}
                });
}
    onMounted (async () =>{
      const loader = $loading.show({});
      await getBlog();
       loader.hide()
    })

</script>

<style scoped>

.red{
  background: rgb(255 151 151);
  text-align: center;
  color: black;
  text-decoration: none;
  cursor: pointer;
  transition-duration: 0.4s;
  box-shadow: 0 5px 2px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  
}
.green{
  background: rgb(135, 240, 135);
  text-align: center;
  text-decoration: none;
  color: black;
  cursor: pointer;
  transition-duration: 0.4s;
  box-shadow: 0 5px 2px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19); 

}
.btns {
    background: red;
  }
  .buttons {
    background: green;
  }
  input {
    color: black;
    border: 2px solid black;
    border-radius: 5px;
    height: 39px;
    width: 100%;
  } 
  label {
    display: flex;
    font-size: 16px;
  }

i {
    color: rgb(43, 81, 187);
    margin: 5px;
}
.color{
  color: red;
}
.reds{
  color: red;
}


</style>
