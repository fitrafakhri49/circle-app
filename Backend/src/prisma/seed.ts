import { prisma } from "./client";


async function main() {
    await prisma.threads.deleteMany()
    // await prisma.users.deleteMany()
   
//    const users =await prisma.users.createMany({
//     data : [
//         {username:"Fakhri1",full_name:"Fakhri 1",email:"fakhri1@gmail.com",password:"12345678",photo_profile:"Test1",bio:"Test1"},
//         {username:"Fakhri2",full_name:"Fakhri 2",email:"fakhri2@gmail.com",password:"12345678",photo_profile:"Test2",bio:"Test2" },
//         {username:"Fakhri3",full_name:"Fakhri 3",email:"fakhri3@gmail.com",password:"12345678",photo_profile:"Test3",bio:"Test3"},
//         {username:"Fakhri4",full_name:"Fakhri 4",email:"fakhri4@gmail.com",password:"12345678",photo_profile:"Test4",bio:"Test4"}
//     ]
//    })

    const threads =await prisma.threads.createMany({
        data:[
            {content:"Test 1",image:"https://placehold.co/600x400",number_of_replies:3,created_by:1,updated_by:1},
            {content:"Test 2",image:"https://placehold.co/600x400",number_of_replies:5,created_by:1,updated_by:1},
            {content:"Test 3",image:"https://placehold.co/600x400",number_of_replies:6,created_by:1,updated_by:1},
            {content:"Test 4",image:"https://placehold.co/600x400",number_of_replies:9,created_by:1,updated_by:1},


        ]
    })

}



main()
.then( () => {
    console.log("seeding berhasil");
})
.catch(async (e) => {
    console.error(e)
})
.finally(async () => {
    await prisma.$disconnect
})