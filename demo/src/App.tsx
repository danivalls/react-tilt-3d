import { useReducer } from 'react';
import { Config } from './Controls/Controls.types';
import Controls from './Controls';
import { Tilt3D } from 'react-tilt-3d';

const INITIAL_VALUES: Config = {
  resetTiltOnOutOfBounds: false,
  resetTiltOnHover: false,
  zoomOnTilt: false,
  maxTilt: 60,
  actionOffset: 250,
  zoomScale: 1.25,
  lockAxisX: false,
  lockAxisY: false,
};

function App() {
  const [config, setConfig] = useReducer(
    (currentConfig: Config, newConfig: Partial<Config>) => ({
      ...currentConfig,
      ...newConfig,
    }),
    INITIAL_VALUES
  );

  return (
    <>
      <Controls config={config} setConfig={setConfig} />
      <div>
        <Tilt3D
          maxTilt={config.maxTilt}
          actionOffset={config.actionOffset}
          resetTiltOnOutOfBounds={config.resetTiltOnOutOfBounds}
          resetTiltOnHover={config.resetTiltOnHover}
          zoomOnTilt={config.zoomOnTilt}
          zoomScale={config.zoomScale}
          lockAxisX={config.lockAxisX}
          lockAxisY={config.lockAxisY}
        >
          <img src="./democard.png" alt="image" width={150} />
        </Tilt3D>
      </div>
    </>
  );
}

export default App;
