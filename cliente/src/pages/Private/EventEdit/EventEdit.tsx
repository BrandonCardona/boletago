import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSingleEvent } from "../../../hooks/useSingleEvent";
import { LoadingScreen } from "../../../components";
import { toast } from "react-toastify";
import { getArtistas, getEstadios, putEvento } from "../../../services/eventos";
import styles from "./EventEdit.module.css";

export const EventEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, loading } = useSingleEvent({ id: id ?? "" });

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
    if (data) {
      setFormData({
        nombre_evento: data.nombre_evento || "",
        fecha: data.fecha ? data.fecha.split("T")[0] : "",
        hora: data.hora || "",
        ciudad: data.ciudad || "",
        direccion: data.direccion || "",
        id_estadio: data.id_estadio ? String(data.id_estadio) : "",
        id_artista: data.id_artista ? String(data.id_artista) : "",
        imagen: data.imagen || "",
      });
    }
  }, [data]);

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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await putEvento(id ?? "", formData);
    if (!result) {
      toast.error("Error al actualizar el evento");
      return;
    }
    toast.success("Evento actualizado");
    navigate("/");
  };

  if (loading) return <LoadingScreen active={loading} />;
  if (error) return <div>Tenemos un Error...</div>;
  if (!data) return null;

  return (
    <>
      <h1 className={styles.title}> EDITANDO EL EVENTO DE ID {id}</h1>
      <form onSubmit={handleSubmit}>
        <input
        className={styles.input}
        type="text"
          name="nombre_evento"
          placeholder="Nombre del evento"
          value={formData.nombre_evento}
          onChange={handleChange}
          required
        />
        <input 
        className={styles.input}
        type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
        <input 
        className={styles.input}
        type="time"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          required
        />
        <input 
        className={styles.input}
        type="text"
          name="ciudad"
          value={formData.ciudad}
          onChange={handleChange}
          required
        />
        <input
        className={styles.input}
        type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          required
        />

        <select className={styles.input} name="id_estadio" value={formData.id_estadio} onChange={handleChange} required>
          <option value="">Seleccione un estadio</option>
          {estadios.map((estadio) => (
            <option key={estadio.id_estadio} value={estadio.id_estadio}>
              {estadio.nombre_estadio}
            </option>
          ))}
        </select>

        <select className={styles.input} name="id_artista" value={formData.id_artista} onChange={handleChange} required>
          <option value="">Seleccione un artista</option>
          {artistas.map((artista) => (
            <option key={artista.id_artista} value={artista.id_artista}>
              {artista.nombre_artista}
            </option>
          ))}
        </select>

        <input
        className={styles.input}
        type="text"
          name="imagen"
          placeholder="URL Imagen"
          value={formData.imagen}
          onChange={handleChange}
        />
        <button
        className={styles.button}
        type="submit">Guardar cambios</button>
      </form>
    </>
  );
};
