import * as dotenv from 'dotenv';

dotenv.config();

export default {
  mongoURI: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET_KEY,
  saltValue: process.env.BCRYPT_SALT,
};
