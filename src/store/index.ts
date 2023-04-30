import { createStore } from 'vuex';
import { initializeCardImages } from '../utils/image-utils/index';

type State = {
  gamePoint: number;
  cardImageList: Record<number, string>;
};

const store = createStore<State>({
  state: {
    gamePoint: 0,
    cardImageList: {},
  },
  mutations: {
    setGamePoint(state, data) {
      state.gamePoint = data;
    },
    setCardImageList(state, data) {
      state.cardImageList = data;
    },
  },
  actions: {
    initializeCardImageList({ commit }) {
      const cardImageList = initializeCardImages();
      commit('setCardImageList', cardImageList);
    },
  },
  getters: {
    getGamePoint(state) {
      return state.gamePoint;
    },
    getCardImageList(state) {
      return state.cardImageList;
    },
  },
});

export default store;
