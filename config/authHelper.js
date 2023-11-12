import bcrypt from 'bcrypt'
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hashedPasssword = await bcrypt.hash(password, saltRounds);
    return hashedPasssword;
  } catch (error) {
    console.log(`Error in Hashing PassWord ${error}`);
  }
};

export default hashPassword;
