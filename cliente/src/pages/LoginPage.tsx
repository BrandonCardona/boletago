import "./LoginPage.css";
import fotoLogin from "../assets/img/ticket.png";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useLogin } from "../hooks/useLogin";

const CLIENTID =
  "616921257373-tu90riec4hfrc8aai06ibhch0cf1ao1v.apps.googleusercontent.com";

function LoginPage() {
  const { doLogin } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("correo") as string;
    const password = formData.get("contraseña") as string;

    console.log(email, password);
    doLogin({ email, password });
  };

  return (
    <GoogleOAuthProvider clientId={CLIENTID}>
      <div>
        <div className="loginPage">
          <div className="loginPageIzquierda">
            <h1>
              BOLETA<span className="verde">GO</span>
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="botonGoogle">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log("usuario logueado", credentialResponse);
                  }}
                  onError={() => {
                    console.log("Error de conexion");
                  }}
                  size="large"
                  theme="filled_black"
                  shape="pill"
                />
              </div>
              <input
                className="input correo"
                type="email"
                id="correo"
                name="correo"
                required
                placeholder="Correo Electronico"
              />
              <input
                className="input contraseña"
                type="password"
                id="contraseña"
                name="contraseña"
                required
                placeholder="Contraseña"
              />
              <button className="botonLogin" type="submit">
                Iniciar sesion
              </button>
            </form>
          </div>
          <div className="loginPageDerecha">
            <img src={fotoLogin} alt="Fondo Boleta" />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;
