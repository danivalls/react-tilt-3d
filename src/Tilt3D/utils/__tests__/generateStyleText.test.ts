import generateStyleText, { BOUNCE_TRANISTION } from '../generateStyleText';

describe('generateStyleText', () => {
  it('should generate style text with custom values', () => {
    const tilt = { x: 10, y: 20 };
    const maxTilt = 30;
    const zoomOnTilt = true;
    const zoomScale = 1.5;
    const result = generateStyleText(
      tilt,
      maxTilt,
      zoomOnTilt,
      zoomScale,
      'ease-in'
    );
    expect(result).toBe(
      'filter: brightness(1.67); transform: perspective(10cm) rotateX(20deg) rotateY(10deg) scale(1.5); transition: all 0.25s ease-in;'
    );
  });

  it('applies given transition when its not bounce', () => {
    const tilt = { x: 10, y: 20 };
    const maxTilt = 30;
    const transition = 'ease-in';
    const result = generateStyleText(tilt, maxTilt, false, 1, transition);

    const styleContainsGivenTransition = result.includes(transition);

    expect(styleContainsGivenTransition).toBe(true);
  });

  it('applies bounce transition when transition is bounce', () => {
    const tilt = { x: 10, y: 20 };
    const maxTilt = 30;
    const transition = 'bounce';
    const result = generateStyleText(tilt, maxTilt, false, 1, transition);

    const styleContainsBounceTransition = result.includes(BOUNCE_TRANISTION);

    expect(styleContainsBounceTransition).toBe(true);
  });
});
