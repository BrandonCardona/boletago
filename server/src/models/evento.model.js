import pool from "../db.js";
import { ClientError } from "../utils/errors.js";

export class EventoModel {
  static getEventos = async () => {
    const result = await pool.query(
      `SELECT e.id_evento, e.nombre_evento, to_char(e.fecha, 'DD/MM/YYYY') AS fecha, e.ciudad, e.direccion, e.imagen, s.nombre_estadio, a.nombre_artista 
            FROM evento e 
            JOIN estadio s ON e.id_estadio = s.id_estadio 
            JOIN artista a ON e.id_artista = a.id_artista`
    );
    return result.rows;
  };
  catch(error) {
    console.error("Error al obtener eventos:", error);
    throw new ClientError("Error al consultar los eventos", 500);
  }

  static getEventoById = async (id) => {
    try {
      const query = `
      SELECT e.id_evento, e.nombre_evento, e.imagen,  to_char(e.fecha, 'DD/MM/YYYY') AS fecha,to_char(e.fecha, 'HH24:MI') AS hora, e.ciudad, e.direccion, s.nombre_estadio, a.nombre_artista
      FROM evento e
      JOIN estadio s ON e.id_estadio = s.id_estadio
      JOIN artista a ON e.id_artista = a.id_artista
      WHERE e.id_evento = $1
    `;

      const result = await pool.query(query, [id]);

      if (result.rowCount === 0) {
        throw new ClientError("Evento no encontrado", 404);
      }

      return result.rows[0];
    } catch (error) {
      console.error("Error al obtener el evento por ID:", error);
      throw new ClientError("Error al consultar el evento por ID", 500);
    }
  };

  static postEvento = async (eventosData) => {
    try {
      const { nombre_evento, fecha, hora, ciudad, direccion, id_estadio, id_artista, imagen } = eventosData;

      const fechaCompleta = `${fecha} ${hora}`;

      const query = `
        INSERT INTO evento (nombre_evento, fecha, ciudad, direccion, id_estadio, id_artista, imagen)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id_evento, nombre_evento
      `;

      const values = [
        nombre_evento,
        fechaCompleta,
        ciudad,
        direccion,
        id_estadio,
        id_artista,
        imagen,
      ];

      const result = await pool.query(query, values);

      return result.rows[0];
    } catch (error) {
      console.error("Error al insertar el evento:", error);
      throw new ClientError("Error al crear el evento", 500);
    }
  };

  static putEvento = async (id, eventosData) => {
    try {
      const { nombre_evento, fecha, hora, ciudad, direccion, id_estadio, id_artista, imagen } = eventosData;
      const fechaCompleta = `${fecha} ${hora}`;
      const query = `
      UPDATE evento
      SET nombre_evento = $1,
          fecha = $2,
          ciudad = $3, 
          direccion = $4,
          id_estadio = $5,
          id_artista = $6,
          imagen = $7
      WHERE id_evento = $8 
      RETURNING *`;
      const values = [
        nombre_evento,
        fechaCompleta,
        ciudad,
        direccion,
        id_estadio,
        id_artista,
        imagen,
        id
      ];

      const result = await pool.query(query, values);
      if (result.rowCount === 0) {
        throw new ClientError("Evento no encontrado", 404);
      }
      return result.rows[0];
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
      throw new ClientError("Error al actualizar el evento", 500);
    }
  }

  static deleteRecurso = async (id) => {
    try {
      const query = `
      DELETE FROM evento 
      WHERE id_evento = $1 
      RETURNING*`;
      const result = await pool.query(query, [id]);

      if (result.rowCount === 0) {
        throw new ClientError("Evento no encontrado", 404);
      }

      return result.rows[0];
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
      throw new ClientError("Error al eliminar el evento", 500);
    }
  }

static getArtista = async () => {
  try {
    const result = await pool.query(
      `SELECT id_artista, nombre_artista
       FROM artista`
    );
    return result.rows; 
  } catch (error) {
    console.error("Error al obtener artistas:", error);
    throw new ClientError("Error al consultar los artistas", 500);
  }
}

static getEstadio = async () => {
  try {
    const result = await pool.query(
      `SELECT id_estadio, nombre_estadio
       FROM estadio`
    );
    return result.rows; 
  } catch (error) {
    console.error("Error al obtener estadios:", error);
    throw new ClientError("Error al consultar los estadios", 500);
  }
}


}



