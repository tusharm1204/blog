export default function auth({next}) {
    let user = localStorage.getItem("user");

    if (user){
        return next();
    }
    return next({name:'LoginPage',})
}