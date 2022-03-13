const disconnectedKey = 'disconnected';

export function isDisconnected() {
  return !!localStorage.getItem(disconnectedKey);
}

export function setDisconnected() {
  return localStorage.setItem(disconnectedKey, 'true');
}

export function clearDisconnected() {
  return localStorage.removeItem(disconnectedKey);
}
