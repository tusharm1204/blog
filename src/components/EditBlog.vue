<template>
    <div class="mt-5 p-4 rounded border border-gray-200 bg-white shadow-sm  h-auto mx-3">
        <form>
            <div class="mt-8 grid lg:grid-cols-2 gap-4">
                <div>
                    <label for="name" class="text-sm  text-gray-700  mb-1 font-medium after:content-['*'] after:ml-0.5 after:text-red-500  flex">Title</label>
                    <input type="text" name="name" id="name" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500
                    focus:border-blue-500 text-gray-700 w-full"  v-model="title" placeholder="Enter your name" @input="slugifyTitle"/>

                    <!-- Error Message -->
                    <div class="input-errors text-red-700" >
                        <div class="error-msg">{{error?.title}}</div>
                    </div>
                </div>

                <div>
                    <label for="email" class="text-sm text-gray-700 flex mb-1 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Slug</label>
                    <input type="email" name="email" id="email" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 flex focus:ring-blue-500
                    focus:border-blue-500 text-gray-700 w-full" v-model="slug" placeholder="Enter Your Slug" />

                    <!-- Error Message -->
                    <div class="input-errors text-red-700">
                        <div class="error-msg">{{ error?.slug }}</div>
                    </div>
                </div>
                <div>
                    <label for="password" class="text-sm text-gray-700 flex mb-1 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">User</label>
                    <Multiselect v-model="users" :options="userOptions" placeholder="Select User" :closeOnSelect="true" :clearOnSelect="true" :searchable="true"></Multiselect>
                </div>
                   <div>
                    <label for="tag" class="text-sm text-gray-700 flex mb-1 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Tag</label>
                    <Multiselect v-model="tags" object :options="tagOptions" placeholder="Select Tag" :closeOnSelect="true" :clearOnSelect="true" :searchable="true" mode="tags"></Multiselect>
                </div>
                  
                  <div>
                    <label for="brithday" class="text-sm text-gray-700 flex mb-1 font-medium">Category</label>
                    <Multiselect v-model="categories" :options="categoryOptions" placeholder="Select Catagory" :closeOnSelect="true" :clearOnSelect="true" :searchable="true"></Multiselect>
                  </div>
                  
                  <div>
                    <label for="firstmobile " class="text-sm text-gray-700 flex mb-1 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Date</label>
                    <VueDatePicker v-model="date" :format="format"></VueDatePicker>
                  </div>
                  
                  <div>
                    <label for="Status" class="text-sm text-gray-700 flex mb-1 font-medium">Status</label>
                    <Multiselect v-model="status" :options="statusOpation" placeholder="Select Status" :closeOnSelect="true" :clearOnSelect="true" :searchable="true"></Multiselect>
                </div>
                <div>
                    <label class="text-sm text-gray-700 flex mb-1 font-medium">File</label>
                    <input class="bg-gray-100 border-2 rounded px-3 block focus:ring-blue-500 focus:border-blue-500 w-full" type="file" @change="addImage" />

                </div>
              </div>
              <div>
                  <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="description" class="mt-4"></vue-editor>
              </div> 

            <div class="space-x-4 mt-8 flex justify-end md:flex-col  flex-row">
              <button @click.prevent="upadatBlog" class="bg-slate-950 text-white rounded-sm text-center p-2">Submit</button>
                <router-link to="/admin/blog">
              <button class="bg-slate-950 text-white rounded-sm text-center p-2">Cancle</button>
                </router-link>
            </div>
        </form>
    </div>
    <!-- <div style="display: flex; justify-content: center;">
        <div class="container" style="margin-top:95px;">
            <h1 class="form-title">Upadate Blog</h1>
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
                        v-model="users"
                        :options="userOptions" placeholder="select opation" :closeOnSelect="true" :clearOnSelect="true" :searchable="true"   class="w-[11rem]">
                      </Multiselect>
                        <h4 class="error">{{ error.users }}</h4>
                    </div>
                    <div class="user-input-box">
                        <label for="phoneNumber">Tag</label>
                        <Multiselect style="display: flex;
                        margin-left:29px; width: 545px;border:1px solid;"
                        v-model="tags" object
                        :options="tagOptions" placeholder="select option" :closeOnSelect="true" :searchable="true" mode="tags" :multiple="true"  class="w-[11rem]">
                      </Multiselect>
                        <h4 class="error">{{ error.tags }}</h4>
                    </div>
               
                    <div class="user-input-box">
                        <label for="password">Categories</label>
                        <Multiselect style="display: flex;
                        margin-left:0px;width:543px;border:1px solid;"
                        v-model="categories"
                        :options="categoryOptions" placeholder="select opation" :closeOnSelect="true" :clearOnSelect="true" :searchable="true" class="w-[11rem]">
                      </Multiselect>
                        <h4 class="error">{{ error.categories }}</h4>
                    </div>
                    <div class="user-input-box">
                        <label for="confirmPassword">Date</label>
                        <VueDatePicker v-model="date"  :format="format" style="width: 545px;border: 1px solid;border-radius:5px;"></VueDatePicker>
                        <h4 class="error">{{ error.data }}</h4>
                    </div>
                    <div class="user-input-box">
                        <label for="confirmPassword">Image</label>
                        <input type="file" @change="addImage" style="background: white;"/>
                    </div>
                    <div class="user-input-box">
                        <label for="username">status</label>
                        <Multiselect
                        style="
                          display: flex;
                          margin-left: 26px;
                          width: 543px;
                          border: 1px solid;"
                        v-model="status"
                        :options="statusOpation"
                        placeholder="select opation"
                        :closeOnSelect="true"
                        :clearOnSelect="true"
                        :searchable="true"
                        class="w-[11rem]">
                        class="w-[11rem]">
                      </Multiselect>
                        <h4 class="error" style="margin-right: 195px;">{{ error.status }}</h4>
                    </div>
                    <div class="user-input-box" style="display: contents;">
                        <label for="Description">Description</label>
                        <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="description" style="width: 100%;"></vue-editor>
                        <h4 class="error">{{ error.description }}</h4>
                    </div>
                </div> 
                <div class="form-submit-btn " >
                    <button class="btn btn-success" @click.prevent="upadatBlog">
                        Update
                    </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button class="btn btn-danger" @click.prevent="backBlog">
                        Cancle 
                    </button>
                </div>
            </form>
        </div>
    </div> -->
    </template>
    
    <script setup>
import { VueEditor } from "vue3-editor";
import {ref, onMounted} from "vue";
import Multiselect from '@vueform/multiselect'
import axios from "axios";
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router';
import moment from 'moment';
import {useLoading} from 'vue-loading-overlay';
import { useToast } from "vue-toastification";
const  toast = useToast();
const $loading = useLoading({});
const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const addImage = (evt) =>{   
            const file = evt.target.files[0];
            url.value = URL.createObjectURL(file);
            files.value = file;
    };

     const files  = ref('')
     const url = ref('')   
     const router = useRouter();
     const error = ref({});
    const route = useRoute()
    const slug = ref('');
    const title = ref('');
    const users = ref('')
    const tags = ref([])
    const categories = ref(null)
    const categoryOptions = ref([])
    const date = ref(null)
    const tagOptions = ref([]);
    const userOptions = ref([])
     const description = ref('')
     const status = ref('')
    const statusOpation = ref('')


     const upadatBlog = () => {
         date.value = moment(date.value).format("YYYY-MM-DD");
         tags.value = tags.value.map((item) => item.value);
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        let token = user.token;

        let formValue = new FormData();
         formValue.append("user_id",users.value);
         formValue.append("title", title.value);
          tags.value.forEach((tags) => {
        
            formValue.append(`tag_ids[]`, tags);
          });
          formValue.append("category_id", categories.value);
          formValue.append("date", date.value);
          formValue.append("status", status.value === 'publish' ? 1 :2);
          formValue.append("description",description.value);
          formValue.append("image", files.value);
     
         
        axios.post(`https://blog-api-dev.octalinfotech.com/api/blogs/${route.params.id}/update` ,formValue,{
            headers: {
                      Authorization: `Bearer ${token}`,
                  },
        })
        .then((res) => {  
            console.log(res);
            toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
    });
        })
        .catch((err) => {
            toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });   
        })
        router.push({name: 'Blog'});          
     } 

     onMounted(async() => {
  const loader = $loading.show({
    loader: 'bars',
   color: '#1b9712',
   backgroundColor: '#fff',
   width:90,
    height:90,
  });
      await  getCategory()
      await  getTags();
      await  getUsers();
      await  getBlog();
      loader.hide();   
     })

     const getBlog = () => {
        let data = localStorage.getItem("user");
        data = JSON.parse(data);
        let token = data.token;

      axios.get(`https://blog-api-dev.octalinfotech.com/api/blogs/${route.params.id}/show`, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              })
        .then((res) => {
            title.value = res.data.data.title
            slug.value = res.data.data.slug
            users.value =  res.data.data.user_id
            tags.value = res.data.data.tag.map((value) => {return {label: value.name , value: value.id}})
            categories.value = res.data.data.category_id
            date.value = res.data.data.date
            description.value = res.data.data.description
            status.value  = res.data.data?.status == 1 ? 'publish' : 'unpublish' 
            console.log(res.data.data.status);
            statusOpation.value = ['publish','unpublish'];
            files.value = res.data.data.image
        })
        .catch((err) => {
            toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
        });
     }

    const getUsers = () => {
        let data = localStorage.getItem("user");
      data = JSON.parse(data);
      let token = data.token;

      axios
        .get("https://blog-api-dev.octalinfotech.com/api/users/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
            userOptions.value =   data.data.map((value) => {
        return {
          label: value.name,
          value: value.id,
        };
      });
        })
        .catch((err) => {
            toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
        });
    }
    const getTags = () => {
        let data = localStorage.getItem("user");
      data = JSON.parse(data);
      let token = data.token;
      axios
        .get("https://blog-api-dev.octalinfotech.com/api/tages/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
            tagOptions.value = data.data.map((value) => {
                return {
                    label: value.name,
                    value: value.id
                }
            })
            console.log(tagOptions.value);
        })
        .catch((err) => {
            toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
        });
    };


    const getCategory = () => {
        let data = localStorage.getItem("user");
      data = JSON.parse(data);
      let token = data.token;

      axios
        .get("https://blog-api-dev.octalinfotech.com/api/categories/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
            categoryOptions.value = data.data.map((value) => {
            return {
                label: value.name,
                value: value.id
            }
          })
        })
        .catch((err) => {
            toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
        });
    }
    </script>
    
    <style scoped>
    
    .error{
    color: #ea1d1d;;
    font-size: 20px;
    margin-left: 191px;
    margin-top: 11px;
    }
    .container {
        width: 1200px;
        max-width: 1200px;
        background-color: #fff;
        background-image: linear-gradient(hsla(0,0%,100%,1), #fff);
        padding: 28px;
        margin: 0 28px;
        border-radius: 10px;
        box-shadow: inset 0px 0px 5px slategrey;
        background-repeat: no-repeat;
    }
    .form-title {
        font-size: 26px;
        text-align: start;
        padding-bottom: 6px;
        color: #343a40;
        border-bottom: solid 1px white;
    }
    .main-user-info {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 20px 0;
    }
    .user-input-box:nth-child(2n) {
        justify-content: end;
    }   
    .user-input-box {
        display: flex;
        flex-wrap: wrap;
        width: 50%;
        padding-bottom: 15px;
    } 
    .user-input-box label {
        width: 95%;
        color: rgb(20, 17, 17);
        font-size: 15px;
        font-weight: 400;
        margin: 5px 0;
        text-align: initial;
    }
    .user-input-box input {
        height: 40px;
        width: 95%;
        border-radius: 7px;
        outline: none;
        border: 1px solid rgb(33, 39, 41);
        padding: 0 10px;
    }
    .gender-title {
        color: white;
        font-size: 24px;
        font-weight: 600;
        border-bottom: 1px solid white;
    }
    .gender-category {
        margin: 15px 0;
        color: white;
    }
    .gender-category label {
        padding: 0 20px 0 5px;
    }
    .gender-category label,
    .gender-category input,
    .form-submit-btn input {
        cursor: pointer;
    }
    .form-submit-btn {
        margin-top: 40px;
    }
    .form-submit-btn input {
        display: block;
        width: 100%;
        margin-top: 10px;
        font-size: 15px;
        padding: 10px;
        border: none;
        border-radius: 3px;
        color: rgb(209, 209, 209);
        background: rgba(63, 114, 76, 0.7);
    }
    .form-submit-btn input:hover {
        background: rgba(56, 204, 93, 0.7);
        color: rgb(255, 255, 255);
    }
    .select {
        background-color: rgb(121, 247, 247);
        border: none;
        border-radius: 5px;
        padding: 0 1em 0 0;
        margin: 0;
        width: 50%;
        font-family: inherit;
        font-size: inherit;
        cursor: inherit;
        line-height: inherit;
        height: 15%;
        z-index: 1;
    }
    @media (max-width: 600px) {
        .container {
            min-width: 280px;
        }
        .user-input-box {
            margin-bottom: 12px;
            width: 100%;
        }
        .user-input-box:nth-child(2n) {
            justify-content: space-between;
        }
        .gender-category {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
        .main-user-info {
            max-height: 380px;
            overflow: auto;
        }
                .main-user-info::-webkit-scrollbar {
            width: 0;
        }
    }
    </style>
    