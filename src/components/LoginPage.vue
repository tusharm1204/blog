<template>
<div class="main">
    <div class="body d-md-flex align-items-center justify-content-between">
        <div class="col-md-6 col-lg-5 d-none d-md-block img" style="width: 553px;">
            <img src="https://lh3.googleusercontent.com/p/AF1QipOMj-dseZ54sUzotNCrFSHiBnOGUrpI64eCxSzM=s680-w680-h510" alt="login form" class="img-fluid" style="height:559px;background-size: cover;width:600px;;" />
        </div>  
        <div class="col-md-6 col-lg-7 d-flex align-items-center">
            <div class="card-body p-4 p-lg-5 text-black">

                <form class="mx-auto col-10 col-md-8 col-lg-6">

                    <div class="d-flex align-items-center mb-3 pb-1">
                    <img src="https://octalinfotech.com/img/octal-logo.png" alt="octal" class="imgOctal animate-bounce"/>
                        <h1 style="font-size:36px;font-weight: 600;font-family: math;margin-left:22px;">Octal Infotech</h1>
                    </div><br>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example17" style="font-weight: 600">Email </label><br>
                        <input type="email" id="form2Example17" class="form-control form-control-md" v-model="email" @change="emails" />
                    </div>
                    <h1 class="error">{{errors.email}}</h1>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example27" style="font-weight: 600">Password</label>
                        <input type="password" id="form2Example27" class="form-control form-control-md" v-model="password" @change="passwords" />
                    </div>
                    <h1 class="error">{{errors.password}}</h1>
                    <div class="pt-1 mb-4">
                        <button class="btn btn-dark btn-lg btn-block loginButton" type="button" @click="login" style="12px;margin-left:30px;">Login</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</div>
</template>

<script setup>
    import { ref} from "vue";
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import store from "../Vuex/store";
    import { useToast } from "vue-toastification";
    const  toast = useToast();
    const router = useRouter();
  

    let email = ref('');
    let password = ref('');
    let errors = ref({});
    

const login = () => {
   errors.value = {}
    if (!email.value) {
        errors.value.email = 'missing a email !!'
    }

    if (!password.value) {
        errors.value.password = 'missing a password !!'
    }
    if (Object.keys(errors.value).length > 0) {
        return;
    }

    axios.post('https://blog-api-dev.octalinfotech.com/api/login', {
        email: email.value,
        password: password.value
    }).then((response) => {
        store.commit('loginUser', response.data.data);
         toast.success(response.data.message, {
         position: "top-right",
         timeout: 5000,
         });
        router.push({name: 'Sidebar'});
    }).catch(err => {
        console.log(err);
        toast.error(err.response.data.message, {
           position: "top-right",
           timeout: 5000,
         });
    });
}
</script>

<style scoped>
.imgOctal {
    height: 32px;
    width: 32px;
    border-radius: 18px;
    background-size: cover;
}
.loginButton{
    background-color: hsla(0,0%,13%,1);
    border: none;
    color: white;
    padding: 13px 28px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    border-radius: 2px;
    cursor: pointer;
    transition-duration: 0.4s;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

.error {
    color: red;
    padding: 15px;
}
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

.container {
    margin: 50px auto;
}

.body {
    position: relative;
    width: 1116px;
    height: 560px;
    margin: 20px auto;
    border: 1px solid #dddd;
    border-radius: 2px;
    overflow: hidden;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    margin-top: 200px;
}

.box-1 img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.box-2 {
    padding: 10px;
}

.box-1,
.box-2 {
    width: 50%;
}

.h-1 {
    font-size: 24px;
    font-weight: 700;
}

.text-muted {
    font-size: 14px;
}

.container .box {
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid transparent;
    text-decoration: none;
    color: #615f5fdd;
}

.box:active,
.box:visited {
    border: 2px solid #ee82ee;
}

.box:hover {
    border: 2px solid #ee82ee;
}

.btn.btn-primary {
    background-color: transparent;
    color: #ee82ee;
    border: 0px;
    padding: 0;
    font-size: 14px;
}

.btn.btn-primary .fas.fa-chevron-right {
    font-size: 12px;
}

.footer .p-color {
    color: #ee82ee;
}

.footer.text-muted {
    font-size: 10px;
}

.fas.fa-times {
    position: absolute;
    top: 20px;
    right: 20px;
    height: 20px;
    width: 20px;
    background-color: #f3cff379;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fas.fa-times:hover {
    color: #ff0000;
}

@media (max-width:767px) {
    body {
        padding: 10px;
    }

    .body {
        width: 100%;
        height: 100%;
    }

    .box-1 {
        width: 100%;
    }

    .box-2 {
        width: 100%;
        height: 440px;
    }
}


input{
    width: 320px;
    height: 35px;
    border: 1px solid black;
    border-radius: 0px;
}
</style>
