const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateUserRole(email: string, role: 'ADMIN' | 'CUSTOMER') {
  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    console.log('User updated successfully:', updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Replace these values with the email of the user you want to update
const userEmail = 'robazz.official@gmail.com';
updateUserRole(userEmail, 'ADMIN'); 