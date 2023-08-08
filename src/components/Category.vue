<template>
<div>
    <button class="btn btn-success text-center addBtn" data-bs-toggle="modal" data-bs-target="#addCategory" @click="aadData">
        Add Category +
    </button>
</div>
<div class="mt-5">
    <table class="table table-bordered">
        <tr>

            <th>IMAGE</th>
            <!-- <th>NUMBER</th> -->
            <th>NAME</th>
            <th>ACTION</th>
        </tr>
        <tr v-for="datum in detail" :key="datum">
            <td><img :src="datum.image" alt="img" /></td>
            <td>{{datum.name }}</td>
            <td>
                <i class="fa-solid fa-pencil" data-bs-toggle="modal" data-bs-target="#addCategory" @click="editCategory(datum)"></i>
                <i class="fa-solid fa-trash" style="color: red" @click.prevent="deleteCategory(datum.id)"></i>
            </td>
        </tr>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
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
                    <h4 class="modal-title">{{ isEdit ? "Update category" : "Add category" }}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <label for="name">Name</label>
                    <input type="text" v-model="form.name"><br /><br />
                    <label for="file">File</label>
                    <input type="file" @change="addImage" style="width: 100%;" />
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
import axios from 'axios'
export default {
    name: 'Category-component',
    data() {
        return {
            totalPage: 0,
            currentPage: 1,
            detail: {},
            file: '',
            url: '',
            isEdit: false,
            form: {
                name: "",
                image: ''
            },
        }
    },
    watch: {
        currentPage(value) {
            console.log(value);
            this.getCategory(value);
        },
    },
    methods: {
        addImage: function (evt) {
            const file = evt.target.files[0]
            this.url = URL.createObjectURL(file);
            this.files = file
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
            console.log('tushar makwana');
        },
        addCategory() {
            if (!this.form.name) {
                console.log(this.form.name);
                this.error.form.name = ''
            }
            if (this.isEdit) {
                console.log(this.form);
                // return;
            }
            let data = localStorage.getItem("user");
            data = JSON.parse(data);
            let token = data.token;
            let formData = new FormData();
            formData.append('name', this.form.name)
            formData.append('image', this.files)

            axios
                .post(
                    "https://blog-api-dev.octalinfotech.com/api/categories/store", formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((data) => {
                    console.log(data.data.data);
                    this.getCategory();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        deleteCategory(id) {
            let data = localStorage.getItem("user");
            data = JSON.parse(data);
            let token = data.token;
            console.log(id);

            this.$swal
                .fire({
                    title: "Do you want to delete ?",
                    showCancelButton: true,
                    confirmButtonText: "Ok!",
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
                            .then(({
                                data
                            }) => {
                                this.$swal.fire("Deleted successfully!", "", "success");
                                this.getCategory();
                                this.detail = data.data.data;

                            })
                            .catch((err) => {
                                console.log(err);
                            });

                    } else if (result.isDenied) {
                        this.$swal.fire("Changes are not saved", "", "info");
                    }
                });
        },
        getCategory(page = 1) {
            let data = localStorage.getItem("user")
            data = JSON.parse(data);
            let token = data.token;
            // console.log(token);

            axios.get('https://blog-api-dev.octalinfotech.com/api/categories?page=' + page, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }).then(({
                data
            }) => {
                // console.log(data.data.data);
                this.totalPage = data.data.last_page;
                this.detail = data.data.data
            }).catch(err => {
                console.log(err);
            });
        }
    },
    mounted() {
        this.getCategory();
    }
}
</script>

<style scoped>
img {
    width: 90px;
    height: 90px;
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
    width: 64%;
    position: absolute;
    transform: translate(267px, 55px);
}

i {
    color: rgb(43, 81, 187);
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
</style>
