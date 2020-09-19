const { admin } = require("./firebaseAdmin");

module.exports = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(function (decodedToken) {
      req.uid = decodedToken.uid;
      return next();
    })
    .catch(function (err) {
      //console.error("Error while verifying token ");
      return res.status(403).json(err);
    });
};
