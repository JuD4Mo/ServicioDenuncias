export class RespuestaContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  async procesar(denuncia, info) {
    if (!this.strategy) {
      throw new Error("No hay estrategia definida");
    }

    return await this.strategy.responder(denuncia, info);
  }
}
