<template>
    <h1>Register</h1>
</template>
<template>
    <div>
        <h1 class="text-center">Login</h1>
        {{ valid }} - {{ user }}
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
                    <v-text-field
                        v-model="user.password"
                        label="Password"
                        :rules="passwordRules"
                    />
                    <v-text-field
                        v-model="user.repassword"
                        label="Repassword"
                        :rules="repasswordRules"
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
            passwordRules: [
                (v) => !!v || "No existe",
                (v) => (v && v.length > 5) || "Email sobre 6 carácteres",
            ],
            repasswordRules: [
                (v) => !!v || "No existe",
                (v) =>
                    v === this.user.password || "No coinciden las contraseñas",
            ],
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
            } catch (error) {
                console.log(error);
            }
        },
        reset() {
            console.log("reset...");
            this.$refs.formRegister.reset();
        },
    },
};
</script>
