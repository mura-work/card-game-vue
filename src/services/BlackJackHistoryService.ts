import { BlackJackHistoryType } from '../types/index';
import { aspidaClient } from './api';
import api from '../../api/$api';
import Card from '../models/Card';
import store from '../store/index';

const apiClient = {
  blackJackHistory: api(aspidaClient()),
};

export const fetchBlackJackHistory = async () => {
  const histories =
    await apiClient.blackJackHistory.v1.black_jack_histories.get();
  console.log({ histories });
  return histories;
};

export const saveBlackJackHistory = async (
  result: string,
  playerHands: Card[],
  dealerHands: Card[],
  pointDifference: number
) => {
  const userId = 1000; // dummy data
  const playingDateTime = new Date(); // バックエンドでデータが作成された時間にする
  const mappedPlayerHands = playerHands.map((hand) => ({
    suit: hand.suit,
    rank: hand.rank,
  }));
  const mappedDealerHands = dealerHands.map((hand) => ({
    suit: hand.suit,
    rank: hand.rank,
  }));
  const totalPoint = store.getters.getGamePoint;
  const blackJackHistoryType: BlackJackHistoryType = {
    userId,
    playingDateTime,
    result,
    playerHands: mappedPlayerHands,
    dealerHands: mappedDealerHands,
    totalPoint,
    pointDifference,
  };
  const res = await apiClient.blackJackHistory.v1.black_jack_histories.post({
    body: blackJackHistoryType,
  });
  console.log(res);
};
