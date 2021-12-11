export const WALLET_LOGIN = (value, account, permission) => ({
  type: 'WALLET_LOGIN',
  value: value,
  account: account,
  permission: permission,
});

export const WALLET_LOGOUT = () => ({
  type: 'WALLET_LOGOUT',
});

export const REFRESH_TOKEN_BALANCE = value => ({
  type: 'REFRESH_TOKEN_BALANCE',
  balance: value,
});

export const REFRESH_POINT_BALANCE = (value, tier, remainLike, lastLikeTime, hospitals) => ({
  type: 'REFRESH_POINT_BALANCE',
  points: value,
  tier: tier,
  remainLike: remainLike,
  lastLikeTime: lastLikeTime,
  hospitals: hospitals
});
