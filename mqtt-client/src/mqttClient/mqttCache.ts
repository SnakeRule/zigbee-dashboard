export function initStateCache() {
  const messageCache: Record<string, any> = {};
  const valueLastInserted: Record<string, Record<string, number>> = {};

  function getMqttCache() {
    return messageCache;
  }

  function getFromMqttCache(topic: string) {
    return messageCache[topic];
  }

  function updateMqttCache(topic: string, deviceState: object) {
    messageCache[topic] = deviceState;
  }

  function getLastInsertedValueTime(topic: string, field: string) {
    return valueLastInserted[topic]?.[field] ?? 0;
  }

  function updateValueLastInsertedTime(topic: string, field: string) {
    // Initialize the topic if it doesn't exist yet
    if (valueLastInserted[topic] === undefined) {
      valueLastInserted[topic] = {};
    }
    valueLastInserted[topic][field] = Date.now();
  }

  return {
    getMqttCache,
    getFromMqttCache,
    updateMqttCache,
    getLastInsertedValueTime,
    updateValueLastInsertedTime,
  };
}
