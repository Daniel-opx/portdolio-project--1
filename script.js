const { prisma } = require("./lib/prisma.js");
const queries = require("./queries/queries.js");

async function main() {
  // Create a new user
  const user = await prisma.user.create({
    data: {
      username: "alice",
      password: "securepassword123",
    },
  });
  console.log("Created user:", user);

  // Fetch all users
  const allUsers = await prisma.user.findMany();
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

async function getAllUsers() {
  const users = await queries.getAllUsers()
  console.log(users)
}

getAllUsers().then(
  async () =>{
    await prisma.$disconnect()
  }

).catch(async (e) =>{
  console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})


// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
