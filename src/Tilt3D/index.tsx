import { useEffect, useRef } from 'react';
import { CursorPos, Props } from './types';
import calculateTilt from './utils/calculateTilt';
import generateStyleText from './utils/generateStyleText';

/**
 * A 3D tilt effect component that follows the cursor or touch movement.
 *
 * @component
 * @param {object} props - The component props.
 * @param {number} [props.maxTilt=45] - The maximum tilt angle in degrees.
 * @param {boolean} [props.resetTiltOnOutOfBounds] - Whether to reset the tilt when the cursor moves out of bounds.
 * @param {boolean} [props.resetTiltOnHover] - Whether to reset the tilt when the cursor hovers over the component.
 * @param {number} [props.actionOffset] - The offset in pixels from the center of the component where the tilt action starts.
 * @param {boolean} [props.zoomOnTilt=false] - Whether to zoom in on the component when tilting.
 * @param {number} [props.zoomScale=1.25] - The scale factor for zooming in on the component.
 * @param {boolean} [props.lockAxisX=false] - Whether to lock the tilt movement to the X-axis.
 * @param {boolean} [props.lockAxisY=false] - Whether to lock the tilt movement to the Y-axis.
 * @param {string} [props.className] - The CSS class name for the wrapper.
 * @param {ReactNode} props.children - The child elements to render.
 * @returns {JSX.Element} The rendered Tilt3D component.
 */
const Tilt3D = ({
  maxTilt = 25,
  resetTiltOnOutOfBounds,
  resetTiltOnHover,
  actionOffset = 0,
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
