const { auth } = require("../../database");


let authenticationMiddleware = async (req, res, next) => {
  const token = req.headers.token
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Unauthorized" });
  }

}
module.exports = authenticationMiddleware;
