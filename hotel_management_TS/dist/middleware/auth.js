"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var Jwt = require("jsonwebtoken");
var apiResponse = require("../services/apiResponse.js");
var config = process.env;
var verifyToken = function (req, res, next) {
    var token = req.headers["x-access-token"];
    if (!token) {
        return res.send("Token is required for authentication");
    }
    var jwtPayload;
    jwtPayload = Jwt.verify(token, config.TOKEN_KEY, function (err, decoded) {
        if (err) {
            return res.send("Invalid token");
        }
        res.locals.Users = decoded.userId;
        next();
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map