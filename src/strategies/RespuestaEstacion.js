import { RespuestaStrategy } from "./RespuestaStrategy.js";

export class RespuestaEstacion extends RespuestaStrategy {
  async responder(denuncia, info) {
    return {
      respuesta: `Personal de estación ha sido notificado. Nota: ${info.respuesta}`,
      estado: "cerrada"
    };
  }
}
