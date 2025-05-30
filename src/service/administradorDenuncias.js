import { getDenuncias, procesarRespuestaDenuncia } from "./denunciasService.js";

export class AdministradorDenuncias {
  async verTodasLasDenuncias() {
    const { data, error } = await getDenuncias();

    if (error) {
      console.error("Error al obtener todas las denuncias:", error);
      throw new Error("No se pudieron obtener las denuncias");
    }

    return data;
  }

  async responderDenuncia(iddenuncia, idcuenta, respuestaTexto) {
    try {
      const resultado = await procesarRespuestaDenuncia(
        iddenuncia,
        idcuenta,
        respuestaTexto
      );

      return resultado;
    } catch (error) {
      console.error("Error al responder denuncia:", error);
      throw new Error("No se pudo procesar la respuesta");
    }
  }
}
