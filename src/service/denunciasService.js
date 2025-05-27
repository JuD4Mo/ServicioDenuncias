import { supabase } from "../db/supaClient.js";
import { RespuestaContext } from "../strategies/RespuestaContext.js";
import { RespuestaConductor } from "../strategies/RespuestaConductor.js";
import { RespuestaEstacion } from "../strategies/RespuestaEstacion.js";
import { RespuestaServicio } from "../strategies/RespuestaServicio.js";

export const crearDenuncia = async (info) => {
  const idcuenta = info.idcuenta;
  const mensaje = info.mensaje;
  const fecha = new Date().toISOString().split("T")[0];
  const estado = "pendiente";
  const respuesta = null;
  const tipo = info.tipo;

  return await supabase
    .from("denuncias")
    .insert({ idcuenta, mensaje, fecha, estado, tipo, respuesta })
    .select("*");
};

export const getDenuncias = async () => {
  return await supabase.from("denuncias").select("*");
};

export const getDenunciasUsuario = async (usuarioId) => {
  return await supabase
    .from("denuncias")
    .select("*")
    .eq("idcuenta", Number(usuarioId));
};

export const getDeunciaUsuarioEspecifica = async (usuarioId, denunciaId) => {
  return await supabase
    .from("denuncias")
    .select("*")
    .eq("idcuenta", usuarioId)
    .eq("iddenuncia", denunciaId);
};

export const eliminarDenuncia = async (denunciaId) => {
  return await supabase
    .from("denuncias")
    .delete("*")
    .eq("iddenuncia", Number(denunciaId));
};

//Esto lo hace el administrador

export const actualizarEstadoDenuncia = async (info, id) => {
  const estado = info;
  if (estado != "procesada")
    throw new Error(
      "Error: Solo puede actualizar el estado manualmente a 'procesada'"
    );
  return await supabase
    .from("denuncias")
    .update([{ estado: estado }])
    .eq("iddenuncia", id);
};

export const procesarRespuestaDenuncia = async (
  iddenuncia,
  idcuenta,
  respuestaTexto
) => {
  console.log("🟡 Iniciando procesamiento de denuncia", { iddenuncia, idcuenta, respuestaTexto });

  const { data: denunciaData, error: fetchError } = await supabase
    .from("denuncias")
    .select("*")
    .eq("iddenuncia", iddenuncia);

  console.log("📦 Datos de denuncia obtenidos:", denunciaData);
  console.log("🚨 Error al obtener denuncia:", fetchError);

  if (fetchError || !denunciaData || denunciaData.length === 0) {
    throw new Error("Denuncia no encontrada o no pertenece al usuario");
  }

  const denuncia = denunciaData[0];

  let strategy;
  switch (denuncia.tipo) {
    case "conductor":
      strategy = new RespuestaConductor();
      break;
    case "estacion":
      strategy = new RespuestaEstacion();
      break;
    case "servicio":
      strategy = new RespuestaServicio();
      break;
    default:
      console.error("❌ Tipo inválido:", denuncia.tipo);
      throw new Error("Tipo de denuncia no reconocido");
  }

  const context = new RespuestaContext(strategy);

  const respuestaFormateada = await context.procesar(denuncia, {
    respuesta: respuestaTexto,
  });

  console.log("✅ Respuesta formateada:", respuestaFormateada);

  const { error: updateError } = await supabase
    .from("denuncias")
    .update([
      {
        respuesta: respuestaFormateada.respuesta,
        estado: respuestaFormateada.estado,
      },
    ])
    .eq("iddenuncia", iddenuncia);

  if (updateError) {
    console.error("❌ Error al actualizar denuncia:", updateError);
    throw new Error(updateError.message);
  }

  console.log("🎉 Denuncia actualizada correctamente");

  return respuestaFormateada;
};



/*
CREATE OR REPLACE FUNCTION cerrar_denuncia_si_responde()
RETURNS TRIGGER AS $$
BEGIN
  -- Si el campo "respuesta" fue actualizado a un valor no nulo
  IF NEW.respuesta IS NOT NULL AND OLD.respuesta IS DISTINCT FROM NEW.respuesta THEN
    UPDATE denuncias
    SET estado = 'cerrada'
    WHERE iddenuncia = NEW.iddenuncia;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
*/
/*
CREATE TRIGGER tr_cerrar_denuncia_automatica
AFTER UPDATE ON denuncias
FOR EACH ROW
EXECUTE FUNCTION cerrar_denuncia_si_responde();
*/
