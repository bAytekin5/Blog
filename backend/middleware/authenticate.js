import jwt from "jsonwebtoken";

export const authanticate = async (req, res, next) => {
  try {
    const token  = req.cookies.access_token;
    if (!token) {
      next(403, "Yetkisiz İşlem");
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken;
    next();
  } catch (error) {
    next(500, error.message);
  }
};
