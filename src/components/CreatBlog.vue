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
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
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
  const loader = $loading.show({});
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
      toast.error(err.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
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
      toast.error(err.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
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
      toast.error(err.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
    });
    });
};

const backBlog = () => {
  router.push({ name: "Blog" });
};

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
      toast.success(res?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
    });
      router.push({ name: "Blog" });
    })
    .catch((err) => {
      toast.error(err.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
    });
    });
  }
};
</script>
    

<template>
  <div style="display: flex; justify-content: center">
    <div class="container" style="margin-top: 95px">
      <h1 class="form-title">New Blog</h1>
      <form class="was-validated">
        <div class="main-user-info">
          <div class="user-input-box">
            <label for="fullName">Title<span class="star">*</span></label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your title"
              v-model="formData.title"
              @input="slugifyTitle"
            />
            <h6 class="error">{{ formErrors?.title }}</h6>
          </div>
          <div class="user-input-box">
            <label for="username">Slug<span class="star">*</span></label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your slug"
              v-model="formData.slug"
            />
            <h4 class="error" style="margin-right: 320px;">{{ formErrors?.slug }}</h4>
          </div>
          <div class="user-input-box">
            <label for="email">User<span class="star">*</span></label>
            <Multiselect
              style="
                display: flex;
                margin-left: 0px;
                width: 543px;
                border: 1px solid;
              "
              v-model="formData.user_id"
              :options="userOptions"
              placeholder="select opation"
              :closeOnSelect="true"
              :clearOnSelect="true"
              :searchable="true"
              class="w-[11rem]"
            >
            </Multiselect>
            <h6 class="error">{{ formErrors?.user_id }}</h6>
          </div>
          <div class="user-input-box">
            <label for="phoneNumber">Tag<span class="star">*</span></label>
            <Multiselect
              style="
                display: flex;
                margin-left: 29px;
                width: 545px;
                border: 1px solid;
              "
              v-model="formData.tag_ids"
              object
              :options="tagOptions"
              placeholder="select opation"
              :closeOnSelect="true"
              :searchable="true"
              mode="tags"
              :multiple="true"
              class="w-[11rem]"
            >
            </Multiselect>
            <h4 class="error" style="margin-right:430px;">{{ formErrors?.tag_id }}</h4>
          </div>

          <div class="user-input-box">
            <label for="password">Categories<span class="star">*</span></label>
            <Multiselect
              style="
                display: flex;
                margin-left: 0px;
                width: 543px;
                border: 1px solid;
              "
              v-model="formData.category_id"
              :options="categoryOptions"
              placeholder="select opation"
              :closeOnSelect="true"
              :clearOnSelect="true"
              :searchable="true"
              class="w-[11rem]"
            >
            </Multiselect>
            <h4 class="error">{{ formErrors?.category_id }}</h4>
          </div>
          <div class="user-input-box">
            <label for="confirmPassword">Date<span class="star">*</span></label>
            <VueDatePicker
              v-model="formData.date"
              :format="format"
              style="width: 545px;border: 1px solid;height: 44px;margin-top: 0px;border-radius: 5px;"
            ></VueDatePicker>
            <!-- <h4 class="error">{{ error.data }}</h4> -->
          </div>
          <div class="user-input-box">
            <label for="confirmPassword">Image<span class="star">*</span></label>
            {{ formData.image }}
            <input type="file" @change="addImage" style="background: white" />
          </div>
          <div class="user-input-box">
            <label for="username">status<span class="star">*</span></label>
            <Multiselect
            style="
              display: flex;
              margin-left: 26px;
              width: 543px;
              border: 1px solid;"
            v-model="formData.status"
            :options="statusOpation"
            placeholder="select opation"
            :closeOnSelect="true"
            :clearOnSelect="true"
            :searchable="true"
            class="w-[11rem]">
            class="w-[11rem]">
          </Multiselect>
            <h4 class="error" style="margin-right: 310px;">{{ formErrors?.status}}</h4>
          </div>
          <div class="user-input-box" style="display: contents">
            <label for="Description"
              >Description<span class="star">*</span></label>
            <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="formData.description"  style="width: 100%;"></vue-editor>
            <h4 class="error" >{{ formErrors?.description }}</h4>
          </div>
        </div>
        <div class="form-submit-btn">
          <button class="btn btn-success" @click.prevent="handleAddBlog">
            Save</button
          >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button class="btn btn-danger" @click="backBlog">Cancle</button>
        </div>
      </form>
    </div>
  </div>
  <h1 v-show="ok">Hello!</h1>
</template>
    
    <style scoped>
.error {
  color: #ea1d1d;
  font-size: 15px;
  margin-top: 11px;
}
.container {
  width: 1200px;
  max-width: 1200px;
  background-color: #fff;
  background-image: linear-gradient(hsla(0, 0%, 100%, 1), #fff);
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

.star {
  color: red;
}
</style>
    