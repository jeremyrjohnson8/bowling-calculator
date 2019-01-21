import { BowlingFrame } from './bowling-frame';
import { async } from '@angular/core/testing';


let bowlingFrame: BowlingFrame;


describe('BowlingFrame', () => {

  beforeEach(async(() => {
    bowlingFrame = new BowlingFrame(1);
    bowlingFrame.nextFrame = new BowlingFrame(2);
  }));


  it('should create the bowling frame', async(() => {

    expect(bowlingFrame).toBeDefined();
  }));


  /**
   * since this method is super straight forward the frame is not a strike
   * or spare, just going to do a simple test on this, and focus more on the methods
   * calculateSpareTotal and calculateStrikeTotal
   */
  describe('frameTotal', () => {
    it(`should have as title 'Bowling Calculator'`, async(() => {
      bowlingFrame.firstRoll = 5;
      bowlingFrame.secondRoll = 3;
      expect(bowlingFrame.frameTotal).toBe(8, 'because 5 + 3 is 8...');
    }));
  });

  describe('calculateSpareTotal', () => {
    it('should calculate spare total using all three rolls', () => {
      bowlingFrame.nextFrame = null;
      bowlingFrame.firstRoll = 5;
      bowlingFrame.secondRoll = 5;
      bowlingFrame.thirdRoll = 3;
      expect(bowlingFrame.calculateSpareTotal).toBe(13, 'because we are in a third roll elligible frame and spare total is the sum of all three rolls');
    });

    it('should calculate spare using first roll of next frame', () => {
      bowlingFrame.nextFrame.firstRoll = 5;
      bowlingFrame.firstRoll = 5;
      bowlingFrame.secondRoll = 5;
      expect(bowlingFrame.calculateSpareTotal).toBe(15, 'because spare is calulated with the frame total plus first roll of next frame');
    });
  });

  describe('calculateStrikeTotal', () => {
    it('should calculate strike using first and second roll of next frame', () => {
      bowlingFrame.firstRoll = 10;
      bowlingFrame.nextFrame.firstRoll = 5;
      bowlingFrame.nextFrame.secondRoll = 3;
      expect(bowlingFrame.calculateStrikeTotal).toBe(18, 'because strike is calulated with the frame total plus first and second roll of next frame');
    });

    it('should calculate strike using values from next two frames if all strikes', () => {
      bowlingFrame.firstRoll = 10;
      bowlingFrame.nextFrame.firstRoll = 10;
      bowlingFrame.nextFrame.nextFrame = new BowlingFrame(3);
      bowlingFrame.nextFrame.nextFrame.firstRoll = 10;
      expect(bowlingFrame.calculateStrikeTotal).toBe(30, 'because next frame was strike we must look two frames ahead to calculate total');
    });

    it('should handle the 10th frame calculations', () => {
      bowlingFrame.currentFrame = 9;
      bowlingFrame.nextFrame.currentFrame = 10;
      bowlingFrame.firstRoll = 10;
      bowlingFrame.nextFrame.firstRoll = 5;
      bowlingFrame.nextFrame.secondRoll = 3;
      expect(bowlingFrame.calculateStrikeTotal).toBe(18, 'because we still calculate the next two throws for our total');
    });

    it('should handle the 9th frame calculations when first roll in 10th frame is a strike', () => {
      bowlingFrame.currentFrame = 9;
      bowlingFrame.nextFrame.currentFrame = 10;
      bowlingFrame.firstRoll = 10;
      bowlingFrame.nextFrame.firstRoll = 10;
      bowlingFrame.nextFrame.secondRoll = 9;
      expect(bowlingFrame.calculateStrikeTotal).toBe(29, 'because we handle next frame isStrike different in frames leading up to the 10th');
    });
  });
});
