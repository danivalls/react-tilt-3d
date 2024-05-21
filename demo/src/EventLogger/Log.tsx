import { Fragment, useEffect, useRef } from 'react';
import { EventLog } from './EventLogger.types';

const Log = ({ log }: { log: EventLog[] }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [log]);

  return (
    <div className="log" ref={ref}>
      {log.map(({ timestamp, type, data }, index) => (
        <Fragment key={timestamp}>
          <span>{index + 1}.</span>
          <span>{type}</span>
          <span>{JSON.stringify(data)}</span>
        </Fragment>
      ))}
    </div>
  );
};

export default Log;
