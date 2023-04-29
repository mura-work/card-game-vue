import { createStore } from 'vuex';

type State = {
  gamePoint: number;
};

const store = createStore<State>({
  state: {
    gamePoint: 0,
  },
  mutations: {
    setGamePoint(state, data) {
      state.gamePoint = data;
    },
  },
  // actions: {
  //   updateGamePoint({ commit }, data) {

  //   },
  // },
  getters: {
    getGamePoint(state) {
      return state.gamePoint;
    },
  },
});

export default store;
