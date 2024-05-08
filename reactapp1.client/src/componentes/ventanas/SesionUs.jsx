/* eslint-disable react/no-unknown-property */
import { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import '/src/estilos/SesionUsStyle.css'

//Componente Apps que contiene lo que se necesita
function SesionUs() {

    /*hooks de imputs en formularios*/
    const [userReg, setUserReg] = useState("");
    const [name, setName] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    //const [numero, setNumero] = useState();

    const navigate = useNavigate();


    /* Funcion pa validar que no tenga simbolos ademas de @ - _ .*/
    const validarCampo = (e, set) => {
        // eslint-disable-next-line no-useless-escape
        const regex = /^[a-zA-Z0-9@_\.-\s]*$/;

        if (regex.test(e.target.value)) {
            set(e.target.value);
        }
    }
    /* Valdiador de numeros para el numero celular*/
    const validarNumero = (e) => {
        const regex = /^[0-9]*$/;

        if (regex.test(e.target.value)) {
            setUserReg(e.target.value);
        }
    }

    const iniciarSesion = async (e) => {
        e.preventDefault();

        const datosLogin = {
            usuario: user,
            contrasena: password
        };

        const response = await fetch("api/usuarios/LogIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosLogin),
        });

        if (response.ok) {
            const data = await response.json();
            Cookies.set("userInfo", JSON.stringify(data), { expires: 7 });
            navigate("/mainSis");
        } else {
            alert("Usuario no encontrado");
        }
    };

    const registrarUsuario = async (e) => {
        e.preventDefault();

        const datosRegister = {
            "nombreUsuario": userReg,
            "contrasena": passwordReg,
            "nombre": name,
            "apellido": apellido,
            "correo": correo
        };

        const response = await fetch("api/usuarios/Register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(datosRegister),
        });

        if (response.ok) {
            alert("Registro exitoso :D")
            navigate(0);
        } else {
            alert("Error al registrar");
        }
    };

    useEffect(() => {

        //animacion
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');
        const container = document.getElementById('container');

        if (registerBtn && loginBtn && container) {
            registerBtn.addEventListener('click', () => {
                container.classList.add("active");
            });

            loginBtn.addEventListener('click', () => {
                container.classList.remove("active");
            });
        }
    }, []);

    return (
        <>
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,600&display=swap" rel="stylesheet" />
                <title>ExamIfy</title>
            </Helmet>

            <div className='mainSesion'>
                {/* Logo */}
                <header className="logHeader">
                    <img src="src/recursos/LogoITSON.png" width="18%" alt="ITSON" />
                </header>

                {/* Lugar de inicio sesión */}
                <div className="container" id="container">
                    <div className="form-container Iniciar-Sesi�n">
                        <form onSubmit={iniciarSesion}>
                            <h1>Iniciar Sesión</h1>
                            <div className="icons">
                                <a className="icon">
                                    {/* Simbolos de Inicio sesion */}
                                    <span className="material-symbols-outlined">
                                        person {/* Simbolo de login :) */}
                                    </span>
                                </a>
                            </div>
                            <samp> Ingrese su usuario </samp>

                            <input type="usuario" placeholder="Usuario" onChange={(e) => validarCampo(e, setUser)} value={user} required minLength={6} maxLength={18} />


                            <input type="password" placeholder="Contraseña" onChange={(e) => validarCampo(e, setPassword)} value={password} minLength={6} required maxLength={18} />

                            <a href="#">¿Olvidaste tu Contraseña?</a>
                            <button className="btn" type="submit">
                                <i className="material-symbols-outlined">
                                    input
                                </i>Ingresar
                            </button>
                        </form>
                    </div>
                    {/* Lugar de registro */}
                    <div className="form-Rcontainer">
                        <form onSubmit={registrarUsuario}>
                            {/* Lugar de Registro, aqui */}
                            <h1> Registro </h1>
                            <div className="iconos">
                                <a className="icon">
                                    {/* Simbolos de registros */}
                                    <span className="material-symbols-outlined">
                                        person_add
                                    </span>
                                </a>
                            </div>
                            <samp>Ingresa los datos que se piden para el registro</samp>
                            {/* Campos de llenado del apartadod e Registro*/}
                            <input type="usuario" placeholder="Id" onChange={(e) => validarNumero(e, setUserReg)} value={userReg} required minLength={6} maxLength={6} />
                            <input type="nombres" placeholder="Nombres" onChange={(e) => validarCampo(e, setName)} value={name} required minLength={3} maxLength={18} />
                            <input type="apellidos" placeholder="Apellidos" onChange={(e) => validarCampo(e, setApellido)} value={apellido} required minLength={3} maxLength={18} />
                            <input type="correo" placeholder="Correo" onChange={(e) => validarCampo(e, setCorreo)} value={correo} required maxLength={40} />
                            <input type="password" placeholder="Contraseña" onChange={(e) => validarCampo(e, setPasswordReg)} value={passwordReg} required minLength={6} maxLength={18} />
                            {/*<input type="numero" placeholder="Numero" onChange={(e) => validarNumero(e, setNumero)} value={numero} required minLength={10} maxLength={10} />*/}
                            <button className="btn">
                                <i className="material-symbols-outlined">
                                    input
                                </i>Registrarte
                            </button>
                        </form>
                    </div>

                    {/* Paneles de movimiento */}
                    <div className="Alternar-constainer">
                        <div className="Alternar">
                            <div className="Alternar-Panel Alternar-Derecho">
                                <h1>Hola! Bienvenido!</h1>
                                <p>Aqui esta el apartado de registro </p>
                                <p><br /> si no cuentas con una cuenta</p>
                                <button className="hidden" id="register">Registrate</button>
                            </div>
                            <div className="toggle-panel toggle-left">
                                <h1>Bienvenido al Apartado de Registro!</h1>
                                <p>Volver a inicio sesión? Preciona aqui abajo</p>
                                <button className="hidden" id="login">Inicio Sesión</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default SesionUs;
