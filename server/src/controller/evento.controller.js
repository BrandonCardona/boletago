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
}
