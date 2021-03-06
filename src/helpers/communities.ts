import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const getCommunities = async (options:any) => {
    
    const result = await prisma.community.findFirst(options);

    const rCount = await prisma.community.count(options);
    
    return [result, rCount]

}