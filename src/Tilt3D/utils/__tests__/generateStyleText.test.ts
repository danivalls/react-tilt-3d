import generateStyleText from '../generateStyleText';

describe('generateStyleText', () => {
  it('should generate style text with default values', () => {
    const tilt = { x: 0, y: 0 };
    const result = generateStyleText(tilt, 45);

    expect(result).toBe(
      'filter: brightness(1); transform: perspective(10cm) rotateX(0deg) rotateY(0deg) scale(1); transition: all 0.25s cubic-bezier(.32,.66,.72,1.58);'
    );
  });

  it('should generate style text with custom values', () => {
    const tilt = { x: 10, y: 20 };
    const maxTilt = 30;
    const zoomOnTilt = true;
    const zoomScale = 1.5;
    const result = generateStyleText(tilt, maxTilt, zoomOnTilt, zoomScale);
    expect(result).toBe(
      'filter: brightness(1.67); transform: perspective(10cm) rotateX(20deg) rotateY(10deg) scale(1.5); transition: all 0.25s cubic-bezier(.32,.66,.72,1.58);'
    );
  });
});
