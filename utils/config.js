export default {
  url: 'http://3.34.206.68',
  websocketURL: 'https://ws.ledx.io:443',
  nodeURL: 'http://test.ledgis.io:8011',
  graphURL: `http://121.134.238.182:1926/graphql`,
  nodeContract: 'led.token',
  tokenSymbol: 'MIS',
  chainId: 'ee4cd9c9f7b263e413ded83eb4f55329f51f7f839741fec314e2edd2b9b5b955',
  appName: '아나파톡',
  fallbackURL: 'anapatalk://',
  misContract: 'mistesttest3',
  enc_key: 'key_misblock',
  enc_iv: 'iv_misblock',
  enc_mode: 'aes-256-cbc',
  timezone: '+1800',
  params: {
    grant_type: 'password', //액션마다 다름
    client_id: 'misblock-app',
    client_secret: 'misblock',
    scope: 'all',
  },
  kycHeaders: {
    'Content-Type': 'application/json',
    secret: 'f5f78a08d1ba6688fcd6d19cbd8501ce83fde00ca01a44c204e1daa646350a8b',
  },
  configLoginHeaders: {
    'Content-Type': 'application/json',
    'cache-control': 'no-cache',
  },
  configCmmHeader: {
    Accept: '*/*',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Content-Type': 'application/json',
    headers: { Authorization: '' },
  },
  configFileHeader: {
    Accept: '*/*',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    headers: { Authorization: '', 'Content-Type': 'multipart/form-data' },
  },
  configFileHeader2: {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: '',
    },
  },
};
