<template>
<button class="btn btn-success text-center addBtn" data-bs-toggle="modal" data-bs-target="#addData" @click="addData">
    Add Tags +
</button>
<table class="table table-bordered">
    <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>ACTION</th>
    </tr>
    <tr v-for="(tag, index) in tags" :key="tag.id">
        <td>{{ index + 1 }}</td>
        <td>{{ tag.name }}</td>
        <td>
            <i class="fa-solid fa-pencil" data-bs-toggle="modal" data-bs-target="#addData" @click="editTag(tag)"></i>
            <i class="fa-solid fa-trash" style="color: red" @click.prevent="deleteTags(tag.id)"></i>
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
                <input type="text" v-model="form.name" id="username" name="username" required>{{error.name}}<br /><br />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success buttons" data-bs-dismiss="modal" @click="addTag">
                    {{ isEdit ? "Update" : "Add" }}
                </button>
                <button type="button" class="btn btn-danger btns" data-bs-dismiss="modal" @click="conformDlt">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</div>
<!--  -->
</template>

<script>
import axios from "axios";

export default {
    name: "Tags-component",
    data() {
        return {
            totalPage: 0,
            currentPage: 1,
            isEdit: false,
            name: "",
            form: {
                name: "",
            },
            tags: {},
            open: true,
            error:{}
        };
    },
    props: {
        formName: String,
    },
    watch: {
        currentPage(value) {
            console.log(value);
            this.getTags(value);
        },
    },
    methods: {
        conformDlt() {
            console.log("conform delete");
        },
        addData() {
            this.isEdit = false;
            this.form = {
                name: "",
            };
        },
        handleSubmit() {
            console.log("submit");

            this.getTags();
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
        editTag(tag) {
            this.isEdit = true;
            this.form = tag;
        },
        addTag() {
            if(!this.form.name){
                        console.log(this.form.name);
                        this.error.form.name = ''
                    }
            if (this.isEdit) {
                console.log(this.form);
                return;
            }

            let data = localStorage.getItem("user");
            data = JSON.parse(data);
            let token = data.token;
            axios
                .post(
                    "https://blog-api-dev.octalinfotech.com/api/tages/store", {
                        name: this.form.name,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((data) => {     
                        console.log(data.data);
                        this.getTags();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getTags(page = 1) {
            this.tags = "";
            let data = localStorage.getItem("user");
            data = JSON.parse(data);
            let token = data.token;

            axios
                .get("https://blog-api-dev.octalinfotech.com/api/tages?page=" + page, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(({
                    data
                }) => {
                    // console.log(data);
                    this.totalPage = data.data.last_page;
                    this.tags = data.data.data;
                })
                .catch((err) => {
                    console.log(err);
                });
            this.tags = "";
        },
        deleteTags(id) {
            // if(!this.name){
            //     console.log(data.message);
            // }
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
                                `https://blog-api-dev.octalinfotech.com/api/tages/${id}/delete`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            )
                            .then(({
                                data
                            }) => {
                                this.$swal.fire("Deleted successfully!", "", "success");
                                this.getTags();
                                this.tags = data.data;

                            })
                            .catch((err) => {
                                console.log(err);
                            });

                    } else if (result.isDenied) {
                        this.$swal.fire("Changes are not saved", "", "info");
                    }
                });
        },
    },

    mounted() {
        this.getTags();
    },
};
</script>

<style scoped>
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

.addBtn {
    position: relative;
    padding: 11px;
    left: 700px;
    font-size: 18px;
    margin-top: 75px;
}
.error.message {
    color: red;
}
.pagination{
    position: relative;
    top: 51px;
    justify-content: end;
}
</style>
