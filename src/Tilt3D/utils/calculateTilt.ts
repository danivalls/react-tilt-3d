import { CalculateTiltOptions, Coords, CursorPos } from '../types';

export const calculateTiltOnAxis = (
  axis: 'x' | 'y',
  position: number,
  domNode: HTMLElement,
  options: Required<Pick<CalculateTiltOptions, 'maxTilt' | 'offset'>> & {
    lockAxis: boolean;
  }
) => {
  if (options.lockAxis) return { degrees: 0, exceedsLimit: false };

  const { top, left } = getDistanceFromEdge(domNode);
  const distanceFromEdge = axis === 'x' ? left : top;
  const nodeOffset = axis === 'x' ? domNode.offsetWidth : domNode.offsetHeight;

  const absoluteCenter = distanceFromEdge + nodeOffset / 2;
  const distanceFromCenter = position - absoluteCenter;
  const distanceAtMaxTilt = nodeOffset / 2 + options.offset;

  const tilt =
    (distanceFromCenter / distanceAtMaxTilt) *
    options.maxTilt *
    (axis === 'y' ? -1 : 1);

  const exceedsLimit =
    Math.abs(distanceFromCenter) > Math.abs(distanceAtMaxTilt);

  if (exceedsLimit) {
    const tiltDirection = tilt < 0 ? -1 : 1;

    return {
      degrees: tiltDirection * options.maxTilt,
      exceedsLimit,
    };
  }

  return {
    degrees: Math.round(tilt * 100) / 100,
    exceedsLimit,
  };
};

export const getDistanceFromEdge = (elem: HTMLElement): Coords => {
  const box = elem.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.scrollY || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.scrollX || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
};

const calculateTilt = (
  cursorPos: CursorPos,
  domNode: HTMLElement,
  options: CalculateTiltOptions
) => {
  if (
    (!cursorPos.x && !cursorPos.y) ||
    (options.resetTiltOnHover && domNode.matches(':hover'))
  )
    return { x: 0, y: 0 };

  const { maxTilt, offset, lockAxisX, lockAxisY } = options;

  const tiltX = calculateTiltOnAxis('x', cursorPos.x, domNode, {
    maxTilt,
    offset,
    lockAxis: lockAxisX,
  });
  const tiltY = calculateTiltOnAxis('y', cursorPos.y, domNode, {
    maxTilt,
    offset,
    lockAxis: lockAxisY,
  });

  const isOutOfBounds = tiltX.exceedsLimit || tiltY.exceedsLimit;

  if (isOutOfBounds && options.resetTiltOnOutOfBounds) {
    return { x: 0, y: 0 };
  }

  return {
    x: tiltX.degrees,
    y: tiltY.degrees,
  };
};

export default calculateTilt;
