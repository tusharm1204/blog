<template>
<div>USERS</div>
<button class="btn btn-success text-center buttos" data-bs-toggle="modal" data-bs-target="#addUsers" @click="addUsers" >Add User +
</button>
<div>
    <div class="user">USERS</div>
</div>
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
        <input type="text" v-model="updateUser.name">
        <label for="email">Email</label>
        <input type="email" v-model="updateUser.email">
        <label for="password">Password</label>
        <input type="password" v-model="updateUser.password">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success buttons" data-bs-dismiss="modal" @click.prevent="updateUsers">Update
        </button>
        <button
          type="button" class="btn btn-danger btns" data-bs-dismiss="modal" > Cancel</button>
      </div>

    </div>
  </div>
</div>
<div class="container">
  <table class="table divide-y divide-gray-200 rounded-lg bg-white shadow border-slate-400 ">
    <thead>

      <tr>
        <th>NAME</th>
        <th>EMAIL</th>
        <th>ACTION</th>
      </tr>
    </thead>
   <tbody>
      <tr v-for="api in userName" :key="api">
        <td >{{api.name}}</td>
        <td >{{api.email}}</td>
        <td >
          <i class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#updateUser" style="margin:12px;" @click="updateUser=api"></i>
          <i class="fa-solid fa-trash" style="color: red" @click.prevent="delelteusers(api.id)"></i>
        </td>
    </tr>
  </tbody>
  </table>
</div>

</template>

<script setup>
import axios from "axios";
import {ref,onMounted} from 'vue';
import { inject } from 'vue'
const swal = inject('$swal')
import { createToaster} from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right", type: "success",});

const userName = ref({});
const usersData = ref({
  user_name : '',
  user_email : '',
  user_password : '',

})
const updateUser = ref({
  user_name : '',
  user_email : '',
  user_password : '',

})
const showUsers = () =>{

    let  data = localStorage.getItem('user');
     data = JSON.parse(data);
    let  token = data.token  

    axios.get('https://blog-api-dev.octalinfotech.com/api/users' , {
      headers :{
        Authorization : `Bearer  ${token}`
      }
    })
    .then((res) =>{
      console.log(res);
      userName.value = res.data.data.data
    }).catch((err) =>{
    console.log(err);
    
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
    console.log(res);
    toaster.show(res.data.message, {
                    type: "success",
                    position: "top-right",
                    });
                    showUsers();
    
  }).catch((err) =>{
    console.log(err);
    
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
              .then(() => {
             swal.fire("Tag Deleted successfully!", "", "success");
             showUsers();   
              })
              .catch((err) => {
                console.log(err);
              });
          } 
        });
}

const updateUsers = () =>{

  let user = localStorage.getItem('user');
  user = JSON.parse(user);
  let token = user.token ;
    let data = {
      name : updateUser.value.name,
      email : updateUser.value.email,
      password : updateUser.value.password,
    }
      axios.post(`https://blog-api-dev.octalinfotech.com/api/users/${updateUser.value.id}/update` ,data,  {
        headers : {
          authorization : `Bearer ${token}`
        }
      }).then((res) =>{
        console.log(res);
        updateUser.value = res.data.data
        console.log(usersData);
        toaster.show(res.data.message, {
                    type: "success",
                    position: "top-right",
                    });
        
      })
}
onMounted(() => {
  showUsers();
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
.buttos {
    float: right;
    margin: 61px 68px;
    padding: 10px;
}
i {
  color: rgb(59, 112, 226);
}
.user{
  display: flex;
  justify-content: start;
  margin-top: 50px;
  margin-left: 30px;
  font-size: 27px;
  font-weight: 800;
  text-shadow: 0 0 2px;
}
</style>
