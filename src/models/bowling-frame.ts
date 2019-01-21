
export class BowlingFrame {
  currentFrame: number;
  firstRoll: number;
  secondRoll: number;
  thirdRoll: number;
  nextFrame: BowlingFrame;

  constructor(currentFrame: number) {
    this.currentFrame = currentFrame;
  }
  public get isStrike(): boolean {
    return this.firstRoll === 10 ? true : false;
  }

  public get isSpare(): boolean {
    return this.firstRoll + this.secondRoll === 10 ? true : false;
  }

  public get isThirdRollElligible(): boolean {
    return (this.isSpare || this.isStrike) && this.currentFrame === 10;
  }

  public get frameTotal(): number {
    if (this.isSpare) {
      return this.calculateSpareTotal;
    } else if (this.isStrike) {
      return this.calculateStrikeTotal;
    } else {
      return this.firstRoll + this.secondRoll;
    }
  }

  public get calculateSpareTotal(): number {
    if (this.nextFrame) {
      return this.firstRoll + this.secondRoll + this.nextFrame.firstRoll;
    } else {
      return this.firstRoll + this.secondRoll + this.thirdRoll;
    }
  }

  public get calculateStrikeTotal(): number {
    if (this.nextFrame && this.nextFrame.isStrike && this.nextFrame.nextFrame) {
      return this.firstRoll + this.nextFrame.firstRoll + this.nextFrame.nextFrame.firstRoll;
    } else if (this.nextFrame && !this.nextFrame.isStrike) {
      return this.firstRoll + this.nextFrame.firstRoll + this.nextFrame.secondRoll;
    } else if (this.nextFrame && this.nextFrame.isStrike && this.nextFrame.currentFrame === 10) {
      return this.firstRoll + this.nextFrame.firstRoll + this.nextFrame.secondRoll;
    } else if (this.currentFrame === 10) {
      return this.firstRoll + this.secondRoll + this.thirdRoll
    }
  }
}

