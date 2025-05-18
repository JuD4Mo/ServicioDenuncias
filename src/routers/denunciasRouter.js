import express from "express"
import { crearDenuncia, eliminarDenuncia, getDenuncias, getDenunciasUsuario,actualizarEstadoDenuncia, contestarDenuncia } from "../controllers/denunciasController.js"

const router = express.Router();

router.post("/crearDenuncia", crearDenuncia)

router.get("/listarTodas", getDenuncias)
router.get("/listarDenunciasUsuario/:id", getDenunciasUsuario)

router.delete("/eliminarDenuncia/:id", eliminarDenuncia)

router.patch("/actualizarEstado/:id", actualizarEstadoDenuncia);
router.patch("/contestar/:iddenuncia/:idcuenta", contestarDenuncia);

export default router;