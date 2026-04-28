export function logInfo(message, payload = {}) {
  console.log(`[lifeline-ai] ${message}`, payload);
}

export function logError(message, payload = {}) {
  console.error(`[lifeline-ai] ${message}`, payload);
}
