import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    SALES: {},
  },
  getters: {
    GET_SALES(state) {
      return state.SALES;
    },
  },
  actions: {
    async GET_SALES({ commit }) {
      let {data} = await axios.get("https://demo-api.vsdev.space/api/brom/left_widget");
      commit("SET_SALES", data);
    },
  },
  mutations: {
    SET_SALES(state, payload) {
      state.SALES = payload;
    },
  },
});