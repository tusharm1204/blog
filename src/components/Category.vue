<template>
    <div>
        <button class="btn btn-success text-center addBtn" data-bs-toggle="modal" data-bs-target="#addCategory" @click="aadData">
            Add Category +
        </button>
    </div>
    <div>
        <h1 class="categoty">CATEGORIES</h1>
    </div>
    <div class=" container">
    <table class="table divide-y divide-gray-200 rounded-lg bg-white shadow border-slate-400 ">
        <thead>
            <tr scope="row"> 
                <th style="text-align: center;">IMAGE</th>
                <th>NAME</th>
                <th>ACTION</th>
            </tr>
        </thead>
        <tbody>
            <tr  scope="col" v-for="datum in detail" :key="datum">
                <td style="text-align: center; justify-content: center; align-items: center; display: flex;"><img :src="datum.image" alt="img" /></td>
                <td>{{ datum.name }}</td>
                <td>
                    <i class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#addCategory" @click="editCategory(datum)"></i>
                    <i class="fa-solid fa-trash" style="color: red" @click.prevent="deleteCategory(datum.id)"></i>
                </td>
            </tr>
        </tbody>
        <nav aria-label="Page navigation example">
            <ul class="pagination" style="top:75px;left:740px;">
                <li class="page-item">
                    <a class="page-link" href="#" @click.prevent="handlePrev">Previous</a>
                </li>
                <li class="page-item" v-for="page in totalPage" :key="page">
                    <a class="page-link" href="#" @click.prevent="currentPage = page">{{
              page
            }}</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#" @click.prevent="handleNext">Next</a>
                </li>
            </ul>
        </nav>
      </table>
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
import {useLoading} from 'vue-loading-overlay'
const $loading = useLoading({});
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: "Category-component",
    data() {
        return {
            selected: null,
            totalPage: 0,
            currentPage: 1,
            detail: {},
            url: "",
            isEdit: false,
            form: {
                name: "",
                image: "",
            },
        };
    },
    watch: {
        currentPage(value) {
            console.log(value);
            this.getCategory(value);
        },
    },
    methods: {
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
        aditData() {
            console.log("tushar makwana");
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
                    this.getCategory();
                    toast.success(res.data.message, {
                        theme: 'colored',
                       position: toast.POSITION.TOP_RIGHT,
                   });
                })
                .catch((err) => {
                    toast.error(err.response?.data?.message, {
                     position: toast.POSITION.TOP_RIGHT,
                 });
                });
        },
        deleteCategory(id) {
            let data = localStorage.getItem("user");
            data = JSON.parse(data);
            let token = data.token;

            this.$swal
                .fire({
                    title: "Are you sure?",
                    icon: "warning",
                    text: "Are you sure that you want to leave this page?",
                    dangerMode: true,
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        axios
                            .delete(
                                `https://blog-api-dev.octalinfotech.com/api/categories/${id}/delete`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            )
                            .then(({res}) => {         
                                this.$swal.fire("Deleted successfully!", "", "success");
                                this.getCategory();
                                this.detail = res.data.data.data;
                                console.log(res.data.message);
                            })
                            .catch((err) => {
                                toast.error(err.response?.data?.message, {
                                 position: toast.POSITION.TOP_RIGHT,
                             });
                            });
                    } else if (result.isDenied) {
                        this.$swal.fire("Changes are not saved", "", "info");
                    }
                });
        },  
        getCategory(page = 1) {
            let data = localStorage.getItem("user");
            data = JSON.parse(data);
            let token = data.token;

            axios
                .get(
                    "https://blog-api-dev.octalinfotech.com/api/categories?page=" + page, {
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
                    toast.error(err.response?.data?.message, {
                       position: toast.POSITION.TOP_RIGHT,
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
img {
    width: 80px;
    height: 80px;
    background-size: cover;
    border-radius: 100%;
}

th,
td {
    padding: 15px;
    text-align: left;
    font-weight: bold;
}

table {
    margin-left: -301px;
    width: 83%;
    transform: translate(267px, 55px);
    position: absolute;
}
@media (max-width: 1000px){
    table {
        margin-left: -216px;
        width: 95%;
        transform: translate(267px, 55px);
        position: absolute;
    }
    .addBtn {
       margin-left: -225px;
    }
}

i {
    color: rgb(43, 81, 187);
    margin: 10px;
}

.addBtn {
    position: relative;
    padding: 8px;
    left: 700px;
    font-size: 18px;
    margin-top: 75px;
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

.imaprev {
    width: 250px;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}

.pagination {
    position: relative;
    top: 51px;
    justify-content: end;
}

.categoty{
    display: flex;
    justify-content: start;
    margin-left: 30px;
    font-size: 27px;
    font-weight: 800;
    margin-top: -25px;
  text-shadow: 0 0 2px;

}
</style>
