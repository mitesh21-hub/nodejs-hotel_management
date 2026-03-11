import * as Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { Users } from '../entity/Users';
import { Bookings } from '../entity/Bookings';
const apiResponse = require("../services/apiResponse.js");
const config = process.env;

interface TokenPayload {
    exp: number;
    accessTypes: string[];
    user_name: string;
    userId: number;
}
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["x-access-token"];
    if (!token) {
        return res.send("Token is required for authentication"
        );
    }

    let jwtPayload;

    jwtPayload = <any>Jwt.verify(token, config.TOKEN_KEY, (err: Error, decoded: TokenPayload) => {
        if (err) {
            return res.send("Invalid token");
        }
        res.locals.Users = decoded.userId;
        next();
    });

};
