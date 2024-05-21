import { LoggersOptions } from '../Controls/Controls.types';

export type EventLog = {
  timestamp: number;
  type: string;
  data?: { x: number; y: number };
};

export type EventLoggerProps = {
  log: EventLog[];
  eventLoggers: LoggersOptions;
  setEventLoggers: (loggers: Partial<LoggersOptions>) => void;
};
