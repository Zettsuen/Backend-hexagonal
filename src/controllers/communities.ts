import { Request, Response } from "express";
import { getCommunities } from '../helpers/communities';
import { dataRenderer } from "../utils/dataRenderer";
import { Communities } from '../services/communities';
import { checkRoleAccess } from "../middlewares/CheckRoleAccess";
import { ExpressErrors } from "../models/errors";

export const handleGetCommunities = async (req: Request, res: Response): Promise<void> => {
    try {

        const requestData = req.body;

        // await checkRoleAccess("community", ["index", "view"], requestData.preData.member);

        const conditions = new Communities(requestData).getCommunityParams();

        const responseData: any = await getCommunities(conditions);

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
