import { CalculateTiltOptions, Coords, CursorPos } from '../types';

const calculateTiltOnAxis = (
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

const getIsHovering = (
  cursorPos: CursorPos,
  coords: Coords,
  domNode: HTMLElement
) => {
  const xCoord = coords.left;
  const yCoord = coords.top;
  const isHoveringX =
    cursorPos.x > xCoord && cursorPos.x < xCoord + domNode.offsetWidth;
  const isHoveringY =
    cursorPos.y > yCoord && cursorPos.y < yCoord + domNode.offsetHeight;

  return isHoveringX && isHoveringY;
};

const getCoords = (elem: HTMLElement): Coords => {
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
  options: CalculateTiltOptions = {}
) => {
  if (!cursorPos.x && !cursorPos.y) return { x: 0, y: 0 };
  const {
    maxTilt = 45,
    resetTiltOnOutOfBounds = false,
    offset = window.innerWidth / 2,
    resetTiltOnHover = false,
    lockAxisX = false,
    lockAxisY = false,
  } = options;

  const isHovering = getIsHovering(cursorPos, getCoords(domNode), domNode);
  if (resetTiltOnHover && isHovering) return { x: 0, y: 0 };

  const axisOptions = { maxTilt, offset };

  const tiltX = calculateTiltOnAxis('x', cursorPos.x, domNode, {
    ...axisOptions,
    lockAxis: lockAxisX,
  });
  const tiltY = calculateTiltOnAxis('y', cursorPos.y, domNode, {
    ...axisOptions,
    lockAxis: lockAxisY,
  });

  let limitedX: number;
  let limitedY: number;

  if (resetTiltOnOutOfBounds) {
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
