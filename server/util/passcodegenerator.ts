export function generatePasscode(length?) {
  var length =length?length:6,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    passcode = '';
  for (var i = 0, n = charset.length; i < length; ++i) {
    passcode += charset.charAt(Math.floor(Math.random() * n));
  }
  return passcode;
}
