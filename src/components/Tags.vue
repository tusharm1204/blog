<template>
  <div>TAGS</div>
  <button class="btn btn-success text-center buttos" data-bs-toggle="modal" data-bs-target="#addTags" @click="addTags" >Add Tag +
  </button>
  <div>
      <div class="tag">TAGS</div>
  </div>
  <div class="modal fade" id="addTags">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add Tag</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <label for="name">Name</label>
          <input type="text" v-model="tagsData.tag_name">
        </div>
  
        <div class="modal-footer">
          <button type="button" class="btn btn-success buttons" data-bs-dismiss="modal" @click="addtag" >Add
          </button>
          <button
            type="button" class="btn btn-danger btns" data-bs-dismiss="modal"> Cancel</button>
        </div>
  
      </div>
    </div>
  </div>
  <div class="modal fade" id="updateTags">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Update Tag</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <label for="name">Name</label>
          <input type="text" v-model="updateTag.name">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success buttons" data-bs-dismiss="modal" @click.prevent="updateTags">Update
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
          <th>ACTION</th>
        </tr>
      </thead>
     <tbody>
        <tr v-for="api in tagName" :key="api">
          <td >{{api.name}}</td>
          <td >
            <i class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#updateTags" style="margin:12px;" @click="updateTag=api"></i>
            <i class="fa-solid fa-trash" style="color: red" @click.prevent="deleltetag(api.id)"></i>
          </td>
      </tr>
    </tbody>
    </table>
  </div>
  
  </template>
  
  <script setup>
  import axios from "axios";
  import {ref,onMounted} from 'vue';
  import { inject } from 'vue';
  import {useLoading} from 'vue-loading-overlay';
  import { useToast } from "vue-toastification";
const  toast = useToast();
      
  const $loading = useLoading({});
  const swal = inject('$swal')
  
  const tagName = ref({});
  const tagsData = ref({
    tag_name : '',
  })
  const updateTag = ref({
    name : '',
  })
  const showTags = () =>{
  
      let  data = localStorage.getItem('user');
       data = JSON.parse(data);
      let  token = data.token  
  
      axios.get('https://blog-api-dev.octalinfotech.com/api/tages?page=1' , {
        headers :{
          Authorization : `Bearer  ${token}`
        }
      })
      .then((res) =>{
        tagName.value = res.data.data.data
      }).catch((err) =>{
        toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
      
    })
  }
  
  const addTags = () =>{
    tagsData.value.user_name = '' ;
  }
  
  const addtag = () => {
    let data = localStorage.getItem('user');
    data = JSON.parse(data);
    let token = data.token
  
    axios.post('https://blog-api-dev.octalinfotech.com/api/tages/store' ,{
      name:tagsData.value.tag_name,
    }, {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }).then((res) =>{
      toast.success(res.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
         showTags();
      
    }).catch((err) =>{
      toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
      
    })
  }
  
  const deleltetag = (id) =>{
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
                .delete(`https://blog-api-dev.octalinfotech.com/api/tages/${id}/delete`,{
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((res) => {
               swal.fire("Tag Deleted successfully!", "", "success");
               toast.success(res.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
                 showTags();   
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
  
  const updateTags = () =>{
  
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    let token = user.token ;
      let data = {
        name : updateTag.value.name,
      }
        axios.post(`https://blog-api-dev.octalinfotech.com/api/tages/${updateTag.value.id}/update` ,data,  {
          headers : {
            authorization : `Bearer ${token}`
          }
        }).then((res) =>{
          updateTag.value = res.data.data
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
    await showTags();
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
  .buttos {
      float: right;
      margin: 61px 68px;
      padding: 8px;
  }
  i {
    color: rgb(59, 112, 226);
  }
  .tag{
    display: flex;
    justify-content: start;
    margin-top: 50px;
    margin-left: 30px;
    font-size: 27px;
    font-weight: 800;
    text-shadow: 0 0 2px;
  }
  th{
    font-weight: 800;
  }
  </style>
  