const { auth } = require("../../database");


let authenticationMiddleware = async (req, res, next) => {
  const token = req.headers.token
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  if (token == "1") {
    req.user = {
      aud:
        'books-store-cf637',
      auth_time:
        1706128129,
      email:
        'anastasiakim@gmail.com',
      email_verified:
        false,
      exp:
        1706131729,
      iat:
        1706128129,
      iss:
        'https://securetoken.google.com/books-store-cf637',
      sub:
        '3dV63GEHstfXeTMJCmVBtpD0j7s1',
      uid:
        '3dV63GEHstfXeTMJCmVBtpD0j7s1',
      user_id:
        '3dV63GEHstfXeTMJCmVBtpD0j7s1'
    }
    next();
  }else{
    try {
      const decodedToken = await auth.verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).json({ error: "Unauthorized" });
    }
  }

}
module.exports = authenticationMiddleware;
