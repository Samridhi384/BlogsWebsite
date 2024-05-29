//factory is a function that creates some ommon resources that we might want to use through our test suite
const Bufffer = require("safe-buffer").Buffer;
const Keygrip = require("keygrip");
const keys = require("../../config/keys");
const keygrip = new Keygrip([keys.cookieKey]);

module.exports = (user) => {
  const sessionObject = {
    passport: {
      user: user._id.toString(),
    },
  };
  const session = Bufffer.from(JSON.stringify(sessionObject)).toString(
    "base64"
  );

  const sig = keygrip.sign("session=" + session);

  return { session, sig };
};
