import { EventoModel } from "../models/evento.model.js";
import { ClientError } from "../utils/errors.js";
import { response } from "../utils/response.js";

export class EventoController {
  static getEventos = async (req, res) => {
    const result = await EventoModel.getEventos();
    response(res, 200, result);
  };
  static getEventoById = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (!id) throw new ClientError("ID del evento es requerido", 400);

    try {
      const result = await EventoModel.getEventoById(id);
      response(res, 200, result);
    } catch (error) {
      response(res, error.status || 500, { message: error.message });
    }
  };

  static postEvento = async (req, res) => {
    try{
      const result = await EventoModel.postEvento(req.body);
      response(res,201, result);
    }catch(error){
      response(res,error.status || 500, { message: error.message } )
    }
  }

  static putEvento = async (req, res) => {
    const id = parseInt(req.params.id, 10);
     if (!id) throw new ClientError("ID del evento es requerido", 400);
    try{
      const result = await EventoModel.putEvento(id, req.body)
      response(res, 200, result);
    } catch (error) {
      response(res, error.status || 500, { message: error.message });
    }
  }

  static deleteEvento = async (req, res) =>{
    const id = parseInt(req.params.id, 10);
    if(!id) throw new ClientError ("ID del evento es requerido", 400);
    try{
      const result = await EventoModel.deleteRecurso(id); 
      response(res, 200, result);
    }catch{
      response(res, error.status  || 500, { message: error.message } )
    }
  }

  static getArtistas = async (req, res) => {
  try {
    const artistas = await EventoModel.getArtista();
    res.json(artistas);
  } catch (error) {
    console.error("Error al obtener artistas:", error);
    throw new ClientError("Error al consultar los artistas", 500);
  }
};

static getEstadios = async (req, res) => {
  try {
    const estadios = await EventoModel.getEstadio();
    res.json(estadios);
  } catch (error) {
    console.error("Error al obtener estadios:", error);
    throw new ClientError("Error al consultar los estadios", 500);
  }
};
}
