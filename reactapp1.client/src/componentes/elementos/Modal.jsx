/* eslint-disable no-unreachable */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import '/src/estilos/Modal.css'

export const Modal = ({ closeModal, onSubmit, defaultValue, columns, nombreTabla }) => {
    const [formState, setFormState] = useState(defaultValue);
    const [errors, setErrors] = useState("");
    const [tipoUsuariosHook, setTipoUsuariosHook] = useState([{ id: 0, tit: "cargando..." }]);
    const [tipoProfesorHook, setTipoProfesorHook] = useState([{ id: 0, tit: "cargando..." }]);
    const [profesorHook, setProfesorHook] = useState([{ id: 0, tit: "cargando..." }]);
    const [planEducativoHook, setPlanEducativoHook] = useState([{ id: 0, tit: "cargando..." }]);
    const [academiaHook, setAcademiaHook] = useState([{ id: 0, tit: "cargando..." }]);
    const [catalogoHook, setCatalogoHook] = useState([{ id: 0, tit: "cargando..." }]);
    const [bloqueHook, setBloqueHook] = useState([{ id: 0, tit: "cargando..." }]);
    const [materiaHook, setMateriaHook] = useState([{ id: 0, tit: "cargando..." }]);
    const [clasesHook, setClasesHook] = useState([{ id: 0, tit: "cargando..." }]);
    const [usuariosHook, setUsuariosHook] = useState([{ id: 0, tit: "cargando..." }]);

    useEffect(() => {
        const fetchData = async () => {
            if (nombreTabla == "Usuarios") {
                let data = await fetch(`api/tiposusuarios/AllTypeUsers`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    }
                });
                setTipoUsuariosHook(await data.json());

                data = await fetch(`api/tiposprofesores/AllTypeProfesores`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    }
                });
                setTipoProfesorHook(await data.json());
            } else if (nombreTabla == "Clases") {
                let data1 = await fetch(`api/usuarios/AllUsers`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    }
                });
                setProfesorHook(await data1.json());

                let data2 = await fetch(`api/programaeducativos/AllProgramaEducativos`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    }
                });
                setPlanEducativoHook(await data2.json());

                let data3 = await fetch(`api/academias/AllAcademias`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    }
                });
                setAcademiaHook(await data3.json());

                let data4 = await fetch(`api/catalogos/AllCatalogos`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    }
                });
                setCatalogoHook(await data4.json());

                let data5 = await fetch(`api/bloques/AllBloques`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    }
                });
                setBloqueHook(await data5.json());

                let data6 = await fetch(`api/materias/AllMaterias`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    }
                });
                setMateriaHook(await data6.json());
            }else if(nombreTabla == "UsuarioClases"){
                let data = await fetch(`api/usuarios/AllUsers`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    }
                });
                setUsuariosHook(await data.json());

                data = await fetch(`api/clases/AllClases`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    }
                });
                setClasesHook(await data.json());
            }
        }

        fetchData();

    }, []);

    const validateForm = () => {
        let errorFields = [];

        columns.forEach(column => {
            const key = column.key;
            const value = formState[key];
            if (!value || (value + "").trim() === "" || value.length < 4) {
                errorFields.push(key);
            }
        });

        if (errorFields.length > 0) {
            setErrors(`Faltan los siguientes campos: ${errorFields.join(", ")}`);
            return false;
        } else {
            setErrors("");
            return true;
        }

    };

    const handleChange = (e) => {
        setFormState((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //if (!validateForm()) return;

        console.log(formState);

        onSubmit(formState);

        closeModal();
    };

    const getInput = (column, idx) => {
        switch (nombreTabla) {
            case "Usuarios":
                if (column.key === "tipoUsuario") {
                    const options = tipoUsuariosHook.map((tipo) => {
                        const valor = parseInt(Object.entries(tipo)[0][1]);
                        const seleccion = Object.entries(tipo)[1][1];
                        if (formState !== null && seleccion === formState["tipoUsuario"]) {
                            return (< option value={valor} key={valor} selected>{seleccion}</option>)
                        }
                        return (< option value={valor} key={valor}>{seleccion}</option>)
                    })

                    return (
                        <div className="form-group" key="idtipoUsuario">
                            <label htmlFor="idtipoUsuario">tipoUsuario</label>
                            <select name="idtipoUsuario" onChange={handleChange}>
                                {options}
                            </select>
                        </div >)
                } else if (column.key === "tipoProfesor") {
                    const options = tipoProfesorHook.map((tipo) => {
                        const valor = parseInt(Object.entries(tipo)[0][1]);
                        const seleccion = Object.entries(tipo)[1][1];
                        if (formState !== null && seleccion === formState["tipoProfesor"]) {
                            return (< option value={valor} key={valor} selected>{seleccion}</option>)
                        }
                        return (< option value={valor} key={valor}>{seleccion}</option>)
                    })

                    return (
                        <div className="form-group" key="idtipoProfesor">
                            <label htmlFor="idtipoProfesor">tipoProfesor</label>
                            <select name="idtipoProfesor" onChange={handleChange}>
                                {options}
                            </select>
                        </div>)
                } else {
                    return (
                        <div className="form-group" key={column.key}>
                            <label htmlFor={column.key}>{column.label}</label>
                            {idx == 0 ?
                                <input name={column.key} onChange={null} value={formState !== null ? formState[column.key] : null} disabled />
                                : <input name={column.key} onChange={handleChange} value={formState !== null ? formState[column.key] : null} />
                            }
                        </div>)
                }

                break;
            case "Clases":
                if (column.key === "nombreUsuario") {
                    const options = profesorHook.map((tipo) => {
                        const valor = parseInt(Object.entries(tipo)[0][1]);
                        const seleccion = Object.entries(tipo)[1][1];
                        if (formState !== null && seleccion === formState["nombreUsuario"]) {
                            return (< option value={valor} key={valor} selected>{seleccion}</option>)
                        }
                        return (< option value={valor} key={valor}>{seleccion}</option>)
                    })

                    return (
                        <div className="form-group" key="idprofesor">
                            <label htmlFor="idprofesor">Profesor</label>
                            <select name="idprofesor" onChange={handleChange}>
                                <option value="">Seleccione una opción</option>
                                {options}
                            </select>
                        </div >)
                } else if (column.key === "nombrePlanPrograma") {
                    const options = planEducativoHook.map((tipo) => {
                        const valor = parseInt(Object.entries(tipo)[0][1]);
                        const seleccion = Object.entries(tipo)[1][1];
                        if (formState !== null && seleccion === formState["nombrePlanPrograma"]) {
                            return (< option value={valor} key={valor} selected>{seleccion}</option>)
                        }
                        return (< option value={valor} key={valor}>{seleccion}</option>)
                    })

                    return (
                        <div className="form-group" key="idplanProgramaEducativo">
                            <label htmlFor="idplanProgramaEducativo">ProgramaEducativo</label>
                            <select name="idplanProgramaEducativo" onChange={handleChange}>
                                <option value="">Seleccione una opción</option>
                                {options}
                            </select>
                        </div >)
                } else if (column.key === "nombreAcademia") {
                    const options = academiaHook.map((tipo) => {
                        const valor = parseInt(Object.entries(tipo)[0][1]);
                        const seleccion = Object.entries(tipo)[1][1];
                        if (formState !== null && seleccion === formState["nombreAcademia"]) {
                            return (< option value={valor} key={valor} selected>{seleccion}</option>)
                        }
                        return (< option value={valor} key={valor}>{seleccion}</option>)
                    })

                    return (
                        <div className="form-group" key="idacademia">
                            <label htmlFor="idacademia">Academia</label>
                            <select name="idacademia" onChange={handleChange}>
                                <option value="">Seleccione una opción</option>
                                {options}
                            </select>
                        </div >)
                } else if (column.key === "nombreCatalogo") {
                    const options = catalogoHook.map((tipo) => {
                        const valor = parseInt(Object.entries(tipo)[0][1]);
                        const seleccion = Object.entries(tipo)[1][1];
                        if (formState !== null && seleccion === formState["nombreCatalogo"]) {
                            return (< option value={valor} key={valor} selected>{seleccion}</option>)
                        }
                        return (< option value={valor} key={valor}>{seleccion}</option>)
                    })

                    return (
                        <div className="form-group" key="idcatalogo">
                            <label htmlFor="idcatalogo">Catalogo</label>
                            <select name="idcatalogo" onChange={handleChange}>
                                <option value="">Seleccione una opción</option>
                                {options}
                            </select>
                        </div >)
                } else if (column.key === "nombreBloque") {
                    const options = bloqueHook.map((tipo) => {
                        const valor = parseInt(Object.entries(tipo)[0][1]);
                        const seleccion = Object.entries(tipo)[1][1];
                        if (formState !== null && seleccion === formState["nombreBloque"]) {
                            return (< option value={valor} key={valor} selected>{seleccion}</option>)
                        }
                        return (< option value={valor} key={valor}>{seleccion}</option>)
                    })

                    return (
                        <div className="form-group" key="idbloque">
                            <label htmlFor="idbloque">Bloque</label>
                            <select name="idbloque" onChange={handleChange}>
                                <option value="">Seleccione una opción</option>
                                {options}
                            </select>
                        </div >)
                } else if (column.key === "nombreMateria") {
                    const options = materiaHook.map((tipo) => {
                        const valor = parseInt(Object.entries(tipo)[0][1]);
                        const seleccion = Object.entries(tipo)[1][1];
                        if (formState !== null && seleccion === formState["nombreMateria"]) {
                            return (< option value={valor} key={valor} selected>{seleccion}</option>)
                        }
                        return (< option value={valor} key={valor}>{seleccion}</option>)
                    })

                    return (
                        <div className="form-group" key="idmateria">
                            <label htmlFor="idmateria">Materia</label>
                            <select name="idmateria" onChange={handleChange}>
                                <option value="">Seleccione una opción</option>
                                {options}
                            </select>
                        </div >)
                } else {
                    return (
                        <div className="form-group" key={column.key}>
                            <label htmlFor={column.key}>{column.label}</label>
                            {idx == 0 ?
                                <input name={column.key} onChange={null} value={formState !== null ? formState[column.key] : null} disabled />
                                : <input name={column.key} onChange={handleChange} value={formState !== null ? formState[column.key] : null} />
                            }
                        </div>)
                }
                break;
            case "UsuarioClases":
                if (column.key === "nombreUsuario"){
                    const options = usuariosHook.map((tipo) => {
                        const valor = Object.entries(tipo)[0][1];
                        const seleccion = Object.entries(tipo)[1][1];
                        if (formState !== null && seleccion == formState["nombreUsuario"]) {
                            return (< option value={valor} key={valor} selected>{seleccion}</option>)
                        }
                        return (< option value={valor} key={valor}>{valor}</option>)
                    })

                    return (
                        <div className="form-group" key="idusuario">
                            <label htmlFor="idusuario">Usuario</label>
                            <select name="idusuario" onChange={handleChange}>
                                <option value="">Seleccione una opción</option>
                                {options}
                            </select>
                        </div >)
                }else if (column.key === "idclase") {
                    const options = clasesHook.map((tipo) => {
                        const valor = Object.entries(tipo)[0][1];
                        const seleccion = Object.entries(tipo)[1][1];
                        if (formState !== null && valor == formState["idclase"]) {
                            return (< option value={valor} key={valor} selected>{valor}</option>)
                        }
                        return (< option value={valor} key={valor}>{valor}</option>)
                    })

                    return (
                        <div className="form-group" key="idclase">
                            <label htmlFor="idclase">Clase</label>
                            <select name="idclase" onChange={handleChange}>
                                <option value="">Seleccione una opción</option>
                                {options}
                            </select>
                        </div >)
                } else {
                    return (
                        <div className="form-group" key={column.key}>
                            <label htmlFor={column.key}>{column.label}</label>
                            {idx == 0 ?
                                <input name={column.key} onChange={null} value={formState !== null ? formState[column.key] : null} disabled />
                                : <input name={column.key} onChange={handleChange} value={formState !== null ? formState[column.key] : null} />
                            }
                        </div>)
                }
                break;
            default:
                return (
                    <div className="form-group" key={column.key}>
                        <label htmlFor={column.key}>{column.label}</label>
                        {idx == 0 ?
                            <input name={column.key} onChange={null} value={formState !== null ? formState[column.key] : null} disabled />
                            : <input name={column.key} onChange={handleChange} value={formState !== null ? formState[column.key] : null} />
                        }
                    </div>)
                break;
        }
    }

    return (
        <div
            className="modal-container"
            onClick={(e) => {
                if (e.target.className === "modal-container") closeModal();
            }}
        >
            <div className="modal">
                <form>
                    {columns.map((column, idx) => (
                        getInput(column, idx)
                    ))}
                    {errors ? <div className="error">{`Please include: ${errors}`}</div> : null}
                    <button type="submit" className="btn" onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;