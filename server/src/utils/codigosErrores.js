export const normalizarError = (err) => {
  let status = err.statusCode || 500;
  let message = err.message || "Ocurrió un error en el servidor.";

  if (err.code) {
    switch (err.code) {
      case "23505":
        status = 409;
        message = "El recurso ya existe.";
        break;
      default:
        status = 500;
        message = "Error procesando la solicitud.";
    }
  }

  return { status, message };
};
