type DeviceOrientation = Pick<DeviceOrientationEvent, 'beta' | 'gamma'>;
type MutableDeviceOrientation = {
  -readonly [P in keyof DeviceOrientation]: DeviceOrientation[P];
};

const initialOrientation: MutableDeviceOrientation = {
  beta: null,
  gamma: null,
};

const REGISTRATION_THRESHOLD = 1000;

let lastOrientationRegistered: DeviceOrientation & {
  registeredAt: null | number;
} = {
  beta: null,
  gamma: null,
  registeredAt: null,
};

const THRESHOLD = 3;
const isWithinThreshold = (a: number, b: number) =>
  Math.abs(Math.abs(a) - Math.abs(b)) < THRESHOLD;

const saveInitialOrientation = ({ beta, gamma }: DeviceOrientation) => {
  if ([beta, gamma].some((angle) => angle === null)) return;

  const setInitialOrientation = () => {
    initialOrientation.beta = beta!;
    initialOrientation.gamma = gamma!;
  };

  const registerLastOrientation = () => {
    lastOrientationRegistered = {
      beta: beta,
      gamma: gamma,
      registeredAt: Date.now(),
    };
  };

  if (
    Object.values(initialOrientation).some((angle) => angle === null) ||
    Object.values(initialOrientation).every((angle) => angle === 0)
  ) {
    setInitialOrientation();
    registerLastOrientation();
  }

  const now = Date.now();
  const mustRegisterAgain =
    now - lastOrientationRegistered.registeredAt! > REGISTRATION_THRESHOLD;
  const stoppedMoving =
    mustRegisterAgain &&
    isWithinThreshold(lastOrientationRegistered.beta!, beta!) &&
    isWithinThreshold(lastOrientationRegistered.gamma!, gamma!);

  if (stoppedMoving) {
    setInitialOrientation();
  }

  if (mustRegisterAgain) {
    registerLastOrientation();
  }
};

const calculateTiltFromGyro = (
  { beta, gamma }: DeviceOrientationEvent,
  maxTilt: number
) => {
  if ([beta, gamma].some((angle) => angle === null)) {
    return { x: 0, y: 0 };
  }

  const roundedBeta = Math.round(beta! * 100) / 100;
  const roundedGamma = Math.round(gamma! * 100) / 100;

  saveInitialOrientation({ beta: roundedBeta, gamma: roundedGamma });

  const x = (roundedGamma! - initialOrientation.gamma!) * -1;
  const y = roundedBeta! - initialOrientation.beta!;

  const limitTilt = (tilt: number) => {
    if (Math.abs(tilt) > maxTilt) {
      return tilt > 0 ? maxTilt : -maxTilt;
    }

    return tilt;
  };

  return {
    x: limitTilt(x),
    y: limitTilt(y),
  };
};

export default calculateTiltFromGyro;
