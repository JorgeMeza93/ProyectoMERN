import express from "express";
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword } from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();
// Área Pública
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/olvide-password", olvidePassword);  
router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword)

// Área privada
router.get("/perfil", checkAuth, perfil);


export default router;  