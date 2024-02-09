<script setup>
import { VueEditor } from "vue3-editor";
import Multiselect from "@vueform/multiselect";
import axios from "axios";
import { useRouter } from "vue-router";
import "@vuepic/vue-datepicker/dist/main.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import moment from "moment";
import { ref, onMounted } from "vue";
import {useLoading} from 'vue-loading-overlay';
import { useToast } from "vue-toastification";
const  toast = useToast();
const $loading = useLoading({});
const Joi = require("joi");

const router = useRouter();

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const formData = ref({
  title: "",
  slug: "",
  user_id: "",
  tag_ids: [],
  category_id: "",
  date: "",
  image: "",
  status: 0,
  description: "",

});

const tagOptions = ref([]);
const url = ref('');
const files = ref('');
const userOptions = ref([]);
const categoryOptions = ref([]);
const formErrors =  ref({});
const statusOpation = ref(['publish','unpublish'])
function slugify(str) {
  return String(str)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
}

const slugifyTitle = (event) => {
  formData.value.slug = slugify(event.target.value);
};

const addImage = (evt) => {
  const file = evt.target.files[0];
  url.value = URL.createObjectURL(file);
  files.value = file;
};

onMounted(async() => {
  const loader = $loading.show({
    loader: 'bars',
   color: '#1b9712',
   backgroundColor: '#fff',
   width:90,
    height:90,
  });
 await getTags();
 await getCategory();
 await getUsers();
 loader.hide();
});

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
};

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
      userOptions.value = data.data.map((value) => {
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
};

// const backBlog = () => {
//   router.push({ name: "Blog" });
// };

const handleAddBlog = () => {
  formData.value.date = moment(formData.value.date).format("YYYY-MM-DD");
  formData.value.tag_ids = formData.value.tag_ids.map((item) => item.value);
  
  const schema = Joi.object({
    title: Joi.string().trim().required().max(100).label('Title'),
    slug: Joi.string().trim().required().max(100).label('Slug'),
    user_id: Joi.number().required().label('User'),
    tag_ids: Joi.array().required().label('Tag'),
    category_id: Joi.number().required().label('Categories'),
    description: Joi.string().trim().required().max(100).label('Description'),
  });

  const { error } = schema.validate(formData.value, {
    abortEarly: false,
    allowUnknown: true,
  });

  formErrors.value = {};
  
  error?.details.forEach((element) => {
    formErrors.value[element.path[0]] = element.message;
  });

  if(error?.details) return false;
  
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  let token = user.token;
  

  console.log(formData.value.tag_ids);
  let formValue = new FormData();
  formValue.append("title", formData.value.title);
  formValue.append("user_id", formData.value.user_id);
  formData.value.tag_ids.forEach((tag_id) => {

    formValue.append(`tag_ids[]`, tag_id);
  });
  formValue.append("category_id", formData.value.category_id);
  formValue.append("date", formData.value.date);
  formValue.append("status", formData.value.status === 'publish' ? 1 :2);
  formValue.append("description", formData.value.description);
  formValue.append("image", files.value);

  if(!Object.keys(formErrors.value).length){
    axios
    .post("https://blog-api-dev.octalinfotech.com/api/blogs/store", formValue, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data.message);
      toast.success(res.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
      router.push({ name: "Blog" });
    })
    .catch((err) => {
      toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
    });
  }
};
</script>
    

<template>
   <div class="mt-5 p-4 rounded border border-gray-200 bg-white shadow-sm  h-auto mx-3">
        <form>
            <div class="mt-8 grid lg:grid-cols-2 gap-4">
                <div>
                    <label for="name" class="text-sm  text-gray-700  mb-1 font-medium after:content-['*'] after:ml-0.5 after:text-red-500  flex">Title</label>
                    <input type="text" name="name" id="name" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500
                    focus:border-blue-500 text-gray-700 w-full"  v-model="formData.title" placeholder="Enter your name" @input="slugifyTitle"/>

                    <!-- Error Message -->
                    <div class="input-errors text-red-700" >
                        <div class="error-msg">{{formErrors?.title}}</div>
                    </div>
                </div>

                <div>
                    <label for="email" class="text-sm text-gray-700 flex mb-1 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Slug</label>
                    <input type="email" name="email" id="email" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 flex focus:ring-blue-500
                    focus:border-blue-500 text-gray-700 w-full" v-model="formData.slug" placeholder="Enter Your Slug" />

                    <!-- Error Message -->
                    <div class="input-errors text-red-700">
                        <div class="error-msg">{{ formErrors?.slug }}</div>
                    </div>
                </div>
                <div>
                    <label for="password" class="text-sm text-gray-700 flex mb-1 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">User</label>
                    <Multiselect v-model="formData.user_id" :options="userOptions" placeholder="Select User" :closeOnSelect="true" :clearOnSelect="true" :searchable="true"></Multiselect>
                </div>
                   <div>
                    <label for="tag" class="text-sm text-gray-700 flex mb-1 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Tag</label>
                    <Multiselect v-model="formData.tag_ids" object :options="tagOptions" placeholder="Select Tag" :closeOnSelect="true" :clearOnSelect="true" :searchable="true" mode="tags"></Multiselect>
                </div>
                  
                  <div>
                    <label for="brithday" class="text-sm text-gray-700 flex mb-1 font-medium">Category</label>
                    <Multiselect v-model="formData.category_id" :options="categoryOptions" placeholder="Select Catagory" :closeOnSelect="true" :clearOnSelect="true" :searchable="true"></Multiselect>
                  </div>
                  
                  <div>
                    <label for="firstmobile " class="text-sm text-gray-700 flex mb-1 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Date</label>
                    <VueDatePicker v-model="formData.date" :format="format"></VueDatePicker>
                  </div>
                  
                  <div>
                    <label for="Status" class="text-sm text-gray-700 flex mb-1 font-medium">Status</label>
                    <Multiselect v-model="formData.status" :options="statusOpation" placeholder="Select Status" :closeOnSelect="true" :clearOnSelect="true" :searchable="true"></Multiselect>
                </div>
                <div>
                    <label class="text-sm text-gray-700 flex mb-1 font-medium">File</label>
                    <input class="bg-gray-100 border-2 rounded px-3 block focus:ring-blue-500 focus:border-blue-500 w-full" type="file" @change="addImage" />

                </div>
              </div>
              <div>
                  <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="formData.description" class="mt-4"></vue-editor>
              </div> 

            <div class="space-x-4 mt-8 flex justify-end md:flex-col  flex-row">
              <button @click.prevent="handleAddBlog" class="bg-slate-950 text-white rounded-sm text-center p-2">Submit</button>
                <router-link to="/admin/blog">
              <button class="bg-slate-950 text-white rounded-sm text-center p-2">Cancle</button>
                </router-link>
            </div>
        </form>
    </div>
</template>
    
    <style scoped>
.error {
  color: #ea1d1d;
  font-size: 15px;
  margin-top: 11px;
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

.star {
  color: red;
}
</style>
    