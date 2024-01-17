<template>

<div class=" mx-auto max-w-full px-2 sm:px-6 md:px-8">
    <div class="py-5 px-2">
        <div class="px-2 lg:px-2">
            <div class="flow-root pb-10 px-2 bg-white shadow-sm w-auto h-auto rounded p-4">
                <div class="lg:flex-row md:flex-col sm:mt-0 sm:flex-none flex lg:justify-end lg:mr-5 items-center flex-col gap-2">
                  <button class="bg-slate-950 text-white rounded-sm text-center p-2" data-bs-toggle="modal" data-bs-target="#addTag" @click="addData" >Add Tag
                    </button>
               </div>
                <div class="overflow-x-auto">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 overflow-x-auto">
                        <div class="overflow-x-auto sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead class="border-b border-black/20">
                                    <tr>
                                        <th class="py-3.5 px-2 text-base font-semibold text-gray-900">Name</th>
                                        <th class="py-3.5 px-2 text-base font-semibold text-gray-900 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody v-if="tags && tags.length > 0" class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="tag in tags" :key="tag.id">
                                        <td class="whitespace-nowrap px-2 py-3 text-md text-gray-500">
                                            {{ tag.name }}</td>
                                        <td class="relative whitespace-nowrap py-2 pl-3 pr-6  text-sm font-medium space-x-2 text-center">
                                          <i class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#addTag" @click="updateTags(tag)"></i>
                                           <i class="fa-solid fa-trash" style="color: red" @click.prevent="deleltetag(tag.id)"></i>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="11" class="text-center min-w-full h-12 text-2xl font-semibold">No matching records found</td>
                                    </tr>
                                </tbody>
                            </table>
                          </div>
                          <div class="flex justify-end mt-3">
                            <ul class="pagination  flex justify-end">
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
                              </div>
                        </div>
                      </div>
                      
                    </div>
        </div>
    </div>
  </div>

  <!-- <----------- modal -----> 

  <div class="modal fade" id="addTag">
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
</template>

<script setup>
import axios from "axios";  
import { onMounted, ref,watch} from "vue";
import { inject } from 'vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {useLoading} from 'vue-loading-overlay'
    
const $loading = useLoading({});
const swal = inject('$swal')

const totalPage = ref(0);
const currentPage = ref(1);
const isEdit = ref(false);
const form = ref ({name:''});
const tags = ref([]);
const error = ref([]);

const updateTag = ref({
  name:''
})

watch (currentPage,(value) =>{
  console.log(value);
      getTags(value);
});

const addData = () => {
  isEdit.value = false;
  form.value = {name: ''};
}

watch (currentPage,(value) =>{
  console.log(value);
  getTags(value);
});

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

const getTags = (page=1) =>{
  
  let user = localStorage.getItem('user');
  user = JSON.parse(user);
  let token = user.token ;

      axios.get("https://blog-api-dev.octalinfotech.com/api/tages?page=" + page ,{
        headers : {
          authorization : `Bearer ${token}`
        }
      }).then(({ data }) => {
          totalPage.value = data.data.last_page;
          tags.value = data.data.data;
        })
        .catch((err) => {  
          toast.error(err.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
         });
        });
      tags.value = [];
  
};

  
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
                    getTags();   
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
        
};

// const deleteTags = (id)=>{
//   let data = localStorage.getItem("user");
//       data = JSON.parse(data);
//       let token = data.token;

//       swal.fire({
//   title: "Are you sure?",
//   text: "Are you sure that you want to leave this page?",
//   icon: "warning",
//   dangerMode: true,
// })
//         .then((result) => {
//           if (result.isConfirmed) {
//             axios
//               .delete(
//                 `https://blog-api-dev.octalinfotech.com/api/tages/${id}/delete`,
//                 {
//                   headers: {
//                     Authorization: `Bearer ${token}`,
//                   },
//                 }
//               )
//               .then((res) => {
//              swal.fire("Tag Deleted successfully!", "", "success");
//              toast.success(res?.data?.message, {
//                position: toast.POSITION.TOP_RIGHT,
//               });
//                 getTags();   
//               })
//               .catch((err) => {  
//                 toast.error(err.response?.data?.message, {
//                position: toast.POSITION.TOP_RIGHT,
//               });
//               });
//           } 
//         });
// }


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
  /* width: 81%; */
  /* transform: translate(267px, 55px); */
  /* position: absolute; */
  margin-top: 27px;
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




.error.message {
  color: red;
}
i{
  margin: 10px;
}
.pagination {

  /* margin-left: 50px; */
  /* position: relative;
  top: 51px;
  justify-content: end; */
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
  th{
    font-weight: 800;
  }
  </style>
  