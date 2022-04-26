import { Request, Response } from "express";
import { dataRenderer } from "../utils/dataRenderer";
import { Users } from '../services/users';
import { getUsers } from '../helpers/users';
import { ExpressErrors } from "../models/errors";


export const handleGetUsers = async (req: Request, res: Response) => {

    try {
        const requestData = req.body;

        const conditions = new Users(requestData).getUsersParams();

        const responseData: any = await getUsers(conditions);

        res.json({ data: dataRenderer(responseData[0]), total: responseData[1] });

    } catch (err:any) {
        console.log(err);
        if(err instanceof ExpressErrors){
            res.sendStatus(err.status);
            return;
        }
        console.log(err);
        res.status(500);

    }

}