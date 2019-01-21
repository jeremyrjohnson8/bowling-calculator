import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

let fixture: ComponentFixture<AppComponent> = null;
let appComponent: AppComponent;


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(async(() => {

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    // This lets us mock up our data without impacting other tests
    appComponent.clear();
  }));


  it('should create the app', async(() => {

    expect(appComponent).toBeTruthy();
  }));

  it(`should have as title 'Bowling Calculator'`, async(() => {
    expect(appComponent.title).toEqual('Bowling Calculator');
  }));

  describe('clear', () => {
    it('should reset current frame to 1 when clear is called', async(() => {
      appComponent.clear();
      expect(appComponent.currentFrame).toBe(1, 'because we have reset the game');
    }));

    it('should reset current total to 0 when clear is called', async(() => {
      appComponent.clear();
      expect(appComponent.bowlingRound.getTotalScore).toBe(0, 'because we have reset the game');
    }));

    it('should set isFirstRoll to true', async(() => {
      appComponent.clear();
      expect(appComponent.isFirstRoll).toBeTruthy('because we are waiting on the first roll of the first frame');
    }));

    it('should create a new bolwing round object', async(() => {
      appComponent.clear();
      expect(appComponent.bowlingRound).toBeDefined('because we have created an object for a new round');
      expect(appComponent.bowlingRound.frames).toBeDefined('because we have created an object for a new round, which creates new frames');
      expect(appComponent.bowlingRound.pinOptions).toBeDefined('because we have created an object for a new round, which creates new pinoptions array');
    }));
  });

  /**
   * These test can let us test some of the integration between roll, setFirstRoll,
   * setSecondRoll, incrementFrame, disablePinbuttonsBasedOnFirstRoll, handleTenthFrame
   * and resetPinButtonState
   */
  describe('roll', () => {

    it('should set first roll of first frame to 5', async(() => {
      appComponent.roll(5);
      expect(appComponent.bowlingRound.frames[0].firstRoll).toBe(5, 'because we rolled a 5 for our first roll of the first frame');
    }));

    it('should set second roll of first frame to 3', async(() => {
      appComponent.isFirstRoll = false;
      appComponent.roll(3);
      expect(appComponent.bowlingRound.frames[0].secondRoll).toBe(3, 'because we rolled a 3 for our first roll of the first frame');
    }));

    it('should set second roll of first frame to 3', async(() => {
      appComponent.isFirstRoll = false;
      appComponent.roll(3);
      expect(appComponent.bowlingRound.frames[0].secondRoll).toBe(3, 'because we rolled a 3 for our first roll of the first frame');
    }));

    it('should call handleTenthFrame', async(() => {
      appComponent.isFirstRoll = true;
      appComponent.currentFrame = 10;
      spyOn(appComponent, 'handleTenthFrame');
      appComponent.roll(10);
      expect(appComponent.handleTenthFrame).toHaveBeenCalled();
    }));

    it('should call setFirstRoll', async(() => {
      appComponent.isFirstRoll = true;
      appComponent.currentFrame = 1;
      spyOn(appComponent, 'setFirstRoll');
      appComponent.roll(8);
      expect(appComponent.setFirstRoll).toHaveBeenCalled();
    }));

    it('should call setSecondRoll', async(() => {
      appComponent.isFirstRoll = false;
      appComponent.currentFrame = 1;
      spyOn(appComponent, 'setSecondRoll');
      appComponent.roll(8);
      expect(appComponent.setSecondRoll).toHaveBeenCalled();
    }));

    it('should skip to next frame after rolling a strike on a frame other than 10th', async(() => {
      spyOn(appComponent, 'incrementFrame');
      appComponent.roll(10);
      expect(appComponent.incrementFrame).toHaveBeenCalled();
    }));
  });

  describe('setFirstRoll', () => {
    it('should set first roll of current frame to the number of pins knocked down', async(() => {
      appComponent.setFirstRoll(9);
      expect(appComponent.bowlingRound.frames[0].firstRoll).toBe(9);
    }));

    it('should set isFirstRoll to false after first roll is finished', async(() => {
      appComponent.setFirstRoll(9);
      expect(appComponent.isFirstRoll).toBeFalsy('because we just finished the first roll');
    }));
  });

  describe('setSecondRoll', () => {
    it('should set second roll of current frame to the number of pins knocked down', async(() => {
      appComponent.isFirstRoll = false;
      appComponent.setSecondRoll(9);
      expect(appComponent.bowlingRound.frames[0].secondRoll).toBe(9);
    }));

    it('should set isFirstRoll to true after first roll is finished', async(() => {
      appComponent.isFirstRoll = false;
      appComponent.setSecondRoll(9);
      expect(appComponent.isFirstRoll).toBeTruthy('because we just finished the second roll');
    }));

    it('should increment current frame after completing second roll', async(() => {
      appComponent.isFirstRoll = false;
      const currentFrameTemp = appComponent.currentFrame;
      appComponent.setSecondRoll(9);
      expect(appComponent.currentFrame).toBe((currentFrameTemp + 1), 'because we just finished the second roll, and should finish our frame');
    }));
  });

  describe('incrementFrame', () => {
    it('should call resetPinButtonState', async(() => {
      spyOn(appComponent.bowlingRound, 'resetPinButtonState');
      appComponent.incrementFrame();
      expect(appComponent.bowlingRound.resetPinButtonState).toHaveBeenCalled();
    }));

    it('should set isFirstRoll to true after first roll is finished', async(() => {
      appComponent.incrementFrame();
      expect(appComponent.isFirstRoll).toBeTruthy('because we just incremented the frame');
    }));
  });

  describe('handleTenthFrame', () => {
    it('should set 10th frame first roll to pinsknocked down', async(() => {
      appComponent.handleTenthFrame(5);
      expect(appComponent.bowlingRound.frames[9].firstRoll).toBe(5);
    }));
    it('should set 10th frame second roll to pinsknocked down', async(() => {
      appComponent.bowlingRound.frames[9].firstRoll = 5;
      appComponent.handleTenthFrame(5);
      expect(appComponent.bowlingRound.frames[9].secondRoll).toBe(5);
    }));
    it('should set 10th frame second roll to pinsknocked down', async(() => {
      appComponent.bowlingRound.frames[9].firstRoll = 5;
      appComponent.handleTenthFrame(5);
      expect(appComponent.bowlingRound.frames[9].isThirdRollElligible).toBeTruthy('because we have a spare on the 10th frame');
    }));
    it('should set 10th frame second roll to pinsknocked down', async(() => {
      appComponent.bowlingRound.frames[9].firstRoll = 10;
      appComponent.handleTenthFrame(10);
      expect(appComponent.bowlingRound.frames[9].isThirdRollElligible).toBeTruthy('because we have a strike on the 10th frame');
    }));

    it('should disable buttons and end game because a strike or spare was not thrown in 10th frame', async(() => {
      appComponent.bowlingRound.frames[9].firstRoll = 8;
      spyOn(appComponent.bowlingRound, 'disableAllPins');
      appComponent.handleTenthFrame(1);
      expect(appComponent.bowlingRound.disableAllPins).toHaveBeenCalled();
    }));

    it('should reset pin button state because we are third roll elligible in the 10th frame', async(() => {
      appComponent.bowlingRound.frames[9].firstRoll = 8;
      spyOn(appComponent.bowlingRound, 'resetPinButtonState');
      appComponent.handleTenthFrame(2);
      expect(appComponent.bowlingRound.resetPinButtonState).toHaveBeenCalled();
    }));

    it('should set 10th frame third roll to pinsknocked down', async(() => {
      appComponent.bowlingRound.frames[9].firstRoll = 10;
      appComponent.bowlingRound.frames[9].secondRoll = 10;
      appComponent.handleTenthFrame(10);
      expect(appComponent.bowlingRound.frames[9].thirdRoll).toBe(10, 'because we were third roll elligible and rolled a third shot');
    }));
  });
});
