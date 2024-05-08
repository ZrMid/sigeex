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

    useEffect(() => {
        const fetchData = async () => {
            if (nombreTabla == "Usuarios") {
                const typeUsers = await fetch(`api/tiposusuarios/AllTypeUsers`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    }
                });
                setTipoUsuariosHook(await typeUsers.json());

                const typeProfes = await fetch(`api/tiposprofesores/AllTypeProfesores`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    }
                });
                setTipoProfesorHook(await typeProfes.json());
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