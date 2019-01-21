import { Component } from '@angular/core';
import { BowlingRound } from '../models/bowling-round';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  bowlingRound: BowlingRound;
  currentFrame: number = 1;
  title = 'Bowling Calculator';
  isFirstRoll: boolean = true;
  isTenthFrame: boolean;

  constructor() {
    this.bowlingRound = new BowlingRound();
  }

  // Used to clear a current game and begin new round
  public clear(): void {
    this.bowlingRound = new BowlingRound();
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
          this.bowlingRound.frames[this.currentFrame - 1].currentFrame = this.currentFrame;
          this.bowlingRound.frames[this.currentFrame - 1].firstRoll = pinsKnockedDown;
          this.incrementFrame();
          break;
        default:
          this.bowlingRound.frames[this.currentFrame - 1].currentFrame = this.currentFrame;
          this.isFirstRoll ? this.setFirstRoll(pinsKnockedDown) : this.setSecondRoll(pinsKnockedDown);
          break;
      }
    }
  }

  public setFirstRoll(pinsKnockedDown): void {
    this.bowlingRound.frames[this.currentFrame - 1].firstRoll = pinsKnockedDown;
    this.bowlingRound.disablePinButtonsBasedOnFirstRoll(pinsKnockedDown);
    this.isFirstRoll = false;
  }

  public setSecondRoll(pinsKnockedDown: number): void {
    this.bowlingRound.frames[this.currentFrame - 1].secondRoll = pinsKnockedDown;
    this.incrementFrame();
  }

  incrementFrame(): void {
    this.currentFrame++;
    this.isFirstRoll = true;
    this.bowlingRound.resetPinButtonState();
  }

  public handleTenthFrame(pinsKnockedDown: number): void {
    if (!this.bowlingRound.frames[9].firstRoll) {
      this.bowlingRound.frames[9].firstRoll = pinsKnockedDown;
    } else if (this.bowlingRound.frames[9].firstRoll && !this.bowlingRound.frames[9].secondRoll) {
      this.bowlingRound.frames[9].secondRoll = pinsKnockedDown;
      if (this.bowlingRound.frames[9].isThirdRollElligible) {
        this.bowlingRound.resetPinButtonState();
      } else {
        this.bowlingRound.disableAllPins();
      }
    } else if (this.bowlingRound.frames[9].firstRoll && this.bowlingRound.frames[9].secondRoll) {
      this.bowlingRound.frames[9].thirdRoll = pinsKnockedDown;
      this.bowlingRound.disableAllPins();
    }
  }

  get isStrikeButtonDisabled(): boolean {
    return !this.isFirstRoll || (!this.isFirstRoll && this.currentFrame === 10);
  }

}
