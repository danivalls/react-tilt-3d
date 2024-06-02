import { useEffect, useRef, useState } from 'react';
import { CursorPos, Props } from './types';
import calculateTilt from './utils/calculateTilt';
import generateStyleText from './utils/generateStyleText';
import getCurrentTilt from './utils/getCurrentTilt';
import calculateTiltFromGyro from './utils/calculateTiltFromGyro';

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
  enableGyro = false,
  onTiltChange,
  onTiltStart,
  onTiltEnd,
  className,
  children,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isGyroAvailable, setIsGyroAvailable] = useState(false);

  useEffect(() => {
    const registerIsGyroAvailable = (e: DeviceOrientationEvent) => {
      setIsGyroAvailable(Boolean(e.beta && e.gamma));
      removeEventListener('deviceorientation', registerIsGyroAvailable);
    };

    if (enableGyro && !isGyroAvailable) {
      addEventListener('deviceorientation', registerIsGyroAvailable);
    }

    return () => {
      removeEventListener('deviceorientation', registerIsGyroAvailable);
    };
  }, [enableGyro, isGyroAvailable]);

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

    const applyTiltFromGyro = (e: DeviceOrientationEvent) => {
      if (ref.current) {
        const tilt = calculateTiltFromGyro(e, maxTilt);

        const newStyle = generateStyleText(
          tilt,
          maxTilt,
          zoomOnTilt,
          zoomScale,
          transition,
          true
        );

        ref.current.style.cssText = newStyle;
        onTiltChange?.(tilt);
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

    if (enableGyro && isGyroAvailable) {
      window.addEventListener('deviceorientation', applyTiltFromGyro);
    } else {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', resetTilt);
      document.addEventListener('mouseleave', resetTilt);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', resetTilt);
      document.removeEventListener('mouseleave', resetTilt);

      window.removeEventListener('deviceorientation', applyTiltFromGyro);
    };
  }, [
    isGyroAvailable,
    enableGyro,
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
