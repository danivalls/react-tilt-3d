export type CursorPos = {
  x: number;
  y: number;
};

export type Tilt = {
  x: number;
  y: number;
};

type TimingFunctionKeyword =
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'linear'
  | 'step-start'
  | 'step-end'
  | 'bounce';

type TimingFunctionGlobalValues =
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'revert-layer'
  | 'unset';

type CubicBezierFragment = `${'' | ' '}${number}`;

export type CubicBezier =
  `cubic-bezier(${CubicBezierFragment},${CubicBezierFragment},${CubicBezierFragment},${CubicBezierFragment})`;

export type TransitionTimingFunction =
  | TimingFunctionKeyword
  | CubicBezier
  | TimingFunctionGlobalValues;

export type Props = {
  maxTilt?: number;
  resetTiltOnOutOfBounds?: boolean;
  resetTiltOnHover?: boolean;
  actionOffset?: number;
  children?: React.ReactNode;
  className?: string;
  zoomOnTilt?: boolean;
  zoomScale?: number;
  lockAxisX?: boolean;
  lockAxisY?: boolean;
  transition?: TransitionTimingFunction;
  enableGyro?: boolean;
  onTiltChange?: (tilt: Tilt) => void;
  onTiltStart?: () => void;
  onTiltEnd?: () => void;
  enableLighting?: boolean;
};

export type CalculateTiltOptions = {
  maxTilt: number;
  resetTiltOnOutOfBounds: boolean;
  resetTiltOnHover: boolean;
  offset: number;
  lockAxisX: boolean;
  lockAxisY: boolean;
};

export type Coords = {
  top: number;
  left: number;
};
