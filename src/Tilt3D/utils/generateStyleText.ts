import { CubicBezier, Tilt, TransitionTimingFunction } from '../types';

export const BOUNCE_TRANISTION: CubicBezier = 'cubic-bezier(.32,.66,.72,1.58)';

type GenerateStyleParams = {
  tilt: Tilt;
  maxTilt: number;
  zoomOnTilt?: boolean;
  zoomScale?: number;
  transition?: TransitionTimingFunction;
  gyroMode?: boolean;
  enableLighting?: boolean;
};

const defaultParams = {
  zoomOnTilt: false,
  zoomScale: 1,
  transition: 'ease-out' as TransitionTimingFunction,
  gyroMode: false,
  enableLighting: true,
};

const generateStyleText = (params: GenerateStyleParams) => {
  const {
    tilt,
    maxTilt,
    zoomOnTilt,
    zoomScale,
    transition,
    gyroMode,
    enableLighting,
  } = {
    ...defaultParams,
    ...params,
  };
  const shouldApplyLighting = enableLighting && !gyroMode;
  const brightness = !shouldApplyLighting
    ? 1
    : Math.round((tilt.y! / maxTilt + 1) * 100) / 100;
  const scale = (tilt.y || tilt.x) && zoomOnTilt ? zoomScale : 1;

  const rotateX = tilt.y !== null ? `rotateX(${tilt.y}deg)` : '';
  const rotateY = tilt.x !== null ? `rotateY(${tilt.x}deg)` : '';

  const transitionDuration = gyroMode ? '0.1s' : '0.25s';
  const transitionAnimation: TransitionTimingFunction =
    transition === 'bounce' ? BOUNCE_TRANISTION : transition;

  const style = {
    ...(shouldApplyLighting && { filter: `brightness(${brightness})` }),
    transform: `perspective(10cm) ${rotateX} ${rotateY} scale(${scale})`,
    transition: `all ${transitionDuration} ${transitionAnimation}`,
  };

  const styleText = Object.entries(style)
    .reduce((acc, [key, value]) => `${acc} ${key}: ${value};`, '')
    .trim();

  return styleText;
};

export default generateStyleText;
