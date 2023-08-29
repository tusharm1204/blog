<template>
<div class="">
    <div class="container">
        <Navbar />
    </div>
    <div id="viewport">
        <div id="sidebar">
            <header class="flex bg-slate-50 px-3 shadow-sm" style="padding: 16px; gap: 5px">
                <div>
                    <img src="	https://octalinfotech.com/img/octal-logo.png" alt="octal" class="imgOctal" />
                </div>
                <div>
                    <h1 href="#" style="color: black">OCTAL INFOTECH</h1>
                </div>
            </header>
            <ul class="mt-5">
                <li style="padding-left: 10px">
                    <i class="fa-solid fa-house" style="color: rgb(212, 62, 62)"></i>
                    <router-link to="/admin/category">CATEGORY</router-link>
                </li>
                <li style="padding-right: 34px">
                    <i class="fa-solid fa-envelope" style="color: rgb(74, 65, 199)"></i>
                    <router-link to="/admin/blog">BLOG</router-link>
                </li>
                <li style="padding-right: 25px">
                    <i class="fa-solid fa-user" style="color: rgb(30, 138, 62)"></i>
                    <router-link to="/admin/user">USERS</router-link>
                </li>
                <li style="padding-right: 36px">
                    <i class="fa-solid fa-tag" style="color: rgb(235, 222, 40); font-size: 24px"></i>
                    <router-link to="/admin/tags">TAGS</router-link>
                </li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</div>
</template>

<script setup>
import Navbar from "./Navbar.vue";

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500");

body {
    overflow-x: hidden;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
}

#viewport {
    padding-left: 250px;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}

#content {
    width: 100%;
    position: relative;
    margin-right: 0;
}

#sidebar {
    z-index: 1000;
    position: fixed;
    left: 250px;
    width: 250px;
    height: 100%;
    margin-left: -250px;
    overflow-y: auto;
    background: hsl(240deg 34.73% 93%);
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    top: 0;
    box-shadow: 0px 0px 10px slategrey;

}

#sidebar header {
    background-color: #f8f9fa;
    font-size: 20px;
    line-height: 52px;
    text-align: center;
    color: black;
    font-weight: bold;
}

#sidebar header a {
    color: #fff;
    display: block;
    text-decoration: none;
}

#sidebar header a:hover {
    color: #181515;
}

#sidebar .nav a {
    background: none;
    border-bottom: 1px solid #455a64;
    color: black;
    font-size: 14px;
    padding: 16px 24px;
}

#sidebar .nav a:hover {
    background: none;
    color: #eceff1;
}

#sidebar .nav a i {
    margin-right: 16px;
}

.imgOctal {
    height: 26px;
    width: 30px;
    border-radius: 10px;
    background-size: cover;
}

ul :hover {
    text-align: justify;
    align-items: center;
    text-align: center;
    background: #f8f9fa;
    border-radius: 4px;
    gap: 10px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
}

ul {
    font-weight: bold;
    display: flex;
    flex-direction: column;
}

a {
    column-gap: 44px;
    display: flex;
    flex-direction: column;
}

li {
    display: flex;
    align-items: center;
    justify-content: center;
}

i {
    font-size: 20px;
}
</style>
