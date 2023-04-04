class Card {
  private readonly _suit: string;
  private readonly _rank: string;

  constructor(suit: string, rank: string) {
    this._suit = suit;
    this._rank = rank;
  }

  get suit() {
    return this._suit;
  }

  get rank() {
    return this._rank;
  }

  getRankNumber(): number {
    return 0;
  }
}
