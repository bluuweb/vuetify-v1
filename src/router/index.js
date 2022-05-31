import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Crud from "../views/Crud.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import { currentUserPromise } from "../firebase";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
        meta: {
            auth: true,
        },
    },
    {
        path: "/crud",
        name: "crud",
        component: Crud,
        meta: {
            auth: true,
        },
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(async (to, from, next) => {
    // console.log("entraste al beforeEach");

    const requireAuth = to.meta.auth;
    const user = await currentUserPromise();
    // console.log("user desde router", user);

    if (requireAuth) {
        if (user) {
            console.log("Ruta protegida... existe el usuario");
            next();
        } else {
            console.log("no existe el usuario!!! 🤦‍♂️");
            next("/login");
        }
    } else {
        console.log("no es una ruta protegida");
        next();
    }
});

export default router;
