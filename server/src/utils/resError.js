export const resError = ({ res, status, message }) => {
  return res.status(status).json({
    error: true,
    message,
  });
};
