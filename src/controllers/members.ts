import { Request, Response } from "express";
import { dataRenderer } from "../utils/dataRenderer";
import { Members } from '../services/members';
import { getMembers } from '../helpers/members';
import { ExpressErrors } from "../models/errors";


export const handleGetMembers = async (req: Request, res: Response) => {

    try {
        const requestData = req.body;

        const conditions = new Members(requestData).getMembersParams();

        const responseData: any = await getMembers(conditions);

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