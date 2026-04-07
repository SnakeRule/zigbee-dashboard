export function findDeviceByFriendlyName(
  devices: {
    friendly_name: string;
    ieee_address: string;
  }[],
  friendlyName: string,
) {
  return devices.find(
    (device: { friendly_name: string }) =>
      device.friendly_name === friendlyName,
  );
}

// Only save if the value has changed or if it's been an hour since the last inserted value
export function shouldSaveValueToDb(
  newValue: any,
  field: string,
  targetDeviceState: Record<string, any>,
  lastInsertedAt: number,
) {
  return (
    newValue !== undefined &&
    (newValue !== targetDeviceState?.[field] ||
      lastInsertedAt < Date.now() - 60 * 60 * 1000)
  );
}
