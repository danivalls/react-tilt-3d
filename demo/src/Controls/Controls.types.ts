export type Config = {
  maxTilt: number;
  resetTiltOnOutOfBounds: boolean;
  resetTiltOnHover: boolean;
  actionOffset: number;
  zoomOnTilt: boolean;
  zoomScale: number;
  lockAxisX: boolean;
  lockAxisY: boolean;
  enableGyro: boolean;
  enableLighting: boolean;
};

export type LoggersOptions = {
  logOnTiltStart: boolean;
  logOnTiltEnd: boolean;
  logOnTiltChange: boolean;
};

export type ControlsProps = {
  config: Config;
  setConfig: (config: Partial<Config>) => void;
};
