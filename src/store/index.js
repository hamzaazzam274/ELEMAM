import { createStore } from "vuex";

export default createStore({
  state: {
    type: "",
    lang: "",
    class: "",
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
  },
  actions: {},
  modules: {},
});
