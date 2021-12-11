export const SET_POINT_ACTIONS = actions => ({
  type: 'SET_POINT_ACTIONS',
  value: actions,
});

export const CLEAR_POINT_ACTIONS = () => ({
  type: 'CLEAR_POINT_ACTIONS',
});

export const IS_POLLING_POINT_ACTIONS = value => ({
  type: 'IS_POLLING_POINT_ACTIONS',
  value: value,
});
