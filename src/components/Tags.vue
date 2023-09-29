<template>
  <div>TAGS</div>
  <button class="btn btn-success text-center buttos" data-bs-toggle="modal" data-bs-target="#addData" @click="addData" >Add Tag +
  </button>
  <div>
    <div class="tags">TAGS</div>
</div>
  <div class="container">
    <table class="table divide-y divide-gray-200 rounded-lg bg-white shadow border-slate-400 ">
      <thead>

        <tr>
          <th style="text-align: center;">NAME</th>
          <th>ACTION</th>
        </tr>
      </thead>
     <tbody>
      <template v-if="tags.length > 0">
        <tr v-for="(tag) in tags" :key="tag">
          <td style=" text-align: center; justify-content: center; align-items: center;">{{ tag.name }}</td>
          <td>
            <i class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#addData" @click="editTag(tag)"></i>
            <i class="fa-solid fa-trash" style="color: red" @click.prevent="deleteTags(tag.id)"></i>
          </td>
        </tr>
      </template>
    </tbody>
    <nav aria-label="Page navigation example">
      <ul class="pagination" style="top: 70px;left: 400px;">
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
    </nav>
    </table>
  </div>

  <!-- Create modal -->
  <div class="modal fade" id="addData">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ isEdit ? "Update tag" : "Add tag" }}</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <label for="name" style="font-size: 20px">Name</label>
          <input  type="text"  v-model="form.name" id="username" name="username" />{{ error.name }}<br /><br />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success buttons" data-bs-dismiss="modal" @click="addTag" > {{ isEdit ? "Update" : "Add" }}
          </button>
          <button
            type="button" class="btn btn-danger btns" data-bs-dismiss="modal" @click="conformDlt"> Cancel</button>
        </div>
      </div>
    </div>
  </div>
  <!--  -->
</template>

<script setup>
import axios from "axios";  
import { onMounted, ref,watch} from "vue";
import { inject } from 'vue'
import { createToaster} from "@meforma/vue-toaster";
import {useLoading} from 'vue-loading-overlay'
    
const $loading = useLoading({});
const toaster = createToaster({ position: "top-right", type: "success",});
const swal = inject('$swal')

const totalPage = ref(0);
const currentPage = ref(1);
const isEdit = ref(false);
const form = ref ({name:''});
const tags = ref([]);
const error = ref([]);

watch (currentPage,(value) =>{
  console.log(value);
      getTags(value);
});

const addData = () => {
  isEdit.value = false;
  form.value = {name: ''};
}

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

const editTag = (tag) =>{
  isEdit.value = true;
      form.value = tag;
};

const addTag = ()  =>{
  if (!form.value.name) {
        console.log(form.value.name);
        error.value.form.name = [];
      }
      if (isEdit.value) {
        isEdit.value = true;
      }

      let data = localStorage.getItem("user");
      data = JSON.parse(data);
      let token = data.token;
      axios
        .post(
          "https://blog-api-dev.octalinfotech.com/api/tages/store", 
          {
            name: form.value.name,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          toaster.show(res.data.message, {
                    type: "success",
                    position: "top-right",
                    });
          getTags();
        })
        .catch((err) => {
          console.log(err);
        });
};

const getTags =  (page = 1) =>{
        tags.value =[];
      let data = localStorage.getItem("user");
      data = JSON.parse(data);
      let token = data.token;

      axios
        .get("https://blog-api-dev.octalinfotech.com/api/tages?page=" + page, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          // console.log(data);
          totalPage.value = data.data.last_page;
          tags.value = data.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      tags.value = [];
};

const deleteTags = (id)=>{
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
              .delete(
                `https://blog-api-dev.octalinfotech.com/api/tages/${id}/delete`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(() => {
             swal.fire("Tag Deleted successfully!", "", "success");
                getTags();   
              })
              .catch((err) => {
                console.log(err);
              });
          } 
        });
}


onMounted (async()=>{
  const loader = $loading.show({});
 await getTags()
 loader.hide();
})

</script>

<style scoped>
th,
td {
  padding: 15px;
  text-align: left;
  font-weight: bold;
}

table {
  margin-left: -276px;
  width: 81%;
  transform: translate(267px, 55px);
  position: absolute;
  margin-top: 20px;
}

i {
  color: rgb(59, 112, 226);
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
  font-size: 27px;
}

li {
  display: flex;
}


.buttos {
    float: right;
    margin: 51px 68px;
    padding: 8px;
}


.error.message {
  color: red;
}
i{
  margin: 10px;
}
.pagination {
  position: relative;
  top: 51px;
  justify-content: end;
}

.tags{
    display: flex;
    justify-content: start;
    margin-top: 50px;
    margin-left: 30px;
    font-size: 27px;
    font-weight: 800;
    text-shadow: 0 0 2px;
  }


@media (max-width:1000px) {
  .buttos {
    position: relative;
    padding: 11px;
    left: 500px;
    font-size: 18px;
    margin-top: 75px;
    margin-left: 40px;
  }
}

</style>
