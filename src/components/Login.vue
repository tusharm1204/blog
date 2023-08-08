<template>
<div>
    <section class="vh-100" style="background-color: rgb(209 213 219);position: relative;">
        <div class="container py-5 h-100">
            <h2 :class="emailmsg ? 'email' : ''">{{emailmsg}}</h2>
            <h3 :class="successfully ? 'successfully' : '' ">{{successfully}}</h3>
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-xl-10">
                    <div class="card" style="border-radius: 1rem;">
                        <div class="row g-0">
                            <div class="col-md-6 col-lg-5 d-none d-md-block img">
                                <img src="https://media.licdn.com/dms/image/C4D22AQHT2dQkCmO04w/feedshare-shrink_800/0/1671471150892?e=1693440000&v=beta&t=kgZj6ILerKD6Lokv-TKmJ_csksyOMbfVNCvL-o1hin0" alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;height:633px;background-size: cover;width:500px;" />
                            </div>
                            <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                <div class="card-body p-4 p-lg-5 text-black">

                                    <form class="mx-auto col-10 col-md-8 col-lg-6">

                                        <div class="d-flex align-items-center mb-3 pb-1">
                                            <!-- <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i> -->
                                            <span class="h1 fw-bold mb-0">Octal Infotech</span>
                                        </div><br>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form2Example17">Email </label><br>
                                            <input type="email" id="form2Example17" class="form-control form-control-md" v-model="email" @input="emails" />
                                        </div>
                                        <h1>{{errors.email}}</h1>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form2Example27">Password</label>
                                            <input type="password" id="form2Example27" class="form-control form-control-md" v-model="password" @input="passwords" />
                                        </div>
                                        <h1>{{errors.password}}</h1>
                                        <div class="pt-1 mb-4">
                                            <button class="btn btn-dark btn-lg btn-block" type="button" @click="login" style="color:white;background:darkgrey;">Login</button>
                                        </div>
                                        <a class="small text-muted" href="#!" @click="modal">Forgot password?</a>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'LoginPage',
    props: {
        msg: String
    },

    data() {
        return {
            email: '',
            password: '',
            errors: {},
            emailmsg: '',
            successfully: ''

        }
    },
    methods: {
        login() {
            if (!this.email) {
                this.errors.email = 'missing a email !!'
            }

            if (!this.password) {
                this.errors.password = 'missing a password !!'
            }

            if (Object.keys(this.errors).length > 0) {
                return;
            }

            axios.post('https://blog-api-dev.octalinfotech.com/api/login', {
                email: this.email,
                password: this.password
            }).then((response) => {
                // console.log(response.data.message);
                if (response.data.data) {
                    localStorage.setItem('user', JSON.stringify(response.data.data));
                    this.$router.push({
                        name: 'Layout'
                    });
                    this.successfully = response.data.message
                    console.log(response.data.message);
                 
                } else {
                    // console.log(response.message);
                }
            }).catch(err => {
                console.log(err.response.data.message);
                this.emailmsg = err.response.data.message
                this.emailmsg = err.response.data.message
            });
        },

    },
    mounted() {

    }
}
</script>

<style scoped>
input {
    width: 323px;
}

h1 {
    color: red;
}

.email {
    position: absolute;
    top: 0;
    right: 0;
    background: red;
    color: white;
    padding: 15px;
}

.emailmsg {
    position: absolute;
    top: 0;
    right: 0;
    background: red;
    color: white;
    padding: 15px;
}

.successfully {
    position: absolute;
    top: 0;
    right: 0;
    background: green;
    color: white;
    padding: 15px;
}
</style>
