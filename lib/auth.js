import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
  try {
    // Ensure JWT_SECRET is pulled from an environment variable
    const jwtSecret = process.env.JWT_SECRET || 'JWT_SECRET=mySuperSecretKey1234!';

    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);
    
    // Optionally, you can log the decoded token for debugging (make sure to remove in production)
    console.log('Decoded JWT:', decoded);

    return decoded;  // Return the decoded payload if valid
  } catch (err) {
    // Log the error for debugging purposes
    console.error('JWT Verification Error:', err);
    
    // Return null if verification fails
    return null;
  }
};
