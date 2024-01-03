import userSchema from "../Modals/userSchema.js";
import hashPassword from "../config/authHelper.js";
import bcrypt from "bcrypt";


export const registerUser = async (req, res) => {
  try {
    const { name, lname, email, password, phone } = req.body;

    //validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!lname) {
      return res.send({ message: "Last name is also required" });
    }
    if (!email) {
      return res.send({ message: "E-Mail is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone number is required" });
    }
    if (!password) {
      return res.send({ message: "Please fill your Password" });
    }

    //Existing User
    const userExist = await userSchema.findOne({ email });
    if (userExist) {
      return res.status(200).send({
        success: false,
        message: "User Already registered",
      });
    }

    //Hashing Password
    const hashedPassword = await hashPassword(password);

    //Saving Data in DataBase
    const user = new userSchema({
      name,
      email,
      password: hashedPassword,
      phone,
      lname,
    }).save();
    //Sending Confirmation with user object
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user: {
        name: (await user).name,
        email: (await user).email,
        phone: (await user).phone,
        address: (await user).lname,
        password: (await user).password,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in register",
      error,
    });
  }
};


// Login User
// Login User
export const loginUser = async (req, res) => {
  try {

    
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Existing user
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "E-mail is not registered",
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Send a successful response with user details
    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.lname,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

