import { Prisma } from "@prisma/client";
import { getIfCanDoIt } from "../helpers/roles";
import { ExpressErrors } from "../models/errors";

export async function checkRoleAccess(permissionModel: string, permissionAction: string[], member:any) {
    
    // Pido los datos de los roles/permisos del usuario conectado a DB filtrado por el model

    let canDoIt = false;

    for(const row of permissionAction){
        const result:any = await getIfCanDoIt(permissionModel, row, member.memberId)
        if(result !== 0){
            canDoIt = true;
            break;
        }
    }
    if(!canDoIt){
        throw new ExpressErrors("Unauthorized", 403);
    }
}