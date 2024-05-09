import { ControlsProps } from './Controls.types';
import './styles.css';

const Controls = ({ config, setConfig }: ControlsProps) => {
  const {
    resetTiltOnOutOfBounds,
    resetTiltOnHover,
    zoomOnTilt,
    maxTilt,
    actionOffset,
    zoomScale,
  } = config;

  return (
    <div className="controls-container">
      <label>
        <input
          type="checkbox"
          checked={resetTiltOnOutOfBounds}
          onChange={({ target }) =>
            setConfig({ resetTiltOnOutOfBounds: target.checked })
          }
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
        />
        Reset tilt on hover
      </label>
      <label>
        <input
          type="checkbox"
          checked={zoomOnTilt}
          onChange={({ target }) => setConfig({ zoomOnTilt: target.checked })}
        />
        Zoom on tilt
      </label>
      <label>
        Lock axis X
        <input
          type="checkbox"
          checked={config.lockAxisX}
          onChange={({ target }) => setConfig({ lockAxisX: target.checked })}
        />
      </label>
      <label>
        Lock axis Y
        <input
          type="checkbox"
          checked={config.lockAxisY}
          onChange={({ target }) => setConfig({ lockAxisY: target.checked })}
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
        />
      </label>
      <label>
        Zoom scale: <code>{zoomScale}</code>
        <input
          disabled={!zoomOnTilt}
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
    </div>
  );
};

export default Controls;
