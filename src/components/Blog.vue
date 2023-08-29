<template>
<h1>BLOG</h1>
<div>
  <router-link to="/admin/creatblog">
    <button class="btn btn-success mt-10 text-end btn" @click="addBlog">Add Blog +</button>
  </router-link>
</div>
  <div class="container">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Avtar</th>
          <th>Title</th>
          <th>Categories </th>
          <th>Description</th>
          <th>Status</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody >
        <tr v-for="(datum) in detail" :key="datum">
          <td style="display:flex;justify-content:center;align-items: center;"><img :src="datum.user_image"><div>{{ datum.user_name }}<br>{{ datum.date }}</div></td>
          <td>{{ datum.title}}</td>
          <td>{{ datum.category_name}}</td>
          <td ><pre v-html=" datum.description"></pre></td>
          <td>{{ datum.status}}</td>
          <td>
                <i class="fa-solid fa-pencil"  @click.prevent="editBlog(datum)"></i>
                <i class="fa-solid fa-trash" style="color: red" @click.prevent="deleteBlog(datum.id)"></i>
            </td>
        </tr>
      </tbody>
    </table>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import axios from "axios";
import { ref, onMounted} from "vue";
import { inject } from 'vue'
const swal = inject('$swal')

     const detail = ref ({});
 
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
.btn {
    float: right;
    margin: 61px 68px;
    padding: 10px;
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
    width: 83px;
    height: 83px;
    background-size: cover;
    border-radius: 100%;
}
i {
    color: rgb(43, 81, 187);
    margin: 10px;
}

</style>
