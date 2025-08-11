import "./LoginPage.css";
import fotoLogin from "../assets/img/ticket.png";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const CLIENTID = '616921257373-tu90riec4hfrc8aai06ibhch0cf1ao1v.apps.googleusercontent.com';

function LoginPage() {
    return (
        <GoogleOAuthProvider clientId={CLIENTID}>
            <div>
                <div className="loginPage">
                    <div className="loginPageIzquierda">
                        <h1>BOLETA<span className="verde">GO</span></h1>
                        <form>
                            <div className="botonGoogle">
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        console.log("usuario logueado", credentialResponse);
                                    }}
                                    onError={() => {
                                        console.log('Error de conexion');
                                    }}
                                    size="small"
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
