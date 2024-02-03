<template>
    <div class=" mx-auto max-w-full px-2 sm:px-6 md:px-8">
    <div class="py-5 px-2">
        <div class="px-2 lg:px-2">
            <div class="flow-root pb-10 px-2 bg-white shadow-sm h-auto rounded p-4">
                <div class="lg:flex-row md:flex-col sm:mt-0 sm:flex-none flex lg:justify-between lg:mr-5 xl:justify-between items-center flex-col gap-3">
                    <SearchBox @search="handleSeach"/>
                  <button class="bg-slate-950 text-white rounded-sm text-center p-2" data-bs-toggle="modal" data-bs-target="#addCategory" @click="aadData" >Add Category
                    </button>
               </div>
                <div class="overflow-x-auto">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 overflow-x-auto">
                        <div class="overflow-x-auto sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead class="border-b border-black/20">
                                    <tr>
                                        <th class="py-3.5 px-5 text-base font-semibold text-gray-900 w-[5%] text-center">Avtar</th>
                                        <th class="py-3.5 px-5 text-base font-semibold text-gray-900">Name</th>
                                        <th class="py-3.5 px-5 text-base font-semibold text-gray-900 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody v-if="detail && detail.length > 0" class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="catagory in detail" :key="catagory.id">
                                        <td class="whitespace-nowrap px-5 py-3 text-md text-gray-500 flex justify-center"><img :src="catagory.image" alt="img" class="w-10 h-10 rounded-full"/></td>
                                        <td class="whitespace-nowrap px-5 py-3 text-md text-gray-500">{{ catagory.name }}</td>
                                        <td class="relative whitespace-nowrap py-2 px-5 gap-2 flex justify-center  text-sm font-medium space-x-2 text-center">
                                          <i class="fa-solid fa-pen-to-square text-indigo-500" data-bs-toggle="modal" data-bs-target="#addCategory"  @click="editCategory(catagory)"></i>
                                           <i class="fa-solid fa-trash" style="color: red" @click.prevent="deleteCategory(catagory.id)"></i>
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
                        </div>
                        <div class="flex justify-between items-center mt-3 mx-3">
              <PageEvent @onChange="pageChange" />
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

<!--------create modal------>
<div>
    <div class="modal fade" id="addCategory">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">
                        {{ isEdit ? "Update category" : "Add category" }}
                    </h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <label for="name">Name</label>
                    <input type="text" v-model="form.name" /><br /><br />
                    <label for="file">File</label>
                    <input type="file" @change="addImage" style="width: 100%" />
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-success buttons" data-bs-dismiss="modal" @click="addCategory">
                        {{ isEdit ? "Update" : "Add" }}
                    </button>
                    <button type="button" class="btn btn-danger btns" data-bs-dismiss="modal" @click="conformDlt">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<!------------->
</template>



<script>
import axios from "axios";
import {useLoading} from 'vue-loading-overlay';
import { useToast } from "vue-toastification";
import SearchBox from "./SearchBox.vue";
import { PERPAGE } from '@/Constance/constance';
import PageEvent from "./PageEvent.vue";
const $loading = useLoading({});
const  toast = useToast();

export default {
    name: "Category-component",
    components:{SearchBox,PageEvent},
    data() {
        return {
            selected: null,
            totalPage: 0,
            currentPage: 1,
            detail: {},
            url: "",
            isEdit: false,
            page:1,
            form: {
                name: "",
                image: "",
            },
            perPage : PERPAGE,
        };
    },
    watch: {
        currentPage(value) {
            console.log(value);
            this.getCategory(value);
        },
    },
    methods: {
        handleSeach(value){
            this.getCategory(1,value)
        },

        pageChange(value){
            this.perPage =  parseInt(value)
            this.getCategory(1);
            console.log(value);
        },
        addImage: function (evt) {
            const file = evt.target.files[0];
            this.url = URL.createObjectURL(file);
            this.files = file;
        },
        handlePrev() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        handleNext() {
            if (this.currentPage < this.totalPage) {
                this.currentPage++;
            }
        },
        aadData() {
            this.isEdit = false;
            this.form = {
                name: "",
            };
        },
        editCategory(datum) {
            this.isEdit = true;
            this.form = datum;
        },
        addCategory() {
            if (!this.form.name) {
                this.error.form.name = "";
            }
            if (this.isEdit) {
                console.log(this.form);
            }
            let data = localStorage.getItem("user");
            data = JSON.parse(data);
            let token = data.token;
            let formData = new FormData();
            formData.append("name", this.form.name);
            formData.append("image", this.files);

            axios
                .post(
                    "https://blog-api-dev.octalinfotech.com/api/categories/store",
                    formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data.message);
                    this.getCategory();
                    toast.success(res.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
                })
                .catch((err) => {
                    toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
                });
        },
        deleteCategory(id) {
            let data = localStorage.getItem("user");
            data = JSON.parse(data);
            let token = data.token;

            this.$swal.fire({
                    title: "Are you sure?",
                    icon: "warning",
                    text: "Are you sure that you want to leave this page?",
                    dangerMode: true,
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`https://blog-api-dev.octalinfotech.com/api/categories/${id}/delete`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            )
                            .then((res) => {    
                                this.$swal.fire("Deleted successfully!", "", "success");
                                this.detail = res.data.data;
                                this.getCategory();
                                toast.success(res.data.message, {
                                position: "top-right",
                                timeout: 5000,
                                });
                               })
                            .catch((err) => {
                                toast.error(err.response.data.message, {
                               position: "top-right",
                               timeout: 5000,
                               });
                            });
                    } else if (result.isDenied) {
                        this.$swal.fire("Changes are not saved", "", "info");
                    }
                });
        },  
        getCategory(page,search = '') {
            let data = localStorage.getItem("user");
            data = JSON.parse(data);
            let token = data.token;

            axios
                .get(`https://blog-api-dev.octalinfotech.com/api/categories?page=${page}&per_page=${this.perPage}&search=${search}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then(({
                    data
                }) => {
                    this.totalPage = data.data.last_page;
                    this.detail = data.data.data;
                })
                .catch((err) => {
                    toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
                });
        },
    },
    mounted() {
        const loader = $loading.show({});
        this.getCategory();
        loader.hide();

    },
};
</script>


<style scoped>
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

</style>
