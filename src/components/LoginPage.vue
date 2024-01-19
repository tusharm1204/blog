<template>

    <!-- component -->
<div class="bg-gray-300 h-screen w-screen">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div class="flex shadow-lg w-full h-full md:h-[400px] md:w-full  lg:h-[400px] lg:w-full xl:h-[450px] xl:w-3/5 bg-white sm:mx-0">
            <div class="hidden md:block md:w-1/2" style="background: url('https://lh3.googleusercontent.com/p/AF1QipOMj-dseZ54sUzotNCrFSHiBnOGUrpI64eCxSzM=s680-w680-h510'); background-size: cover; background-position: center center;"></div>
            <div class="flex flex-col w-full md:w-1/2 p-4">
                <div class="flex flex-col flex-1 justify-center mb-8 items-center">
          <div class="flex gap-3 items-center">
            <div>
                        <img src="https://octalinfotech.com/img/octal-logo.png" alt="" class="h-8 w-8 rounded-full">
                    </div>
                 <div>
                    <h1 class="text-4xl text-center font-thin">Octal Infotech</h1>
                 </div>
          </div>
                    <div class="w-full mt-4">
                        <form class="form-horizontal w-3/4 mx-auto" method="POST" action="#">
                            <div class="flex flex-col mt-4">
                                <input id="email" type="text" class="flex-grow h-8 px-2 border rounded border-grey-400" name="email"  placeholder="Email" v-model="email" @change="emails">
                            </div>
                            <h1 class="error">{{errors.email}}</h1>
                            <div class="flex flex-col mt-4">
                                <input id="password" type="password" class="flex-grow h-8 px-2 rounded border border-grey-400" name="password" v-model="password" @change="passwords" placeholder="Password">
                            </div>
                    <h1 class="error">{{errors.password}}</h1>
                            <div class="flex items-center mt-4 gap-2">
                                <input type="checkbox" name="remember" id="remember" class="mr-2"> <label for="remember" class="text-sm text-grey-dark">Remember Me</label>
                            </div>
                        </form>
                   <div class="flex items-center mt-5 gap-3 justify-end">
                    <div class="">
                            <a class="no-underline hover:underline text-blue-dark text-md" href="#">
                                Forgot Your Password?
                            </a>
                        </div>
                        <div class="flex flex-col">
                            <button class="bg-black hover:bg-black w-24 py-2 p-3  text-white text-sm font-semibold rounded-sm" @click="login">
                                Login
                            </button>
                        </div>
                   </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- https://play.tailwindcss.com/MIwj5Sp9pw -->
<!-- <div class="py-16 px-5 mt-5">
    <div class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl sm:max-w-2xl py-5 mt-5 px-5">
        <div class="hidden lg:block lg:w-1/2 bg-cover"
            style="background-image:url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')">
        </div>
        <div class="w-1/2 ml-8">
            <h2 class="text-2xl font-semibold text-gray-700 text-center">Octal Infotech</h2>
            <div class="mt-4 flex items-center justify-between">
                <span class="border-b w-1/5 lg:w-1/4"></span>
                <a href="#" class="text-xs text-center text-gray-500 uppercase">or login with email</a>
                <span class="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <div class="mt-4 ml-2">
                <label class="block text-gray-700 text-sm font-bold mb-2 ">Email Address</label>
                <input class="bg-gray-200 text-gray-700 focus:outline-none  focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" />
            </div>
            <div class="mt-4">
                <div class="flex justify-between">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <a href="#" class="text-xs text-gray-500">Forget Password?</a>
                </div>
                <input class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" />
            </div>
            <div class="mt-8">
                <button class="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600" @click="login">Login</button>
            </div>
            <div class="mt-4 flex items-center justify-between">
                <span class="border-b w-1/5 md:w-1/4"></span>
                <a href="#" class="text-xs text-gray-500 uppercase">or sign up</a>
                <span class="border-b w-1/5 md:w-1/4"></span>
            </div>
        </div>
    </div>
</div> -->
<!-- <div class="main">
    <div class="body d-md-flex align-items-center justify-content-between">
        <div class="col-md-6 col-lg-5 d-none d-md-block img" style="width: 553px;">
            <img src="https://lh3.googleusercontent.com/p/AF1QipOMj-dseZ54sUzotNCrFSHiBnOGUrpI64eCxSzM=s680-w680-h510" alt="login form" class="img-fluid" style="height:559px;background-size: cover;width:600px;;" />
        </div>  
        <div class="col-md-6 col-lg-7 d-flex align-items-center">
            <div class="card-body p-4 p-lg-5 text-black">

                <form class="mx-auto col-10 col-md-8 col-lg-6">

                    <div class="flex flex-row md:flex-col align-items-center mb-3 pb-1 gap-3 items-center">
                    <img src="https://octalinfotech.com/img/octal-logo.png" alt="octal" class="w-8 h-8 rounded-full"/>
                        <h1 class="text-4xl">Octal Infotech</h1>
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example17" style="font-weight: 600">Email </label><br>
                        <input type="email" id="form2Example17" class="form-control form-control-md w-[17rem] py-1" v-model="email" @change="emails" />
                    </div>
                    <h1 class="error">{{errors.email}}</h1>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example27" style="font-weight: 600">Password</label>
                        <input type="password" id="form2Example27" class="form-control form-control-md w-[17rem] py-1" v-model="password" @change="passwords" />
                    </div>
                    <h1 class="error">{{errors.password}}</h1>
                    <div class="pt-1 mb-4">
                        <button class="btn btn-dark btn-lg btn-block loginButton" type="button" @click="login" style="12px;margin-left:30px;">Login</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</div> -->
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
        toast.error(err.response.data.message, {
                    position: "top-right",
                    timeout: 5000,
                    });
    });
}
</script>

<style scoped>
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



</style>
