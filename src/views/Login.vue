<template>
    <div>
        <h1 class="text-center">Login</h1>
        {{ valid }} - {{ user }}
        <v-form v-model="valid" ref="formRegister">
            <v-row justify="center">
                <v-col cols="8" md="4">
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
                    <v-btn
                        color="primary"
                        class="mr-2"
                        :disabled="!valid"
                        @click="loginUser"
                        >Login</v-btn
                    >
                    <v-btn color="error" @click="reset">Reset</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            user: {
                email: "",
                password: "",
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
        };
    },
    methods: {
        loginUser() {
            console.log("Login user...");
        },
        reset() {
            console.log("reset...");
            this.$refs.formRegister.reset();
        },
    },
};
</script>
