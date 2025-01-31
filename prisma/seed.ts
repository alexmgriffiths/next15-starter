import { PrismaClient } from '@prisma/client';
const users = require('./seeds/users.json');
const prisma = new PrismaClient();

async function main() {
    await addUsers();
}

async function addUsers() {
    const usersData = users;
    const data = usersData.map(({ id, ...rest }: any) => ({ id, ...rest }));
    await prisma.user.createMany({
        data: data,
        skipDuplicates: true,
    });
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
