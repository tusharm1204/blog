<template>
    <div v-if="form" style="display: flex; justify-content: center;">
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
                        :options="tagOptions" placeholder="select opation" :closeOnSelect="true" :searchable="true" mode="tags" :multiple="true"  class="w-[11rem]">
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
                        <VueDatePicker v-model="date" style="width: 545px;"></VueDatePicker>
                        <h4 class="error">{{ error.data }}</h4>
                    </div>
                    <div class="user-input-box">
                        <label for="confirmPassword">Image</label>
                        <input type="file" @change="addImage" style="background: white;"/>
                    </div>
                    <div class="user-input-box">
                        <label for="username">status</label>
                        <input type="text" id="username" name="username" placeholder="Enter your status" @input="input2" v-model="status"  />
                        <h4 class="error" style="margin-right: 195px;">{{ error.status }}</h4>
                    </div>
                    <div class="user-input-box" style="display: contents;">
                        <label for="Description">Description</label>
                        <textarea v-model="description" id="" cols="30" rows="10" style="width: 100%;border: 2px solid black;border-radius: 10px;" v-html="description"></textarea>
                        <h4 class="error">{{ error.description }}</h4>
                    </div>
                </div> 
                <div class="form-submit-btn " >
                    <button class="btn btn-success" @click.prevent="upadatBlog">
                        Update
                    </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button class="btn btn-danger" @click="backBlog">
                        Cancle 
                    </button>
                </div>
            </form>
        </div>
    </div>
    </template>
    
    <script setup>
    import {ref, onMounted} from "vue";
import Multiselect from '@vueform/multiselect'
import axios from "axios";
import { useRoute } from 'vue-router'
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useRouter } from 'vue-router';
import moment from 'moment';
import { createToaster} from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right", type: "success",});


const addImage = (evt) =>{   
            const file = evt.target.files[0];
            url.value = URL.createObjectURL(file);
            files.value = file;
    };

     const files  = ref('')
     const url = ref('')   
     const router = useRouter();
    const route = useRoute()
    const form = ref(true);
    const slug = ref('');
    const title = ref('');
    const error = ref({});
    const users = ref('')
    const tags = ref([])
    const categories = ref(null)
    const tagOptions = ref([]);
    const userOptions = ref([])
    const categoryOptions = ref([])
     const date = ref(null)
     const description = ref('')
     const status = ref('')

     const upadatBlog = () => {
        // console.log(route.params.id);
        date.value = moment(date.value).format('YYYY-MM-DD');
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        let token = user.token;
         let data = {
            category_id  : categories.value,
            user_id : users.value,
            tag_id : tags.value[0],
            title :title.value,
            description:description.value,
            status:status.value,
            date: date.value,
            Image:files.value
         }
         console.log(data);
        axios.post(`https://blog-api-dev.octalinfotech.com/api/blogs/${route.params.id}/update` ,data,{
            headers: {
                      Authorization: `Bearer ${token}`,
                  },
        })
        .then((res) => {
            console.log(res);
            console.log(data,'tushar');   
            toaster.show(res.data.message, {
            type: "success",
            position: "top-right",
        });
        })
        .catch((err) => {
            console.log(err);    
        })
        router.push({name: 'Blog'});          
     } 

     onMounted(() => {
        getCategory()
        getTags();
        getUsers();
        getBlog();
        
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
            console.log(res);
            title.value = res.data.data.title
            slug.value = res.data.data.slug
            users.value =  res.data.data.user_id
            tags.value = res.data.data.tag.map((tag) => {return {label: tag.name, value: tag.id}})
            console.log(tags.value);
            categories.value = res.data.data.category_id
            date.value = res.data.data.date
            description.value = res.data.data.description
            status.value = res.data.data.status
            console.log(res.data.data.category_name);
        })
        .catch((err) => {
          console.log(err);
        });
     }

     const backBlog = () => {
        router.push({name: 'Blog'});       
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
            console.log(data);
            userOptions.value =  [ { "label": "admin", "value": 1 }, { "label": "Kuldip", "value": 2 } ]
        })
        .catch((err) => {
          console.log(err);
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
        })
        .catch((err) => {
          console.log(err);
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
          console.log(err);
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
    