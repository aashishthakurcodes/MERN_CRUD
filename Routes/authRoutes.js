import express from 'express';
import {loginUser, registerUser} from '../Controllers/userAuth.js'
import { createData } from '../Controllers/crudOptn.js';


//Router Object
const router=express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerUser);
router.post("/login", loginUser);

//CRUD Routing
// Craete new Task
router.post('/create',createData)

export default router;
