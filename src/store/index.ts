import { createStore } from "vuex";

type State = {
	gamePoint: number,
}

const store = createStore<State>({
  state: {
    gamePoint: 0,
  },
  mutations: {
    setGamePoint(state, data) {
      state.gamePoint = data;
    },
  },
  actions: {
    setGamePoint({ commit }, data) {
      sessionStorage.setItem("game-point", JSON.stringify(data));
      commit("setGamePoint", data);
    },
  },
  getters: {
    getGamePoint(state) {
      return state.gamePoint;
    },
  },
});

export default store;
