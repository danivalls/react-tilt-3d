interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

export async function requestGyroPermission() {
  const deviceMotion =
    DeviceOrientationEvent as unknown as DeviceOrientationEventiOS;

  if (
    typeof DeviceOrientationEvent === 'undefined' ||
    !deviceMotion.requestPermission
  ) {
    return new Promise((resolve) => resolve('denied'));
  }

  return deviceMotion.requestPermission().catch(console.error);
}
