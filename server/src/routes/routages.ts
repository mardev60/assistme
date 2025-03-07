import { Router } from "express";
import {
    loginController,
    logoutController,
    meController,
    registerController,
} from "../auth/authController";
import { authenticateToken } from "../auth/authMiddleware";
import { authorizeRole } from "../auth/authorizeRole";
import {
    getMessagesController,
    sendMessageController,
} from "../chat/chatController";

const router = Router();

// Routes d'authentification
router.post("/login", loginController);
router.post("/register", registerController);
router.get("/me", authenticateToken, meController, authorizeRole(1));
router.post("/logout", logoutController);

// Routes de chat
router.post(
    "/chat",
    authenticateToken,
    authorizeRole(1),
    sendMessageController
);
router.get(
    "/chat/messages",
    authenticateToken,
    authorizeRole(1),
    getMessagesController
);

export default router;
