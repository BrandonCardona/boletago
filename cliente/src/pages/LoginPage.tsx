import "./LoginPage.css";
import fotoLogin from "../assets/img/ticket.jpg";


function LoginPage() {
    return ( <div className="loginPage">
        <div className="loginPageIzquierda"> 
        <h1>BOLETA<span className="verde">GO</span>
        </h1>
        <form>

        <input className="input correo" type="email" id="correo" name="correo" required placeholder="Correo Electronico"/>

        <input className="input contraseña" type="password" id="contraseña" name="contraseña" required placeholder="Contraseña"/>
        
        <button className="botonLogin" type="submit">Iniciar sesion</button>
        </form>
        </div>
        <div className="loginPageDerecha"> 
            <img src={fotoLogin} alt="Fondo Boleta" />
        </div>

    </div>

    );
};

export default LoginPage;
