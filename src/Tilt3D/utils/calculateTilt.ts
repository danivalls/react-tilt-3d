import { CalculateTiltOptions, Coords, CursorPos } from '../types';

export const calculateTiltOnAxis = (
  axis: 'x' | 'y',
  position: number,
  domNode: HTMLElement,
  options: Required<Pick<CalculateTiltOptions, 'maxTilt' | 'offset'>> & {
    lockAxis: boolean;
  }
) => {
  if (options.lockAxis) return 0;

  const { maxTilt, offset } = options;
  const { top, left } = getCoords(domNode);

  const nodeSizeOnAxis = domNode[axis === 'x' ? 'offsetWidth' : 'offsetHeight'];
  const absoluteCoord = axis === 'x' ? left : top;

  const nodeSizeWithOffset = nodeSizeOnAxis + offset * 2;
  const centerOfNode = nodeSizeWithOffset / 2;
  const absoluteCoordWithOffset = absoluteCoord - offset;

  const absoluteCenter = absoluteCoordWithOffset + centerOfNode;

  const distanceFromCenter = position - absoluteCenter;

  return (
    (distanceFromCenter / centerOfNode) * maxTilt * (axis === 'y' ? -1 : 1)
  );
};

export const getCoords = (elem: HTMLElement): Coords => {
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
  if (!cursorPos.x && !cursorPos.y) return { x: 0, y: 0 };

  const isHovering = domNode.matches(':hover');
  if (options.resetTiltOnHover && isHovering) return { x: 0, y: 0 };

  const { maxTilt, offset, lockAxisX, lockAxisY } = options;

  const buildAxisOptions = (axis: 'x' | 'y') => ({
    maxTilt,
    offset,
    lockAxis: axis === 'x' ? lockAxisX : lockAxisY,
  });

  const getTilt = (axis: 'x' | 'y') =>
    calculateTiltOnAxis(axis, cursorPos[axis], domNode, buildAxisOptions(axis));

  const tiltX = getTilt('x');
  const tiltY = getTilt('y');

  let limitedX: number;
  let limitedY: number;

  if (options.resetTiltOnOutOfBounds) {
    const isOutOfBoundsX = Math.abs(tiltX) > maxTilt;
    const isOutOfBoundsY = Math.abs(tiltY) > maxTilt;
    const isOutOfBounds = isOutOfBoundsX || isOutOfBoundsY;

    limitedX = isOutOfBounds ? 0 : tiltX;
    limitedY = isOutOfBounds ? 0 : tiltY;
  } else {
    limitedX = Math.min(Math.max(tiltX, -maxTilt), maxTilt);
    limitedY = Math.min(Math.max(tiltY, -maxTilt), maxTilt);
  }

  return {
    x: limitedX,
    y: limitedY,
  };
};

export default calculateTilt;
