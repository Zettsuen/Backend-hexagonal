import { NextFunction, Request, Response } from "express";

export function CORS(req: Request, res: Response, next: NextFunction){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Origin, Accept, X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, DELETE, GET");
    next();
}