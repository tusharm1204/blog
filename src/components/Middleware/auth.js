export default function auth({next}) {
    let user = localStorage.getItem("user");
    console.log(user, 'data');

    if (user){
        return next();
    }
    return next({
        name:'LoginPage'
    })
}