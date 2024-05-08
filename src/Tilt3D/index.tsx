import { useEffect, useRef } from 'react';
import { CursorPos, Props } from './types';
import calculateTilt from './utils/calculateTilt';
import generateStyleText from './utils/generateStyleText';

const Tilt3D = ({
  maxTilt = 45,
  resetTiltOnOutOfBounds,
  resetTiltOnHover,
  actionOffset,
  zoomOnTilt = false,
  zoomScale = 1.25,
  lockAxisX = false,
  lockAxisY = false,
  className,
  children,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resetTilt = () => {
      if (ref.current) {
        ref.current.style.cssText = `
        filter: brightness(1);
        transform: perspective(10cm) rotateX(0deg) rotateY(0deg) translateZ(0) scale(1);
        transition: all 0.25s cubic-bezier(.32,.66,.72,1.58);
        `;
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

        ref.current.style.cssText = generateStyleText(
          tilt,
          maxTilt,
          zoomOnTilt,
          zoomScale
        );
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
