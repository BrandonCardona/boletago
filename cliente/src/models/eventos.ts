export interface EventosData {
  id_evento: number;
  nombre_evento: string;
  fecha: string;
  ciudad: string;
  direccion: string;
  imagen: string;
  nombre_estadio: string;
  nombre_artista: string;
}

export interface SingleEventData extends EventosData {
  hora: string;
    id_estadio: number;   
  id_artista: number; 
}
