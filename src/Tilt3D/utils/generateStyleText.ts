import { CubicBezier, Tilt, TransitionTimingFunction } from '../types';

export const BOUNCE_TRANISTION: CubicBezier = 'cubic-bezier(.32,.66,.72,1.58)';

const generateStyleText = (
  tilt: Tilt,
  maxTilt: number,
  zoomOnTilt: boolean = false,
  zoomScale: number = 1,
  transition: TransitionTimingFunction = 'ease-out',
  gyroMode: boolean = false
) => {
  const brightness = gyroMode
    ? 1
    : Math.round((tilt.y! / maxTilt + 1) * 100) / 100;
  const scale = (tilt.y || tilt.x) && zoomOnTilt ? zoomScale : 1;

  const rotateX = tilt.y !== null ? `rotateX(${tilt.y}deg)` : '';
  const rotateY = tilt.x !== null ? `rotateY(${tilt.x}deg)` : '';

  const transitionDuration = gyroMode ? '0.1s' : '0.25s';
  const transitionAnimation: TransitionTimingFunction =
    transition === 'bounce' ? BOUNCE_TRANISTION : transition;

  const style = {
    filter: `brightness(${brightness})`,
    transform: `perspective(10cm) ${rotateX} ${rotateY} scale(${scale})`,
    transition: `all ${transitionDuration} ${transitionAnimation}`,
  };

  const styleText = Object.entries(style)
    .reduce((acc, [key, value]) => `${acc} ${key}: ${value};`, '')
    .trim();

  return styleText;
};

export default generateStyleText;
