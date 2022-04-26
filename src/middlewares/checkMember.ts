import { NextFunction, Request, Response } from 'express';
import { getMembers } from '../helpers/members';
import { Communities } from '../services/communities';
import { Members } from '../services/members';
import { dataRenderer } from '../utils/dataRenderer';
import { getCommunities } from '../helpers/communities';

export async function CheckMember(req: Request, res: Response, next: NextFunction) {

    try {

        // Un member de algo es aquel que filtrando por communitySlug y userID en community_member te devuelve un miembro.
        // Pasos:
        // 1 - Revisar que tenemos los datos necesarios (communitySlug)
        // 2 - Filtrar en miembros por userID y communityID.
        // 3A - En caso de estar bien se hace un set de req.preData con los datos de la comunidad y se manda un next().
        // 3B - En caso de estar mal se manda un error.  

        const requestData = req.body;

        if (requestData.communitySlug == null || requestData.userID == null) {
            res.sendStatus(403);
            return;
        }

        const conditionForMember = new Members({ communitySlug: requestData.communitySlug, userID: requestData.userID }).getMembersParams();

        const communityMember:any = await getMembers(conditionForMember);

        if (communityMember[1] < 1) {
            res.sendStatus(403);
            return;
        }

        req.body.preData = {...req.body.preData, member: (dataRenderer(communityMember[0][0], true))[0]};

        next();

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


}