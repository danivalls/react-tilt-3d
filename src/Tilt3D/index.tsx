import { useEffect, useRef } from 'react';
import { CursorPos, Props } from './types';
import calculateTilt from './utils/calculateTilt';
import generateStyleText from './utils/generateStyleText';
import getCurrentTilt from './utils/getCurrentTilt';

const Tilt3D = ({
  maxTilt = 25,
  resetTiltOnOutOfBounds = false,
  resetTiltOnHover = false,
  actionOffset = 0,
  zoomOnTilt = false,
  zoomScale = 1.25,
  lockAxisX = false,
  lockAxisY = false,
  transition = 'ease-out',
  onTiltChange,
  onTiltStart,
  onTiltEnd,
  className,
  children,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resetTilt = () => {
      if (ref.current) {
        const currentTilt = getCurrentTilt(ref.current);

        if (currentTilt.isTilted) {
          onTiltEnd?.();
        }
        ref.current.style.cssText = generateStyleText({ x: 0, y: 0 }, maxTilt);
      }
    };

    const applyTilt = ({ x, y }: CursorPos) => {
      if (ref.current) {
        const tilt = calculateTilt({ x, y }, ref.current, {
          maxTilt,
          offset: actionOffset,
          resetTiltOnHover,
          resetTiltOnOutOfBounds,
          lockAxisX,
          lockAxisY,
        });

        const currentTilt = getCurrentTilt(ref.current);
        const willTilt = tilt.x && tilt.y;

        const tiltStarts = !currentTilt.isTilted && willTilt;
        const tiltEnds = currentTilt.isTilted && !willTilt;

        if (tiltStarts) onTiltStart?.();
        if (tiltEnds) onTiltEnd?.();

        const newStyle = generateStyleText(
          tilt,
          maxTilt,
          zoomOnTilt,
          zoomScale,
          transition
        );

        const isSameTilt = currentTilt.x === tilt.x && currentTilt.y === tilt.y;

        if (!isSameTilt) {
          ref.current.style.cssText = newStyle;
          onTiltChange?.(tilt);
        }
      }
    };

    const handleMouseMove = ({ pageX: x, pageY: y }: MouseEvent) => {
      applyTilt({ x, y });
    };

    const handleTouchMove = ({ touches }: TouchEvent) => {
      if (touches.length) {
        applyTilt({ x: touches[0].pageX, y: touches[0].pageY });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', resetTilt);
    document.addEventListener('mouseleave', resetTilt);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', resetTilt);
      document.removeEventListener('mouseleave', resetTilt);
    };
  }, [
    transition,
    onTiltChange,
    onTiltStart,
    onTiltEnd,
    lockAxisX,
    lockAxisY,
    maxTilt,
    resetTiltOnOutOfBounds,
    resetTiltOnHover,
    actionOffset,
    zoomOnTilt,
    zoomScale,
  ]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default Tilt3D;
