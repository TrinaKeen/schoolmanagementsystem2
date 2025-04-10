const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Hash the password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create the admin user with hashed password
  const admin = await prisma.user.create({
    data: {
      username: 'admin_user2',
      email: 'admin2@example.com',  // Added email field
      password: hashedPassword,  // Use the hashed password here
      role: 'admin',  // Set role to 'admin'
    },
  });

  // Log the seeded admin user
  console.log('Admin user seeded:', admin);
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
