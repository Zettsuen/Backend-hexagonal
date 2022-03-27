import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const getMembers = async (options:any) => {
    
    const result = await prisma.communityMember.findMany(options);

    const rCount = await prisma.communityMember.count({where: options.where});
    
    return [result, rCount]

}