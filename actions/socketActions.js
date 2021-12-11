export const CLEAR_SOCKET_DATA = () => ({
  type: 'CLEAR_SOCKET_DATA',
});

export const SET_SOCKET_DATA = (success, value) => ({
  type: 'SET_SOCKET_DATA',
  success: success,
  value: value,
});
