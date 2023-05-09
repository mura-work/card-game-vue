export type HandType = {
  suit: string;
  rank: string;
};

export type BlackJackHistoryType = {
  result: string;
  playerHands: HandType[];
  dealerHands: HandType[];
  playingDateTime: Date;
  userId: number;
  totalPoint: number;
  pointDifference: number;
};
