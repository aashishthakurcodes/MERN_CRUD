import express from 'express';
import {registerUser} from '../Controllers/userAuth.js'


//Router Object
const router=express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerUser);

export default router;
