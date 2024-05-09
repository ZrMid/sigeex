import Cookies from "js-cookie";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin from './Admin'
import '/src/estilos/MainSisStyle.css'
import { Profesor } from "./Profesor";
import { Alumno } from "./Alumno";

export const MainSis = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(Cookies.get("userInfo"));

    useEffect(() => {
        const imgRedirect = document.getElementById("imglogo");
        imgRedirect.addEventListener("click", () => {
            window.location.reload();
        })
    }, [])

    const getVentana = () => {
        if (userInfo.permiso === "Admin") {
            return <Admin />
        }else if (userInfo.permiso === "Profesor"){
            return <Profesor userInfo = {userInfo}/>
        }else{
            return <Alumno />
        }
    }

    return (
        <div className='mainSis'>
            <header className="mainHeader">
                <div className="headerImage">
                    <img src="/src/recursos/LogoITSON.png" alt="logoItson" id="imglogo" />
                </div>
                <div className="mainHeader__opciones">
                    <button onClick={() => { Cookies.remove("userInfo"); navigate('/sesionUs'); }}>Cerrar Sesión</button>
                    <a href="#">{userInfo.usuario} &nbsp; <i>U</i></a>
                </div>
            </header>
            <div className='cuerpoMain'>
                {getVentana()}
            </div>
            <footer className="mainFooter">
                footer
            </footer>
        </div>
    )
}

export default MainSis