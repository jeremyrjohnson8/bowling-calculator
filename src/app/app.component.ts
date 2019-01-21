import { Component } from '@angular/core';
import { BowlingRound } from '../models/bowling-round';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  bowl: BowlingRound;
  currentFrame: number = 1;
  title = 'Bowling Calculator';
  isFirstRoll: boolean = true;
  isTenthFrame: boolean;

  constructor() {
    this.bowl = new BowlingRound();
  }

  // Used to clear a current game and begin new round
  public clear(): void {
    this.bowl = new BowlingRound();
    this.currentFrame = 1;
    this.isFirstRoll = true;
  }


  // Handles logic for each individual roll within a frame
  public roll(pinsKnockedDown: number): void {
    if (this.currentFrame === 10) {
      this.handleTenthFrame(pinsKnockedDown);
    } else {
      switch (pinsKnockedDown) {
        case 10:
          this.bowl.frames[this.currentFrame - 1].currentFrame = this.currentFrame;
          this.bowl.frames[this.currentFrame - 1].firstRoll = pinsKnockedDown;
          this.incrementFrame();
          break;
        default:
          this.bowl.frames[this.currentFrame - 1].currentFrame = this.currentFrame;
          this.isFirstRoll ? this.setFirstRoll(pinsKnockedDown) : this.setSecondRoll(pinsKnockedDown);
          break;
      }
    }
  }

  public setFirstRoll(pinsKnockedDown): void {
    this.bowl.frames[this.currentFrame - 1].firstRoll = pinsKnockedDown;
    this.bowl.disablePinButtonsBasedOnFirstRoll(pinsKnockedDown);
    this.isFirstRoll = false;
  }

  public setSecondRoll(pinsKnockedDown: number): void {
    this.bowl.frames[this.currentFrame - 1].secondRoll = pinsKnockedDown;
    this.incrementFrame();
  }

  incrementFrame(): void {
    this.currentFrame++;
    this.isFirstRoll = true;
    this.bowl.resetPinButtonState();
  }

  public handleTenthFrame(pinsKnockedDown: number): void {
    if (!this.bowl.frames[9].firstRoll) {
      this.bowl.frames[9].firstRoll = pinsKnockedDown;
    } else if (this.bowl.frames[9].firstRoll && !this.bowl.frames[9].secondRoll) {
      this.bowl.frames[9].secondRoll = pinsKnockedDown;
      if (this.bowl.frames[9].isThirdRollElligible) {
        this.bowl.resetPinButtonState();
      } else {
        this.bowl.disableAllPins();
      }
    } else if (this.bowl.frames[9].firstRoll && this.bowl.frames[9].secondRoll) {
      this.bowl.frames[9].thirdRoll = pinsKnockedDown;
      this.bowl.disableAllPins();
    }
  }

  get isStrikeButtonDisabled(): boolean {
    return !this.isFirstRoll || (!this.isFirstRoll && this.currentFrame === 10);
  }

}
