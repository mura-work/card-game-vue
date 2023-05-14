export type HandType = {
  suit: string;
  rank: string;
  imageId: number;
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

export type fetchedCardType = {
  id: number;
  suit: string;
  rank: string;
  imageId: number;
};

export type fetchedBlackJackHistoryType = {
  result: string;
  playingDateTime: Date;
  userId: number;
  totalPoint: number;
  pointDifference: number;
  playerBlackJackHands: fetchedCardType[];
  dealerBlackJackHands: fetchedCardType[];
  id: number;
};
