import { Tilt } from '../types';

const generateStyleText = (
  tilt: Tilt,
  maxTilt: number,
  zoomOnTilt: boolean = false,
  zoomScale: number = 1
) => {
  const brightness = Math.round((tilt.y / maxTilt + 1) * 1000) / 1000;
  const scale = (tilt.y || tilt.x) && zoomOnTilt ? zoomScale : 1;

  const rotateX = `rotateX(${tilt.y}deg)`;
  const rotateY = `rotateY(${tilt.x}deg)`;

  const style = {
    filter: `brightness(${brightness})`,
    transform: `perspective(10cm) ${rotateX} ${rotateY} scale(${scale})`,
    transition: 'all 0.25s cubic-bezier(.32,.66,.72,1.58)',
  };

  return Object.entries(style)
    .reduce((acc, [key, value]) => `${acc} ${key}: ${value};`, '')
    .trim();
};

export default generateStyleText;
