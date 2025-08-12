import pool from '../db.js';
import { ClientError } from '../utils/errors.js';

export class EventoModel {

    static getEventos = async () => {
        const result = await pool.query(
            `SELECT e.nombre_evento, e.fecha, e.ciudad, e.direccion, s.nombre_estadio, a.nombre_artista 
            FROM evento e 
            JOIN estadio s ON e.id_estadio = s.id_estadio 
            JOIN artista a ON e.id_artista = a.id_artista`);
        return result.rows;
    }; catch(error) {
        console.error('Error al obtener eventos:', error);
        throw new ClientError('Error al consultar los eventos', 500);
    };

    static getEventoById = async (id) => {
        try {
            const query = `
      SELECT e.nombre_evento, e.imagen,  to_char(e.fecha, 'DD/MM/YYYY') AS fecha,to_char(e.fecha, 'HH24:MI') AS hora, e.ciudad, e.direccion, s.nombre_estadio, a.nombre_artista
      FROM evento e
      JOIN estadio s ON e.id_estadio = s.id_estadio
      JOIN artista a ON e.id_artista = a.id_artista
      WHERE e.id_evento = $1
    `;

            const result = await pool.query(query, [id]);

            if (result.rowCount === 0) {
                throw new ClientError('Evento no encontrado', 404);
            }

            return result.rows[0];

        } catch (error) {
            console.error('Error al obtener el evento por ID:', error);
            throw new ClientError('Error al consultar el evento por ID', 500);
        }
    };

}