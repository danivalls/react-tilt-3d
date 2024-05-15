import calculateTilt from '../calculateTilt';

describe('calculateTilt', () => {
  it('should return 0 for y axis when lockAxisY is true', () => {
    const cursorPos = { x: 1000, y: 1000 };
    const domNode = document.createElement('div');
    const options = { lockAxisY: true };
    const result = calculateTilt(cursorPos, domNode, options);
    expect(result.y).toBe(0);
  });

  it('should return 0 for x axis when lockAxisX is true', () => {
    const cursorPos = { x: 1000, y: 1000 };
    const domNode = document.createElement('div');
    const options = { lockAxisX: true };
    const result = calculateTilt(cursorPos, domNode, options);
    expect(result.x).toBe(0);
  });

  it('should limit tilt within maxTilt when resetTiltOnOutOfBounds is false', () => {
    const cursorPos = { x: 1000, y: 1000 };
    const maxTilt = 30;
    const domNode = document.createElement('div');
    const options = { maxTilt, resetTiltOnOutOfBounds: false };
    const result = calculateTilt(cursorPos, domNode, options);
    expect(result.x).toBe(maxTilt);
    expect(result.y).toBe(-maxTilt);
  });

  it('should reset tilt to 0 when resetTiltOnOutOfBounds is true and tilt is out of bounds', () => {
    const cursorPos = { x: 1000, y: 1000 };
    const domNode = document.createElement('div');
    const options = { maxTilt: 30, resetTiltOnOutOfBounds: true };
    const result = calculateTilt(cursorPos, domNode, options);
    expect(result.x).toBe(0);
    expect(result.y).toBe(0);
  });
});
