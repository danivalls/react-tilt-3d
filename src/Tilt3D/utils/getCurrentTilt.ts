const getCurrentTilt = (domNode: HTMLDivElement) => {
  const style = domNode.style.transform;

  const getRotationDegrees = (axis: 'X' | 'Y'): number => {
    return Number(style.match(new RegExp(`${axis}\\((.*?)deg\\)`))?.[1]) || 0;
  };

  const rotateX = getRotationDegrees('X');
  const rotateY = getRotationDegrees('Y');

  return {
    isTilted: Boolean(rotateX || rotateY),
    x: rotateY,
    y: rotateX,
  };
};

export default getCurrentTilt;
