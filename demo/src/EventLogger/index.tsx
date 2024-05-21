import { EventLoggerProps } from './EventLogger.types';
import Log from './Log';
import './styles.css';

const EventLogger = ({
  eventLoggers,
  setEventLoggers,
  log,
}: EventLoggerProps) => {
  return (
    <div className="event-logger-container">
      <label>
        <input
          type="checkbox"
          checked={eventLoggers.logOnTiltStart}
          onChange={({ target }) =>
            setEventLoggers({ logOnTiltStart: target.checked })
          }
        />
        Log on tilt start
      </label>
      <label>
        <input
          type="checkbox"
          checked={eventLoggers.logOnTiltEnd}
          onChange={({ target }) =>
            setEventLoggers({ logOnTiltEnd: target.checked })
          }
        />
        Log on tilt end
      </label>
      <label>
        <input
          type="checkbox"
          checked={eventLoggers.logOnTiltChange}
          onChange={({ target }) =>
            setEventLoggers({ logOnTiltChange: target.checked })
          }
        />
        Log on tilt change
      </label>

      <Log log={log} />
    </div>
  );
};

export default EventLogger;
