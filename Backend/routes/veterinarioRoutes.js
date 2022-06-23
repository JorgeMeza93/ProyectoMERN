import express from "express";
import { registrar, perfil, confirmar, autenticar, olvidePassword } from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();
// Área Pública
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("olvide-password", olvidePassword);
router.get("/")

// Área privada
router.get("/perfil", checkAuth, perfil);


export default router;  