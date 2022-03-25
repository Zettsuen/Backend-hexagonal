import { Request, response, Response } from "express";
import App from "..";
import { getCommunities } from '../helpers/communities';
import { dataRenderer } from "../utils/dataRenderer";
import { Communities } from '../services/community/communities';


export const handleGetCommunities = async (req: Request, res: Response) => {

    try {
        const requestData = req.body;

        const conditions = new Communities(requestData).getCommunityParams();

        const responseData: any = await getCommunities(conditions);

        res.json({ data: dataRenderer(responseData[0]), total: responseData[1] });

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

}