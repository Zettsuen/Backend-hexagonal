import { Request, Response } from "express";
import { dataRenderer } from "../utils/dataRenderer";
import { Users } from '../services/users/users';
import { getUsers } from '../helpers/users';


export const handleGetUsers = async (req: Request, res: Response) => {

    try {
        const requestData = req.body;

        const conditions = new Users(requestData).getUsersParams();

        const responseData: any = await getUsers(conditions);

        res.json({ data: dataRenderer(responseData[0]), total: responseData[1] });

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

}