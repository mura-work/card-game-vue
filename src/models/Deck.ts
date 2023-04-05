import Card from "./Card";

export default class Deck {
  private cards: Card[];
  constructor() {
    this.cards = [];
    this.init();
  }

  // デッキの生成を行う
  init() {
    const suits = ["Hearts", "Diamonds", "Clovers", "Spades"];
    this.cards = suits
      .map((suit, idx) => {
        return [...Array(13)].map((_, i) => {
          const imageId = idx * 13 + (i + 1);
          return new Card(suit, String(i), imageId);
        })
			}
      )
      .flat();
  }
}
