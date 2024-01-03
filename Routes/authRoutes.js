import express from 'express';
import {loginUser, registerUser} from '../Controllers/userAuth.js'


//Router Object
const router=express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
