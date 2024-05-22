import { calculateTiltOnAxis } from '../calculateTilt';

describe('calculateTiltOnAxis', () => {
  const domNode = document.createElement('div');
  const options = {
    maxTilt: 45,
    offset: 10,
    lockAxis: false,
  };

  it('should return 0 when lockAxis is true', () => {
    const result = calculateTiltOnAxis('x', 10, domNode, {
      ...options,
      lockAxis: true,
    });
    expect(result.degrees).toBe(0);
  });

  it('should reach maximum tilt on offset limit', () => {
    const result = calculateTiltOnAxis('x', options.offset, domNode, options);

    expect(result.degrees).toBe(options.maxTilt);
  });

  it('should return exceedsLimit if position is outside offset', () => {
    const position = options.offset + 1;
    const result = calculateTiltOnAxis('x', position, domNode, options);

    expect(result.exceedsLimit).toBe(true);
  });

  it('should return a value between 0 and maxTilt if position is inside offset', () => {
    const position = options.offset - 1;
    const result = calculateTiltOnAxis('x', position, domNode, options);

    expect(result.degrees).toBeLessThan(options.maxTilt);
  });

  it('should return 0 if cursor position is 0', () => {
    const result = calculateTiltOnAxis('x', 0, domNode, options);

    expect(result.degrees).toBe(0);
  });
});
