export type CursorPos = {
  x: number;
  y: number;
};

export type Tilt = {
  x: number;
  y: number;
};

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
};

export type CalculateTiltOptions = {
  maxTilt: number;
  resetTiltOnOutOfBounds?: boolean;
  resetTiltOnHover?: boolean;
  offset: number;
  lockAxisX: boolean;
  lockAxisY: boolean;
};

export type Coords = {
  top: number;
  left: number;
};
