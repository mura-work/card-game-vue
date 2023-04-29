export default class Card {
  private readonly _suit: string;
  private readonly _rank: string;
  private readonly _imageId: number;

  constructor(suit: string, rank: string, imageId: number) {
    this._suit = suit;
    this._rank = rank;
    this._imageId = imageId;
  }

  get suit() {
    return this._suit;
  }

  get rank() {
    return this._rank;
  }

  /**
   * カードの画像を表示する際に使用
   * @readonly
   * @memberof Card
   */
  get imageId() {
    return this._imageId;
  }

  getRankNumber(): number {
    return Number(this._rank);
  }
}
