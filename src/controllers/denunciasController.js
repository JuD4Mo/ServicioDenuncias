import * as denunciasService from "../service/denunciasService.js"

export const crearDenuncia = async(req, res) => {
    try {
        const {data, error} = await denunciasService.crearDenuncia(req.body);
        if(error) res.status(400).json({message: error})
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getDenuncias = async(req, res) => {
    try {
        const {data, error} = await denunciasService.getDenuncias()
        if(error) res.status(400).json(error)
        
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getDenunciasUsuario = async(req, res) => {
    try {
        const {id} = req.params;
        const {data, error} = await denunciasService.getDenunciasUsuario(id);
        if(error) res.status(404).json(error)

        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const eliminarDenuncia = async(req, res) => {
    
try {
    const {id} = req.params;
    const {error} = await denunciasService.eliminarDenuncia(id);
    
    if (error) 
       res.status(404).json(error);
    res.status(200).json({message: "Denuncia eliminada correctamente"})
    
}catch (error) {
    res.status(500).json({message: error.message});
    }
}
//Admin
export const actualizarEstadoDenuncia = async(req, res) => {
    try {
        const {estado} = req.body;
        const {id} = req.params;
        const {data, error} = await denunciasService.actualizarEstadoDenuncia(estado, id);
        if(error) res.status(400).json(error)
        res.status(200).json({message: "Estado actualizado correctamente"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export const contestarDenuncia = async (req, res) => {
  try {
    const { iddenuncia, idcuenta } = req.params;
    const { respuesta } = req.body;

    if (!idcuenta || !respuesta) {
      return res.status(400).json({ message: "idcuenta y respuesta son obligatorios" });
    }

    const resultado = await denunciasService.procesarRespuestaDenuncia(iddenuncia, idcuenta, respuesta);

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

