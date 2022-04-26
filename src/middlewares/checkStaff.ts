import { NextFunction, Request, Response } from 'express';
import { getMembers } from '../helpers/members';
import { Members } from '../services/members';
import { dataRenderer } from '../utils/dataRenderer';

export async function CheckStaff(req: Request, res: Response, next: NextFunction) {

    try {

        // Necesita obligatoriamente que antes se ejecute el middleware de checkMember y Authorized.

        const requestData = req.body;

        if (requestData.communitySlug == null || requestData.userID == null || requestData.preData?.member == null) {
            res.sendStatus(403);
            return;
        }

        if (!requestData.preData?.member.isStaff && !requestData.preData?.member.member[0].isStaff) {
            res.sendStatus(403);
            return;
        }

        req.body.preData.isStaff = true;

        next();

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


}