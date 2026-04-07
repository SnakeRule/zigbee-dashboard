export function initStateHandler() {
  const state: Record<string, any> = {};
  const valueLastInserted: Record<string, Record<string, number>> = {};

  function getAllStates() {
    return state;
  }

  function getDeviceState(topic: string) {
    return state[topic];
  }

  function updateDeviceState(topic: string, deviceState: object) {
    state[topic] = deviceState;
  }

  function getLastInsertedValue(topic: string, field: string) {
    return valueLastInserted[topic]?.[field] ?? 0;
  }

  function updateValueLastInserted(topic: string, field: string) {
    valueLastInserted[topic] ??= {}; // Initialize the topic if it doesn't exist yet
    valueLastInserted[topic][field] = Date.now();
  }

  return {
    getAllStates,
    getDeviceState,
    updateDeviceState,
    getLastInsertedValue,
    updateValueLastInserted,
  };
}
