<template>
<h1>BLOG</h1>
<div>
  <router-link to="/admin/creatblog">
    <button class="btn btn-success mt-10 text-end btn" @click="addBlog">Add Blog +</button>
  </router-link>
</div>
  <div>
    <table class="table">
        <tr>
          <th>Avtar</th>
          <th>Title</th>
          <th>Categories </th>
          <th>Description</th>
          <th>Status</th>
          <th>ACTION</th>
        </tr>
    
        <tr v-for="(datum) in detail" :key="datum">
          <td style="display:flex;justify-content:center;align-items: center;;"><img :src="datum.user_image"><div>{{ datum.user_name }}<br>{{ datum.date }}</div></td>
          <td>{{ datum.title}}</td>
          <td>{{ datum.category_name}}</td>
          <td ><pre v-html=" datum.description"></pre></td>
          <td>{{ datum.status}}</td>
          <td>
                <i class="fa-solid fa-pencil"  @click.prevent="editBlog(datum)"></i>
                <i class="fa-solid fa-trash" style="color: red" @click.prevent="deleteBlog(datum.id)"></i>
            </td>
        </tr>
    </table>
</div>
<div v-if="form" style="display: flex; justify-content: center;">
  <div class="container" style="margin-top:95px;">
      <h1 class="form-title">New Blog</h1>
      <form class="was-validated">
          <div class="main-user-info">
              <div class="user-input-box">
                  <label for="fullName">Title</label>
                  <input type="text" id="fullName" name="fullName" placeholder="Enter your title" v-model="title"  />
                  <h4 class="error">{{ error.title }}</h4>
              </div>
              <div class="user-input-box">
                  <label for="username">Slug</label>
                  <input type="text" id="username" name="username" placeholder="Enter your slug" v-model="slug"  />
                  <h4 class="error" style="margin-right: 195px;">{{ error.slug }}</h4>
              </div>
              <div class="user-input-box">
                  <label for="email">User</label>
                  <Multiselect style="display: flex;
                  margin-left:0px;width:543px;border:1px solid;"
                  v-model="User"
                  :options="userOptions" placeholder="select opation" :closeOnSelect="true" :clearOnSelect="true" :searchable="true"   class="w-[11rem]">
                </Multiselect>
                  <h4 class="error">{{ error.User }}</h4>
              </div>
              <div class="user-input-box">
                  <label for="phoneNumber">Tag</label>
                  <Multiselect style="display: flex;
                  margin-left:29px; width: 545px;border:1px solid;"
                  v-model="Tags" object
                  :options="tagOptions" placeholder="select opation" :closeOnSelect="true" :searchable="true" mode="tags" :multiple="true"  class="w-[11rem]">
                </Multiselect>
                  <h4 class="error">{{ error.Tags }}</h4>
              </div>
         
              <div class="user-input-box">
                  <label for="password">Categories</label>
                  <Multiselect style="display: flex;
                  margin-left:0px;width:543px;border:1px solid;"
                  v-model="Categories"
                  :options="categoryOptions" placeholder="select opation" :closeOnSelect="true" :clearOnSelect="true" :searchable="true" class="w-[11rem]">
                </Multiselect>
                  <h4 class="error">{{ error.Categories }}</h4>
              </div>
              <div class="user-input-box">
                  <label for="confirmPassword">Date</label>
                  <input type="date" id="confirmPassword" placeholder="Confirm Password" v-model="date" />
                  <h4 class="error">{{ error.data }}</h4>
              </div>
              <div class="user-input-box">
                  <label for="confirmPassword">Image</label>
                  <input type="file" @change="addImage" />
              </div>
              <div class="user-input-box">
                  <label for="username">status</label>
                  <input type="text" id="username" name="username" placeholder="Enter your status" @input="input2" v-model="status"  />
                  <h4 class="error" style="margin-right: 195px;">{{ error.status }}</h4>
              </div>
              <div class="user-input-box" style="display: contents;">
                  <label for="Description">Description</label>
                  <textarea v-model="description" id="" cols="30" rows="10" style="width: 100%;border: 2px solid black;border-radius: 10px;"></textarea>
                  <h4 class="error">{{ error.description }}</h4>
              </div>
          </div> 
          <div class="form-submit-btn " >
              <button class="btn btn-dark" @click.prevent="addBlog">
                  Save
              </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button class="btn btn-dark" >
                  Cancle 
              </button>
          </div>
      </form>
  </div>
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
}

</style>
