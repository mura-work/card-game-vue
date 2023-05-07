import Card from '../models/Card';

export type BlackJackHistoryType = {
  result: string;
  playerHands: Card[];
  dealerHands: Card[];
  playingDateTime: Date;
  userId: number;
};
