<template>
    <div class="modal fade" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Profile</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <label for="name">Name</label>
            <input type="text" v-model="profile.name" /><br /><br />
            <label for="email">Email</label>
            <input type="text" v-model="profile.email" />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger btns"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  <div class="modal fade" id="myModalpassword">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Change Password</h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div class="modal-body">
          <label for="name">Old Password</label>
          <input type="text" /><br /><br />
          <label for="email">Conform Password</label>
          <input type="text" /><br /><br />
          <label for="email"> Password</label>
          <input type="text" />
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger btns"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref } from "vue" ;

const profile = ref ({
  name:'',
  email:''
})
 

  let data = localStorage.getItem('user')
    data = JSON.parse(data)
    profile.value.name = data.name
    profile.value.email = data.email

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
