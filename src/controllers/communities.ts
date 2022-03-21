import { Community } from "@prisma/client";
import { Request, response, Response } from "express";
import App from "..";
import { getCommunities } from '../helpers/communities';
import { dataRenderer } from "../utils/dataRenderer";
import { Params } from '../services/communityServices';


export const handleGetCommunities = async (req: Request, res: Response) => {

    try {
    const requestData = req.body;

    const conditions = new Params(requestData).getCommunityParams();

    const responseData:any = await getCommunities(conditions);

    res.json({data: dataRenderer(responseData[0]), total: responseData[1]});

    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

}