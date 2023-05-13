import { createStore } from 'vuex';
import { initializeCardImages } from '../utils/image-utils/index';
import {
  getGamePointFromSession,
  setGamePointFromSession,
} from '../utils/sessionStorage';

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
    initializeGamePoint({ commit }) {
      const gamePoint = getGamePointFromSession();
      commit('setGamePoint', gamePoint);
    },
    initializeCardImageList({ commit }) {
      const cardImageList = initializeCardImages();
      commit('setCardImageList', cardImageList);
    },
    setGamePointFromSessionAndStore({ commit }, data) {
      setGamePointFromSession(data);
      commit('setGamePoint', data);
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
