import { RespuestaStrategy } from "./RespuestaStrategy.js";

export class RespuestaServicio extends RespuestaStrategy {
  async responder(denuncia, info) {
    return {
      respuesta: `Se revisará el servicio reportado: ${info.respuesta}`,
      estado: "cerrada"
    };
  }
}
