<template>
    <div>
        <h1>CRUD</h1>

        <v-form>
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            required
                            label="Name"
                            v-model="dessert.name"
                        />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            required
                            label="Calories"
                            v-model="dessert.calories"
                        />
                    </v-col>
                </v-row>
                <v-btn block color="primary" @click="addDessertForm">ADD</v-btn>
            </v-container>
        </v-form>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Nombre</th>
                        <th class="text-left">Calorias</th>
                        <th class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in desserts" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.calories }}</td>
                        <td class="text-center">
                            <v-btn
                                class="mr-2"
                                color="error"
                                @click="deleteDessertItems(item.id)"
                                >Eliminar</v-btn
                            >
                            <v-btn color="warning" @click="activarUpdate(item)"
                                >Editar</v-btn
                            >
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-dialog v-model="dialog">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Editar
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        required
                                        label="Name"
                                        v-model="dessert.name"
                                    />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        required
                                        label="Calories"
                                        v-model="dessert.calories"
                                    />
                                </v-col>
                            </v-row>
                            <v-btn
                                block
                                color="warning"
                                @click="updateDessertForm"
                                >UPDATE</v-btn
                            >
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    data() {
        return {
            dessert: {
                name: "",
                calories: "",
            },
            dialog: false,
        };
    },
    methods: {
        ...mapActions([
            "add_dessert",
            "delete_dessert",
            "update_dessert",
            "get_desserts",
        ]),
        addDessertForm() {
            this.add_dessert({ ...this.dessert });
        },
        deleteDessertItems(id) {
            this.delete_dessert(id);
        },
        activarUpdate(item) {
            this.dialog = true;
            this.dessert = item;
        },
        updateDessertForm() {
            console.log(this.dessert);
            this.update_dessert({ ...this.dessert });
            this.dessert = {};
            this.dialog = false;
        },
    },
    computed: {
        ...mapState(["desserts"]),
    },
    created() {
        this.get_desserts();
    },
};
</script>
