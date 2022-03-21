import { NextFunction, Request, Response } from "express";

const bodyParser = async (req: Request, res: Response, next: NextFunction) => {
    if(req.headers != null && req.headers["content-type"] === "application/json"){
        if(["POST", "PUT"].includes(req.method)){
            try{

                req.body = await collectStream(req);
                next();

            }catch(err){
                console.log(err)
                res.status(400).send("Bad JSON");
                return;
            }
        }else{
            res.status(400).send("Invalid request method");
            return;
        }
    }else if(req.headers && !req.headers["content-type"]){
        req.body = req.query;
        next();
    }
}

const collectStream = async (req:Request) => {

    const body:Buffer[] = [];

    req.on("data", (chunck:Buffer) => {
        body.push(chunck);
    })

    const parsedBody = req.on("end", () => {
        const parsedBody = Buffer.concat(body).toString();
        return parsedBody;
    })

    return parsedBody;
}

export default bodyParser;