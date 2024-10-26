import { useReducer, useState } from 'react';
import { Config, LoggersOptions } from './Controls/Controls.types';
import Controls from './Controls';
import { Tilt3D } from 'react-tilt-3d';
import EventLogger from './EventLogger';
import { EventLog } from './EventLogger/EventLogger.types';

const INITIAL_CONFIG: Config = {
  resetTiltOnOutOfBounds: false,
  resetTiltOnHover: false,
  zoomOnTilt: false,
  maxTilt: 25,
  actionOffset: 250,
  zoomScale: 1.25,
  lockAxisX: false,
  lockAxisY: false,
  enableGyro: false,
  enableLighting: true,
};

const INITIAL_LOGGERS: LoggersOptions = {
  logOnTiltStart: true,
  logOnTiltEnd: true,
  logOnTiltChange: false,
};

function App() {
  const [config, setConfig] = useReducer(
    (currentConfig: Config, newConfig: Partial<Config>) => ({
      ...currentConfig,
      ...newConfig,
    }),
    INITIAL_CONFIG
  );

  const [eventLoggers, setEventLoggers] = useReducer(
    (currentLoggers: LoggersOptions, newLoggers: Partial<LoggersOptions>) => ({
      ...currentLoggers,
      ...newLoggers,
    }),
    INITIAL_LOGGERS
  );

  const [log, setLog] = useState<EventLog[]>([]);

  const handleTiltStart = () => {
    if (eventLoggers.logOnTiltStart) {
      setLog((prevLog) => [
        ...prevLog,
        { timestamp: Date.now(), type: 'onTiltStart' },
      ]);
    }
  };

  const handleTiltEnd = () => {
    if (eventLoggers.logOnTiltEnd) {
      setLog((prevLog) => [
        ...prevLog,
        { timestamp: Date.now(), type: 'onTiltEnd' },
      ]);
    }
  };

  const handleTiltChange = (tilt: { x: number; y: number }) => {
    if (eventLoggers.logOnTiltChange) {
      setLog((prevLog) => [
        ...prevLog,
        { timestamp: Date.now(), type: 'onTiltChange', data: tilt },
      ]);
    }
  };

  return (
    <>
      <Controls config={config} setConfig={setConfig} />
      <EventLogger
        eventLoggers={eventLoggers}
        setEventLoggers={setEventLoggers}
        log={log}
      />
      <div className="playground-zone">
        <Tilt3D
          maxTilt={config.maxTilt}
          actionOffset={config.actionOffset}
          resetTiltOnOutOfBounds={config.resetTiltOnOutOfBounds}
          resetTiltOnHover={config.resetTiltOnHover}
          zoomOnTilt={config.zoomOnTilt}
          zoomScale={config.zoomScale}
          lockAxisX={config.lockAxisX}
          lockAxisY={config.lockAxisY}
          onTiltStart={
            eventLoggers.logOnTiltStart ? handleTiltStart : undefined
          }
          onTiltEnd={eventLoggers.logOnTiltEnd ? handleTiltEnd : undefined}
          onTiltChange={
            eventLoggers.logOnTiltChange ? handleTiltChange : undefined
          }
          enableGyro={config.enableGyro}
          enableLighting={config.enableLighting}
        >
          <img src="./democard.png" alt="image" width={150} />
        </Tilt3D>
        <div className="links">
          <a
            href="https://www.npmjs.com/package/react-tilt-3d"
            target="_blank"
            rel="noreferrer"
          >
            <img src="./npmjs-logo.svg" alt="image" width={50} />
          </a>
          <a
            href="https://github.com/danivalls/react-tilt-3d"
            target="_blank"
            rel="noreferrer"
          >
            <img src="./gh-logo.svg" alt="image" width={50} />
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
