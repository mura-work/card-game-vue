import Card from './Card';

export default class Deck {
  private cards: Card[];
  constructor() {
    this.cards = [];
    this.init();
  }

  // デッキの生成を行う
  init() {
    const suits = ['Spades', 'Clovers', 'Diamonds', 'Hearts'];
    this.cards = suits
      .map((suit, idx) => {
        return [...Array(13)].map((_, i) => {
          const id = idx * 13 + (i + 1);
          return new Card(suit, String(i + 1), id);
        });
      })
      .flat();
    this.shuffle();
  }

  shuffle() {
    for (let i = this.cards.length - 1; 0 < i; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      const temp = this.cards[i];
      this.cards[i] = this.cards[r];
      this.cards[r] = temp;
    }
  }

  /**
   * デッキから1枚引く
   * @return { Card }
   */
  pick(): Card {
    return this.cards.splice(0, 1)[0];
  }
}
