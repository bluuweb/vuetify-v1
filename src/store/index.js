import Vue from "vue";
import Vuex from "vuex";
import { nanoid } from "nanoid";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        desserts: [],
    },
    mutations: {
        ADD_DESSERT(state, payload) {
            state.desserts.push(payload);
        },
        DELETE_DESSERT(state, payload) {
            state.desserts = state.desserts.filter(
                (item) => item.id !== payload
            );
        },
        UPDATE_DESSERT(state, payload) {
            state.desserts = state.desserts.map((item) =>
                item.id === payload.id ? payload : item
            );
        },
    },
    actions: {
        add_dessert({ commit }, dessert) {
            dessert.id = nanoid(6);
            commit("ADD_DESSERT", dessert);
        },
        delete_dessert({ commit }, id) {
            commit("DELETE_DESSERT", id);
        },
        update_dessert({ commit }, dessert) {
            commit("UPDATE_DESSERT", dessert);
        },
    },
});
