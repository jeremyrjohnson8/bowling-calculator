import { PinSelectionOptions } from './pin-selection-button-options';
import { BowlingFrame } from "./bowling-frame";

export class BowlingRound {
  frames: BowlingFrame[];
  pinOptions: PinSelectionOptions[];

  constructor() {
    this.initRound();
  }

  public initRound(): void {
    this.frames = [];
    for (let i = 0; i < 10; i++) {
      if (i === 0) {
        this.frames.push(new BowlingFrame(i + 1));
      } else {
        this.frames.push(new BowlingFrame(i + 1));
        this.frames[i - 1].nextFrame = this.frames[i];
      }
    }
    this.initButtons();
  }

  public initButtons(): void {
    this.pinOptions = [];
    for (let i = 0; i < 11; i++) {
      this.pinOptions.push(new PinSelectionOptions(i));
    }
  }

  resetPinButtonState(): void {
    this.pinOptions.forEach(e => {
      e.isDisabled = false;
    });
  }

  disableAllPins(): void {
    this.pinOptions.forEach(e => {
      e.isDisabled = true;
    });
  }

  disablePinButtonsBasedOnFirstRoll(firstRollValue: number): void {
    this.pinOptions.forEach(e => {
      if (e._value + firstRollValue > 10) {
        e.isDisabled = true;
      }
    });
  }

  public get getTotalScore(): number {
    let total = 0;
    this.frames.forEach((frame: BowlingFrame) => {
      total = frame.frameTotal ? total + frame.frameTotal : total + 0;
    });
    return total;
  }
}
