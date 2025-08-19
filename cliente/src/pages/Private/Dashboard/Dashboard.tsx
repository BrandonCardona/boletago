import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { postEvento, getEstadios, getArtistas} from "../../../services";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre_evento: "",
    fecha: "",
    hora: "",
    ciudad: "",
    direccion: "",
    id_estadio: "",
    id_artista: "",
    imagen: "",
  });

  const [estadios, setEstadios] = useState<any[]>([]);
  const [artistas, setArtistas] = useState<any[]>([]);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const est = await getEstadios(); 
        const art = await getArtistas(); 
        setEstadios(est);
        setArtistas(art);
      } catch (err) {
        console.error("Error cargando opciones", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await postEvento(formData);
    if (!result) {
      toast.error("Error al crear el evento");
      return;
    }
    toast.success("Evento creado");
    navigate("/");
  };
  return (
    <>
      <div>
        <h2>Crear un Evento</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre_evento"
            placeholder="Nombre del evento"
            value={formData.nombre_evento}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="ciudad"
            placeholder="Ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
          <select name="id_estadio" value={formData.id_estadio} onChange={handleChange} required>
            <option value="">Seleccione un estadio</option>
            {estadios.map(estadio => (
              <option key={estadio.id_estadio} value={estadio.id_estadio}>
                {estadio.nombre_estadio}
              </option>
            ))}
          </select>

          {/* SELECT ARTISTA */}
          <select name="id_artista" value={formData.id_artista} onChange={handleChange} required>
            <option value="">Seleccione un artista</option>
            {artistas.map(artista => (
              <option key={artista.id_artista} value={artista.id_artista}>
                {artista.nombre_artista}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="imagen"
            placeholder="URL Imagen"
            value={formData.imagen}
            onChange={handleChange}
          />

          <button type="submit">Crear Evento</button>
        </form>
      </div>
    </>
  );
};

