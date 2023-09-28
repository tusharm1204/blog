<template>
    <h1>BLOG</h1>
<div>
  <div>
    <h1 style="margin-top:60px;" class="blog">BLOGS</h1>
  </div>
  <div>
    <router-link to="/admin/creatblog">
      <button class="btn btn-success mt-10 text-end btn" @click="addBlog">Add Blog +</button>
    </router-link>
  </div>
</div>
<div>  
  <Multiselect style="width:18%;margin-top:-35px;margin-right:0;"
  :value="selectedStatus"
  :options="allOptions"  @change="showBlog" placeholder="select status" :closeOnSelect="true" :clearOnSelect="true" :searchable="true" class="w-[11rem]">
</Multiselect>
</div>
  <div class="container">
    <table class="table divide-y divide-gray-200 rounded-lg bg-white shadow border-slate-400">
      <thead>
        <tr >
          <th class="padding" >User</th>
          <th class="padding" >Title</th>
          <th class="padding" >Categories </th>
          <th class="padding">Status</th>
          <th class="padding">ACTION</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(datum) in detail" :key="datum"  style="margin-top: 5px;">
          <template v-if="datum.status === selectedStatus || !selectedStatus">
          <td style="align-items: center;gap:25px;display: flex;margin-left: 89px;"><img :src="datum.image"><div>{{ datum.user_name }}<br>{{ datum.date }}</div></td>
          <td>{{ datum.title}}</td>
          <td>{{ datum.category_name}}</td>
          <td v-if="datum.status === 0"><button style="background: rgb(62, 149, 236);padding:7px;" @click="getBlogs(datum.id)">Pending</button></td>
          <td td v-else ><span class=""  style="color: black;" ><span class="badge rounded-pill" style="font-size: 14px;" :class="datum.status === 1 ? 'green' : 'red'">{{ datum.status === 1 ?'published':'unpublished'}}</span></span></td>
          <td>
            <i class="fa-solid fa-pen-to-square"  @click.prevent="editBlog(datum)"></i>
            <i class="fa-solid fa-trash" style="color: red" @click.prevent="deleteBlog(datum.id)"></i>
              <router-link :to="`/admin/showBlog/${datum.id}`"><i class="fa-solid fa-eye"></i></router-link>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
  <router-view></router-view>
</div>

</template>

<script setup>
import Multiselect from '@vueform/multiselect'
import { useRouter } from 'vue-router';
const router = useRouter();
import axios from "axios";
import { ref, onMounted} from "vue";
import { inject } from 'vue'
const swal = inject('$swal')
const detail = ref ({});
const selectedStatus = ref('');
const allOptions = ref(['all','publish','unpublish'])
  const store = () => {
    let data = localStorage.getItem("user");
      data = JSON.parse(data);
      let token = data.token;
      axios.get("https://blog-api-dev.octalinfotech.com/api/blogs?page=1&tag_id", {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          )
        .then((res) => {
          detail.value = res.data.data.data
        })
        .catch((err) => {
          console.log(err);
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
              .then(() => {
             swal.fire("Tag Deleted successfully!", "", "success");             
             store();
              })
              .catch((err) => {
                console.log(err);
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
  console.log(res);
  // if(res.isConfirmed){
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
    store();
  }).catch((err)=>{
    console.log(err);
  })

})

}

const editBlog = (data) => {
  router.push({
                    name: 'EditBlog',
                    params: {id: data.id}
                });
}
    onMounted (() =>{
    store();
    })

</script>

<style scoped>

.red{
  background: red;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition-duration: 0.4s;
  box-shadow: 0 5px 2px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  
}
.green{
  background: green;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition-duration: 0.4s;
  box-shadow: 0 5px 2px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19); 

}
.btn {
    float: right;
    margin: 41px;
    padding: 8px;
    margin-top: -36px;
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

 img {
    width: 70px;
    height: 70px;
    background-size: cover;
    border-radius: 100%;
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
.blog{
  display: flex;
  justify-content: start;
  margin-top: 50px;
  margin-left: 30px;
  font-size: 27px;
  font-weight: 700;
  text-shadow: 0 0 2px;

}

.table{
  display: table;
  width: 82%;
  position: absolute;
  margin-left: -23px;
  margin-top: 33px;
}
.padding{
 padding: 20px;
}
.cell-breakword{
  word-break: break-all;
  max-width: 5px;
}
</style>
