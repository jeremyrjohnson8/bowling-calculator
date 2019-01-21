import { BowlingRound } from './bowling-round';
import { TestBed, async } from '@angular/core/testing';
describe('AppComponent', () => {
  let bowlingRound: BowlingRound;


  beforeEach(async(() => {
    bowlingRound = new BowlingRound();
  }));

  it('when round is initialized, frames and pin buttons buttons should be as well', async(() => {
    expect(bowlingRound.frames).toBeDefined();
    expect(bowlingRound.pinOptions).toBeDefined();
    expect(bowlingRound.frames.length).toBe(10, 'because we need 10 frames');
    expect(bowlingRound.pinOptions.length).toBe(11, 'because we have 11 button options -> not counting clear');
  }));


  describe('disablePinButtonsBasedOnFirstRoll', () => {
    it(`shouldDisableButtons with values that when added to first roll value, are greater than 10`, async(() => {
      bowlingRound.disablePinButtonsBasedOnFirstRoll(3);
      expect(bowlingRound.pinOptions[9].isDisabled).toBeTruthy('because 9 + our first roll of 3 is greater than 11');
    }));

    it(`should not disable values that add up to 10`, async(() => {
      bowlingRound.disablePinButtonsBasedOnFirstRoll(3);
      expect(bowlingRound.pinOptions[7].isDisabled).toBeFalsy('because we should have the ability to have all values up to 10 available');
    }));
  });

  describe('getTotalScore', () => {
    it(`should not disable values that add up to 10`, async(() => {
      bowlingRound.frames[0].firstRoll = 10;
      bowlingRound.frames[1].firstRoll = 0;
      bowlingRound.frames[1].secondRoll = 0; 
      expect(bowlingRound.getTotalScore).toBe(10, 'because we have 2 frames adding up to 10');
    }));
  });
});
