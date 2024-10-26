import { useEffect, useState } from 'react';
import { ControlsProps } from './Controls.types';
import { requestGyroPermission } from 'react-tilt-3d';
import './styles.css';

const Controls = ({ config, setConfig }: ControlsProps) => {
  const {
    resetTiltOnOutOfBounds,
    resetTiltOnHover,
    zoomOnTilt,
    maxTilt,
    actionOffset,
    zoomScale,
    enableGyro,
    enableLighting,
  } = config;
  const [isGyroAvailable, setGyroAvailable] = useState<boolean>();

  const request = () => {
    requestGyroPermission().then((permission) => {
      if (permission === 'granted') {
        setGyroAvailable(true);
      } else {
        setGyroAvailable(false);
      }
    });
  };

  useEffect(() => {
    const checkIfAlreadyGranted = () => {
      setGyroAvailable(true);
      window.removeEventListener('deviceorientation', checkIfAlreadyGranted);
    };
    window.addEventListener('deviceorientation', checkIfAlreadyGranted);

    return () => {
      window.removeEventListener('deviceorientation', checkIfAlreadyGranted);
    };
  }, []);

  return (
    <div className="controls-container">
      <label>
        <input
          type="checkbox"
          checked={resetTiltOnOutOfBounds}
          onChange={({ target }) =>
            setConfig({ resetTiltOnOutOfBounds: target.checked })
          }
          disabled={enableGyro}
        />
        Reset tilt on out of bounds
      </label>
      <label>
        <input
          type="checkbox"
          checked={resetTiltOnHover}
          onChange={({ target }) =>
            setConfig({ resetTiltOnHover: target.checked })
          }
          disabled={enableGyro}
        />
        Reset tilt on hover
      </label>
      <label>
        <input
          type="checkbox"
          checked={zoomOnTilt}
          onChange={({ target }) => setConfig({ zoomOnTilt: target.checked })}
          disabled={enableGyro}
        />
        Zoom on tilt
      </label>
      <label>
        Lock axis X
        <input
          type="checkbox"
          checked={config.lockAxisX}
          onChange={({ target }) => setConfig({ lockAxisX: target.checked })}
          disabled={enableGyro}
        />
      </label>
      <label>
        Lock axis Y
        <input
          type="checkbox"
          checked={config.lockAxisY}
          onChange={({ target }) => setConfig({ lockAxisY: target.checked })}
          disabled={enableGyro}
        />
      </label>
      <label>
        Max tilt: <code>{maxTilt}</code>
        <input
          type="range"
          min={0}
          max={90}
          value={maxTilt}
          onChange={(e) => setConfig({ maxTilt: Number(e.target.value) })}
        />
      </label>
      <label>
        Action offset: <code>{actionOffset}</code>
        <input
          type="range"
          min={0}
          max={500}
          value={actionOffset}
          onChange={({ target }) =>
            setConfig({ actionOffset: Number(target.value) })
          }
          disabled={enableGyro}
        />
      </label>

      <label>
        Zoom scale: <code>{zoomScale}</code>
        <input
          disabled={!zoomOnTilt || enableGyro}
          type="range"
          min={1}
          max={2}
          step={0.01}
          value={zoomScale}
          onChange={({ target }) =>
            setConfig({ zoomScale: Number(target.value) })
          }
        />
      </label>
      <label>
        Enable Gyro
        {isGyroAvailable ? (
          <input
            type="checkbox"
            checked={enableGyro}
            onChange={({ target }) => setConfig({ enableGyro: target.checked })}
          />
        ) : (
          <button onClick={request}>
            {isGyroAvailable === false
              ? 'Gyro not available'
              : 'Request permission'}
          </button>
        )}
      </label>
      <label>
        Enable Lighting
        <input
          type="checkbox"
          checked={enableLighting}
          onChange={({ target }) =>
            setConfig({ enableLighting: target.checked })
          }
        />
      </label>
    </div>
  );
};

export default Controls;
