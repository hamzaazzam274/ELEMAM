import { createStore } from "vuex";

export default createStore({
  state: {
    type: "",
    lang: "",
    class: "",
    Sub: "",
  },
  getters: {},
  mutations: {
    updateType(state, payload) {
      state.type = payload;
    },
    updateLang(state, payload) {
      state.lang = payload;
    },
    updateClass(state, payload) {
      state.class = payload;
    },
    updateSub(state, payload) {
      state.Sub = payload;
    },
  },
  actions: {},
  modules: {},
});
