<template>
    <v-app>
        <v-app-bar app class="orange darken-4" dark>
            <v-btn color="primary" to="/crud" v-if="user">
                <span class="mr-2">CRUD</span>
                <v-icon>mdi-bell-badge</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mr-2" to="/register" v-if="!user">
                <span class="mr-2">Register</span>
                <v-icon>mdi-bell-badge</v-icon>
            </v-btn>
            <v-btn color="primary" class="mr-2" to="/login" v-if="!user">
                <span class="mr-2">Login</span>
                <v-icon>mdi-bell-badge</v-icon>
            </v-btn>
            <v-btn color="primary" v-if="user" @click="cerrarSesion">
                <span class="mr-2">Logout</span>
                <v-icon>mdi-bell-badge</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <v-container>
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

export default {
    name: "App",
    data: () => ({
        user: null,
    }),
    created() {
        onAuthStateChanged(auth, (user) => {
            // console.log("desde observable", user);
            this.user = user;
        });
    },
    methods: {
        async cerrarSesion() {
            await signOut(auth);
            this.$router.push("/login");
        },
    },
};
</script>
