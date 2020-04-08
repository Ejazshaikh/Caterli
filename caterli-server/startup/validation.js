module.exports = function () {
  if (!process.env.caterli_jwtPrivateKey) {
    console.error('ERROR: caterli_jwtPrivateKey is not defined in Environment Variables');
    process.exit(1);
  }
};
