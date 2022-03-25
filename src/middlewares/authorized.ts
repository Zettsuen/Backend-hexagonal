import { NextFunction, Request, Response } from 'express';
import JWT, { JwtPayload, VerifyOptions } from "jsonwebtoken";

export interface DecodedJWT {
    sub: any
}

export function Authorized(req: Request, res: Response, next: NextFunction) {
            if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
                res.setHeader("WWW-Authenticate", "Bearer realm=\"Copernic OAuth\"")
                    .sendStatus(403);
                return;
            }
            const bearer = req.headers.authorization.substring(7);
            if (process.env.ENV === "DEV") {
                const jwt = JWT.decode(bearer);
                if (!jwt) {
                    res.setHeader("WWW-Authenticate", "Bearer realm=\"Copernic OAuth\", error=\"invalid_token\"")
                        .sendStatus(403);
                    return;
                }
                req.body.userID = jwt as DecodedJWT;
                next();
            } else {
                const publicKey:JWT.Secret = process.env.PUBLICKEY || ""
                JWT.verify(bearer, publicKey, {
                    algorithms: ["RS256"]
                } as VerifyOptions, (err, jwt) => {
                    if (err != null) {
                        res.status(403);
                    } else {
                        
                        req.body.userID = jwt as DecodedJWT;
                        next();
                    }
                })

            }

    
}