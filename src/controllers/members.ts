import { Request, Response } from "express";
import { dataRenderer } from "../utils/dataRenderer";
import { Members } from '../services/members/members';
import { getMembers } from '../helpers/members';


export const handleGetMembers = async (req: Request, res: Response) => {

    try {
        const requestData = req.body;

        const conditions = new Members(requestData).getMembersParams();

        const responseData: any = await getMembers(conditions);

        res.json({ data: dataRenderer(responseData[0]), total: responseData[1] });

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

}