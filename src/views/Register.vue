<template>
    <h1>Register</h1>
</template>
<template>
    <div>
        <h1 class="text-center mt-5">Register</h1>
        <!-- {{ valid }} - {{ user }} -->
        <v-form v-model="valid" ref="formRegister">
            <v-row justify="center">
                <v-col cols="8" md="4">
                    <v-text-field
                        v-model="user.name"
                        label="Name"
                        :rules="nameRules"
                    />
                    <v-text-field
                        v-model="user.email"
                        label="Email"
                        :rules="emailRules"
                    />
                    <v-text-field v-model="user.password" label="Password" />
                    <v-text-field
                        v-model="user.repassword"
                        label="Repassword"
                    />
                    <v-btn
                        color="primary"
                        class="mr-2"
                        :disabled="!valid"
                        @click="registerUser"
                        >Register</v-btn
                    >
                    <v-btn color="error" @click="reset">Reset</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default {
    data() {
        return {
            valid: false,
            user: {
                email: "dirk@test.com",
                password: "123123",
                repassword: "123123",
                name: "Dirk",
            },
            emailRules: [
                (v) => (v && !!v.trim()) || "Escribe algo, no espacios!",
                (v) => !!v || "No existe",
                (v) =>
                    /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) ||
                    "Formato de email incorrecto",
            ],
            // passwordRules: [
            //     (v) => !!v || "No existe",
            //     (v) => (v && v.length > 5) || "Email sobre 6 carácteres",
            // ],
            // repasswordRules: [
            //     (v) => !!v || "No existe",
            //     (v) =>
            //         v === this.user.password || "No coinciden las contraseñas",
            // ],
            nameRules: [(v) => !!v || "No existe"],
        };
    },
    methods: {
        async registerUser() {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    this.user.email,
                    this.user.password
                );
                console.log(userCredential);
                this.$router.push("/crud");
            } catch (error) {
                console.log(error.code);
                switch (error.code) {
                    case "auth/email-already-in-use":
                        alert("El correo ya está siendo utilizado");
                        break;
                    case "auth/weak-password":
                        alert("Contraseña minimo 6 carácteres");
                        break;
                    default:
                        alert("Falla de servidor");
                }
            }
        },
        reset() {
            console.log("reset...");
            this.$refs.formRegister.reset();
        },
    },
};
</script>
