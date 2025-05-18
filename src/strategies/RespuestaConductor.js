import { RespuestaStrategy } from "./RespuestaStrategy.js";

export class RespuestaConductor extends RespuestaStrategy {
  async responder(denuncia, info) {
    return {
      respuesta: `Conductor será investigado. Observación: ${info.respuesta}`,
      estado: "cerrada"
    };
  }
}