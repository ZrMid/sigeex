/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import '/src/estilos/ProfesorStyle.css'

const formatDateTime = (date) => {
    return date.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
};

export const Profesor = () => {
    const [estadoExamen, setEstadoExamen] = useState("");
    const [nombreExamen, setNombreExamen] = useState("");
    const [fechaInicio, setFechaInicio] = useState(formatDateTime(new Date()));
    const [fechaTermino, setFechaTermino] = useState(formatDateTime(new Date()));
    const [reactivos, setReactivos] = useState([]);

    const handlerChangeValid = (e, set) => {
        set(e.target.value);
    }

    const cambiarEstado = (cambio) => {
        const confirmacion = window.confirm(
            "¿Estás seguro de que deseas cambiar de ventana?"
        );

        if (confirmacion) {
            setEstadoExamen(estadoExamen === cambio ? "" : cambio);
        }
    };

    const getTipoReactivo = (e, index) => {
        setReactivos(
            reactivos.map((rea, ind) => {
                if (ind === index) {
                    return { ...rea, tipoReactivo: e.target.value };
                  } else {
                    return rea;
                  }
            })
        );
    };

    const getContTipoReactivo = (tipo) => {
        switch (tipo) {
            case "Pregunta_abierta":
                return (<textarea rows={5} placeholder='Escribe aqui tu pregunta'></textarea>)
                break;
            default:
                return (<p>No se a seleccionado tipo</p>);
                break;
        }
    }

    const eliminarReactivo = (index) => {
        setReactivos(reactivos.filter((_, i)=> i !== index))
    }

    useEffect(() => {
        console.log(reactivos)
    }, [reactivos])

    return (
        <>
            <div className='profesorContainer'>
                <div className='profesorContainer_header'>
                    <h3>Examenes</h3>
                    <button onClick={() => cambiarEstado("Crear")}>Crear Examen</button>
                </div>
                <div className='profesorContainer_examenes'>
                    {
                        estadoExamen === "" ? (
                            <div className="profesorContainer_examen" onClick={() => cambiarEstado("Editar")}>
                                <h2>Ejemplo Examen</h2>
                                <p>descripcion examen</p>
                            </div>
                        ) : (
                            <div className="profesorContainer_examenConfig">
                                <h2>Materia</h2>
                                <div className="examenHeader">
                                    <label htmlFor="nombreExamen" id='lblNombreEx'>Nombre Examen:</label>
                                    <input type="text" id='nombreExamen' placeholder='Ingrese nombre' onChange={(e) => handlerChangeValid(e, setNombreExamen)} value={nombreExamen} />
                                    <label htmlFor="fechaInicio" id='lblfechaInicio'>Fecha de inicio:</label>
                                    <input type="datetime-local" id='fechaInicio' onChange={(e) => handlerChangeValid(e, setFechaInicio)} value={fechaInicio} />
                                    <label htmlFor="fechaFin" id='lblfechaFin'>Fecha de inicio:</label>
                                    <input type="datetime-local" id='fechaFin' onChange={(e) => handlerChangeValid(e, setFechaTermino)} value={fechaTermino} />
                                </div>
                                <hr />
                                {
                                    reactivos.map((e, index) => (
                                        <div key={index} className='examenCont'>
                                            <select onChange={(e) => getTipoReactivo(e, index)}>
                                                <option>Selecciona un Tipo</option>
                                                <option>Pregunta_abierta</option>
                                            </select><br />
                                            {e.tipoReactivo !== "" ? getContTipoReactivo(e.tipoReactivo) : null}
                                            <br />
                                            <button onClick={() => eliminarReactivo(index)}>Eliminar</button>
                                        </div>
                                    ))
                                }
                                <button onClick={() => { setReactivos([...reactivos, { "tipoReactivo": "default" }]) }}>Agregar Reactivo</button>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='profesorInfo'>
                <div className='profesorInfo_cont'>

                    <h4>Pendientes</h4>
                    <hr />
                    <ul>
                        <li>Matematicas
                            <ul>
                                <li>Examen</li>
                            </ul>
                        </li>
                        <li>Progra 1
                            <ul>
                                <li>Examen</li>
                            </ul>
                        </li>
                        <li>Base de datos
                            <ul>
                                <li>Examen</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>

    )
}
