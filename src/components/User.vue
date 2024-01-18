<template>
<div class=" mx-auto max-w-full px-2 sm:px-6 md:px-8">
    <div class="py-5 px-2">
        <div class="px-2 lg:px-2">
            <div class="flow-root pb-10 px-2 bg-white shadow-sm  h-auto rounded p-4">
                <div class="lg:flex-row md:flex-col sm:mt-0 sm:flex-none flex lg:justify-end lg:mr-5 items-center flex-col gap-2">
                  <button class="bg-slate-950 text-white rounded-sm text-center p-2" data-bs-toggle="modal" data-bs-target="#addUsers" @click="addUsers" >Add User
                    </button>
               </div>
                <div class="overflow-x-auto">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 overflow-x-auto">
                        <div class="overflow-x-auto sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead class="border-b border-black/20">
                                    <tr>
                                        <th class="py-3.5 px-5 text-base font-semibold text-gray-900 w-[5%] text-center">Sr No.</th>
                                        <th class="py-3.5 px-5 text-base font-semibold text-gray-900">Name</th>
                                        <th class="py-3.5 px-5 text-base font-semibold text-gray-900">Email</th>
                                        <th class="py-3.5 px-5 text-base font-semibold text-gray-900 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody v-if="userName && userName.length > 0" class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="(user,index) in userName" :key="user.id">
                                        <td class="whitespace-nowrap px-2 py-3 text-sm text-gray-500 text-center">

                                            {{ (index + 1) }}</td>
                                        <td class="whitespace-nowrap px-2 py-3 text-md text-gray-500">
                                            {{ user.name }}</td>
                                            <td class="whitespace-nowrap px-2 py-3 text-md text-gray-500">
                                            {{ user.email }}</td>
                                        <td class="relative whitespace-nowrap py-2 pl-3 pr-6  text-sm font-medium space-x-2 text-center">
                                          <i class="fa-solid fa-pen-to-square text-indigo-500" data-bs-toggle="modal" data-bs-target="#updateUser" @click="updateUserField=user"></i>
                                           <i class="fa-solid fa-trash" style="color: red"   @click.prevent="delelteusers(user.id)"></i>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="11" class="text-center min-w-full h-12 text-2xl font-semibold">No matching records found</td>
                                    </tr>
                                </tbody>
                            </table>

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
  </div>

  <!-- <----------- modal -----> 

  <div class="modal fade" id="addUsers">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Add User</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <label for="name">Name</label>
        <input type="text" v-model="usersData.user_name">
        <label for="email">Email</label>
        <input type="text" v-model="usersData.user_email">
        <label for="password">Password</label>
        <input type="password" v-model="usersData.user_password">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success buttons" data-bs-dismiss="modal" @click="addUser" >Add
        </button>
        <button
          type="button" class="btn btn-danger btns" data-bs-dismiss="modal"> Cancel</button>
      </div>
    </div>
  </div>
</div>


  <div class="modal fade" id="updateUser">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Update User</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <label for="name">Name</label>
        <input type="text" v-model="updateUserField.name">
        <label for="email">Email</label>
        <input type="email" v-model="updateUserField.email">
        <label for="password">Password</label>
        <input type="password" v-model="updateUserField.password">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success buttons" data-bs-dismiss="modal" @click.prevent="updateUser">Update
        </button>
        <button
          type="button" class="btn btn-danger btns" data-bs-dismiss="modal" > Cancel</button>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>
import axios from "axios";
import {ref,onMounted,watch} from 'vue';
import { inject } from 'vue';
import {useLoading} from 'vue-loading-overlay';
import { useToast } from "vue-toastification";
const  toast = useToast();
    
const $loading = useLoading({});
const swal = inject('$swal')

const userName = ref({});
const totalPage = ref(0);
const currentPage = ref(1);
const usersData = ref({
  user_name : '',
  user_email : '',
  user_password : '',

})

const updateUserField = ref({
  user_name : '',
  user_email : '',
  user_password : '',

})

watch (currentPage,(value) =>{
  console.log(value);
      getuser(value);
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

const getuser = (page =1) =>{

    let  data = localStorage.getItem('user');
     data = JSON.parse(data);
    let  token = data.token  

    axios.get('https://blog-api-dev.octalinfotech.com/api/users?page'  + page, {
      headers :{
        Authorization : `Bearer  ${token}`
      }
    })
    .then((res) =>{
      totalPage.value = res.data.data.last_page;
      userName.value = res.data.data.data
    }).catch((err) =>{
      toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
    
  })
}

const addUsers = () =>{
  usersData.value.user_name = '' ;
  usersData.value.user_email = '' ;
  usersData.value.user_password = '' ;

}

const addUser = () => {
  let data = localStorage.getItem('user');
  data = JSON.parse(data);
  let token = data.token

  axios.post('https://blog-api-dev.octalinfotech.com/api/users/store' ,{
    name:usersData.value.user_name,
    email:usersData.value.user_email,
    password:usersData.value.user_password,
  }, {
    headers : {
      Authorization : `Bearer ${token}`
    }
  }).then((res) =>{
    toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
       });
       getuser();
    
  }).catch((err) =>{
    toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
    
  })
}

const delelteusers = (id) =>{
  let data = localStorage.getItem('user');
    data = JSON.parse(data);
    let token = data.token 

  swal.fire({
  title: "Are you sure?",
  text: "Are you sure that you want to leave this page?",
  icon: "warning",
  dangerMode: true,
})

   .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`https://blog-api-dev.octalinfotech.com/api/users/${id}/delete`,{
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((res) => {
             swal.fire("Tag Deleted successfully!", "", "success");
             toast.success(res.data.message, {
                position: toast.POSITION.TOP_RIGHT,
               });
             getuser();   
              })
              .catch((err) => {
                toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
              });
          } 
        });
}

const updateUser = () =>{

  let user = localStorage.getItem('user');
  user = JSON.parse(user);
  let token = user.token ;
  let data = {
      name : updateUserField.value.name,
      email : updateUserField.value.email,
      password : updateUserField.value.password,
    }
      axios.post(`https://blog-api-dev.octalinfotech.com/api/users/${updateUserField.value.id}/update` ,data,  {
        headers : {
          authorization : `Bearer ${token}`
        }
      }).then((res) =>{
        updateUserField.value = res.data.data
        toast.success(res.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
  
      }).catch((err) =>{
        toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
      })
}
onMounted(async() => {
  const loader = $loading.show({});
  await getuser();
 loader.hide();
  
})

</script>

<style scoped>
.btns {
  background: red;
}

.buttons {
  background: green;
  margin: 10px;
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
  font-size: 21px;
}


</style>
