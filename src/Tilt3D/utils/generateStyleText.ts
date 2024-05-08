import { Tilt } from '../types';

const generateStyleText = (
  tilt: Tilt,
  maxTilt: number,
  zoomOnTilt: boolean,
  zoomScale: number
) => {
  const brightness = tilt.y / maxTilt + 1;
  const translateValue = Math.max(Math.abs(tilt.x), Math.abs(tilt.y)) / 2;
  const scale = (tilt.y || tilt.x) && zoomOnTilt ? zoomScale : 1;

  const rotateX = `rotateX(${tilt.y}deg)`;
  const rotateY = `rotateY(${tilt.x}deg)`;
  const translateZ = `translateZ(${translateValue}px)`;

  const filter = `brightness(${brightness})`;
  const transform = `perspective(10cm) ${rotateX} ${rotateY} ${translateZ} scale(${scale})`;
  const transition = `all 0.25s cubic-bezier(.32,.66,.72,1.58)`;

  return `filter: ${filter}; transform: ${transform}; transition: ${transition};`;
};

export default generateStyleText;
