import Vue from "vue";
import Vuex from "vuex";
// import { nanoid } from "nanoid";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { db, auth } from "../firebase";

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
        GET_DESSERTS(state, payload) {
            state.desserts = payload;
        },
    },
    actions: {
        async get_desserts({ commit }) {
            try {
                const q = query(
                    collection(db, "desserts"),
                    where("uid", "==", auth.currentUser.uid)
                );
                onSnapshot(q, (querySnapshot) => {
                    const desserts = [];
                    querySnapshot.forEach((doc) => {
                        desserts.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                    commit("GET_DESSERTS", desserts);
                });
            } catch (error) {
                console.log(error);
            }
        },
        async add_dessert({ commit }, dessert) {
            // dessert.id = nanoid(6);
            try {
                await addDoc(collection(db, "desserts"), {
                    name: dessert.name,
                    calories: dessert.calories,
                });
            } catch (error) {
                console.log(error);
            }
            // commit("ADD_DESSERT", dessert);
        },
        async delete_dessert({ commit }, id) {
            try {
                const docRef = doc(db, "desserts", id);
                await deleteDoc(docRef);
            } catch (error) {
                console.log(error);
            }
            // commit("DELETE_DESSERT", id);
        },
        async update_dessert({ commit }, dessert) {
            try {
                const docRef = doc(db, "desserts", dessert.id);
                await updateDoc(docRef, {
                    name: dessert.name,
                    calories: dessert.calories,
                });
            } catch (error) {
                console.log(error);
            }

            // commit("UPDATE_DESSERT", dessert);
        },
    },
});
