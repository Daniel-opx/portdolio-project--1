const { prisma } = require("../lib/prisma");


exports.getAllUsers = async function() {
    const users = await prisma.user.findMany()
    return users
}