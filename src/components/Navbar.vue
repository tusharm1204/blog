<template>
<div>
    <div class="dropdown">
        <img src="https://ca.slack-edge.com/T04HNPJ1PV3-U04L50M135K-e9c7087e3b5a-512" alt="" class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#myModal">Profile</a></li>
            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#myModalpassword">Change Password</a></li>
            <li>
                <router-link to="/login" @click.prevent="logOut">Logout</router-link>
            </li>
        </ul>
    </div>
</div>
<Modal />
</template>

    
<script setup>
import router from '@/Router'
import Modal from './Modal.vue'
import store from '../Vuex/store'

const logOut = () =>{
    store.commit('logOut')
    router.push({name:'LoginPage'})
}
</script>
 
<style scoped>
.navbar {
    padding: 19px;
    background: rgb(195, 223, 230);
}
.rounded-circle {
    height: 50px;
}
.dropdown-toggle{
    position: relative;
    height: 50px;
    border-radius: 100%;
}
.dropdown{
    background: #0d6efd;
    display: flex;
    justify-content: end;
    width: 97%;
    left: 46px;
    padding: 4px;
    position: fixed;
    z-index: 999;
}

@media (max-width:1000px){
    .dropdown{
        background: #0d6efd;
        display: flex;
        justify-content: end;
        width: 97%;
        left: 46px;
        padding: 4px;
        position: fixed;
        z-index: 999;
    }
}
</style>
