// src/prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const userId = 2;                 
  const threadId = 2;               

  

await prisma.threads.createMany({
  data: [
    {
      content: "Thread pertama dari user 1",
      image: "",
      created_by:userId,
      updated_by: userId,
      
    },
    {
      content: "Thread kedua dari user 1",
      image: "",
      created_by:userId,
      updated_by: userId
    },
    {
      content: "Thread ketiga dari user 1",
      image: "",
      created_by:userId,
      updated_by: userId
    }
  ]
});
  // Seeding replies untuk thread yang sudah ada
  await prisma.replies.createMany({
    data: [
      {
        content: "Ini reply pertama untuk thread Test",
        user_id: userId,
        thread_id: threadId,
      },
      {
        content: "Ini reply kedua untuk thread Test",
        user_id: userId,
        thread_id: threadId,
      },
      {
        content: "Ini reply ketiga untuk thread Test",
        user_id: userId,
        thread_id: threadId,
      },
    ],
  });

  console.log("Seeding replies selesai untuk thread yang sudah ada!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
