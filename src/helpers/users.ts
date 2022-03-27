import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const getUsers = async (options:any) => {
    
    const result = await prisma.user.findFirst(options);

    const rCount = 1;
    
    return [result, rCount]

}