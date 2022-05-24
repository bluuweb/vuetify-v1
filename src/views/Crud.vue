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
                            label="Name"
                            v-model="dessert.calories"
                        />
                    </v-col>
                </v-row>
                <v-btn block color="primary">ADD</v-btn>
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
                            <v-btn class="mr-2" color="error">Eliminar</v-btn>
                            <v-btn color="warning">Editar</v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            desserts: [{ name: "cupcake", calories: "1", id: 1 }],
            dessert: {
                name: "",
                calories: "",
            },
        };
    },
};
</script>
