const express = requrie('express');
import { getAllUsers, signUp, signIn } from "../auth/userAuth";

const router = express.Router();

router.get("/", getAllUsers);
router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;