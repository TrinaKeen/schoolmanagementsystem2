import bcrypt from 'bcryptjs';

/**
 * Hashes the given password using bcrypt.
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} The hashed password.
 * @throws Will throw an error if the password is invalid or if hashing fails.
 */
export const hashPassword = async (password) => {
  if (!password || typeof password !== 'string') {
    throw new Error('Invalid password. Please provide a non-empty string.');
  }

  try {
    console.log('Hashing password...');
    const saltRounds = 10; // You can adjust this, but 10 is a good default
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Password successfully hashed.');
    return hashedPassword;
  } catch (error) {
    console.error('Error while hashing password:', error.message);
    throw new Error(`Error hashing password: ${error.message}`);
  }
};
