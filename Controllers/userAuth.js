import userSchema from "../Modals/userSchema.js";
import hashPassword from "../config/authHelper.js";


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
    const hashedPassword=await hashPassword(password)

    //Saving Data in DataBase
    const user = new userSchema({ name, email, password:hashedPassword, phone, lname }).save();
    //Sending Confirmation with user object
    res.status(201).send(
        {
            success:true,
            message: "User Register Successfully",
            user: {
              name: (await user).name,
              email: (await user).email,
              phone: (await user).phone,
              address: (await user).lname,
              password:(await user).password
            },
        }
    );
  } catch (error) {
    
    res.status(500).send({
      success: false,
      message: "Error in register",
      error,
    });
  }
};
