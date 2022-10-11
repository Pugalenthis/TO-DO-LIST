import Jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(createError(401, "you are not authenticated"));

  Jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) next(createError(403, "Token is not valid"));
    req.user = user;
    next();
  });
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(createError(401, "you are not authenticated"));

  Jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) next(createError(403, "Token is not valid"));
    req.user = user;
  });

  if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, "you are not authorized"));
  }
};

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(createError(401, "you are not authenticated"));

  Jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.user = user;
  });

  if (req.user.isAdmin) next();
  else {
    return next(createError(403, "you are not authorized"));
  }
};
