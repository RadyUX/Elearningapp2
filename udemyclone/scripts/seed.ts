const {PrismaClient} = require("@prisma/client")

const db = new PrismaClient()

async function main(){
    try{
        await db.category.createMany({
            data:[
                {name: "Javascript"},
                {name: "HTML & CSS"},
                {name: "Algorithme & Datastructure"},
                {name: "Node JS"}
            ]
        })
    }catch(error){
    console.log(error)
    }finally{
        await db.$disconnect
    }
}

main()