const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        // Delete existing categories
        await db.category.deleteMany({});

        // Create new categories
        await db.category.createMany({
            data: [
                {name: "Javascript"},
                {name: "HTML & CSS"},
                {name: "Node JS"},
                {name: "React JS"},
                {name: "Typescript"},
                {name: "mySQL"},
                {name: "Algorithme & Datastructure"},
            ]
        });
    } catch (error) {
        console.log(error);
    } finally {
        await db.$disconnect();
    }
}

main();
