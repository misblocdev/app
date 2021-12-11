export const SET_TOKEN_ACTIONS = actions => ({
  type: 'SET_TOKEN_ACTIONS',
  value: actions,
});

export const CLEAR_TOKEN_ACTIONS = () => ({
  type: 'CLEAR_TOKEN_ACTIONS',
});

export const IS_POLLING_TOKEN_ACTIONS = value => ({
  type: 'IS_POLLING_TOKEN_ACTIONS',
  value: value,
});
