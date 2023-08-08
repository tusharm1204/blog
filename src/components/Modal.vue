<template>
  <div class="modal fade" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Profile</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <label for="name">Name</label>
          <input type="text" v-model="name"><br><br>
          <label for="email">Email</label>
          <input type="text"  v-model="email">>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger btns" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="myModalpassword">
    <div class="modal-dialog">
      <div class="modal-content">
  
        <div class="modal-header">
          <h4 class="modal-title">Change Password</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
  
        <div class="modal-body">
          <label for="name">Old Password</label>
          <input type="text"><br><br>
          <label for="email">Conform Password</label>
          <input type="text" ><br><br>
          <label for="email"> Password</label>
          <input type="text">
        </div>
  
        <div class="modal-footer">
          <button type="button" class="btn btn-danger btns" data-bs-dismiss="modal">Close</button>
        </div>
  
      </div>
    </div>
  </div>
  <!-- <template>
    <div >
  
  <div v-if="true" class="modal fade show" 
   tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" 
   style="display:block">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          
          <button type="button" @click="OpenCloseFun" class="btn-close" ></button>
        </div>
        <div class="modal-body">
         <slot></slot>
        </div>
        <div class="modal-footer">
          <button type="button"  @click="OpenCloseFun" :class="'btn btn-'+variant" >{{'close'}}</button>
        </div>
      </div>
    </div>
  </div>
  </div>
  </template> -->
  <!-- <div class="modal fade" id="addData">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add Tag</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <label for="name" style="font-size: 20px;">Name {{data}}</label>
          <input type="text" v-model="form.name"><br><br>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success buttons" @click="addTag" data-bs-dismiss="modal">Add Data</button>
          <button type="button" class="btn btn-danger btns" data-bs-dismiss="modal" @click="$emit('close')">Close</button>
        </div>
  
      </div>
    </div>
  </div> -->
</template>

<script>
import axios from 'axios';

export default {
    name: 'Modal-component',
    emits: ['close'],
    props: ['data'],
    data() {
        return {
          OpenClose:this.visible,
            modalObj: null,
            open: false,
            name: 'Tushar Makwana',
            email: 'tusharm.octal8@gmail.com',
            form: {
                name: '',
            }
        }
    },
    methods: {
        addTag() {
            // console.log('tushar');
            let data = localStorage.getItem('user')
            data = JSON.parse(data);
            let token = data.token;
            axios.post('https://blog-api-dev.octalinfotech.com/api/tages/store',{ name:  this.form.name}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                })
                .then(data => {
                    console.log(data.data);
                    this.$emit('close')

                }).catch(err => {
                    console.log(err);
                });
        }
    },

}
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
label{
  display: flex;
  font-size: 27px;
}
</style>
