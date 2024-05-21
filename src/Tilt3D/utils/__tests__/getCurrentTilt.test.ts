import getCurrentTilt from '../getCurrentTilt';

describe('getCurrentTilt', () => {
  it('should return the current tilt values when the element is tilted', () => {
    const domNode = document.createElement('div');
    domNode.style.transform = 'rotateX(10deg) rotateY(20deg)';

    const result = getCurrentTilt(domNode);

    expect(result).toEqual({ isTilted: true, x: 20, y: 10 });
  });

  it('should return zero tilt values when the element is not tilted', () => {
    const domNode = document.createElement('div');
    domNode.style.transform = '';

    const result = getCurrentTilt(domNode);

    expect(result).toEqual({ isTilted: false, x: 0, y: 0 });
  });
});
