import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const getIfCanDoIt = async (permissionModel: string, permissionAction: string, memberID:number) => {

    const result = await prisma.$executeRaw`SELECT COUNT(*) FROM model_has_roles JOIN role_has_permissions ON (role_has_permissions.role_id = model_has_roles.role_id) JOIN permissions ON (role_has_permissions.permission_id = permissions.id) WHERE model_has_roles.model_type LIKE "member" AND model_has_roles.model_id LIKE ${memberID} AND permissions.action LIKE ${permissionAction} AND permissions.model_type LIKE ${permissionModel};`;

    return result;

}