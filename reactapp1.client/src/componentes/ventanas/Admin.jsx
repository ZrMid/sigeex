/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import '/src/estilos/AdminStyle.css'
import Table from '../elementos/Table';
import Modal from '../elementos/Modal';

export const Admin = () => {
    const [tablaHook, setTablaHook] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [columnas, setColumnas] = useState([]);
    const [rows, setRows] = useState([]);
    const [ruta, setRuta] = useState("");

    const cambiarTabla = async (e) => {
        const tablaSel = e.target.getAttribute('name');
        switch (tablaSel) {
            case "Usuarios":
                await getDatos('usuarios/AllUsers');
                setRuta('usuarios');
                break;
            case "Clases":
                await getDatos('clases/AllClases');
                setRuta('clases');
                break;
            case "UsuarioClases":
                await getDatos('usuarioclases/AllUsuarioClases');
                setRuta('UsuarioClases');
                break;
            case "ProgramaEducativos":
                await getDatos('programaeducativos/AllProgramaEducativos');
                setRuta('programaeducativos');
                break;
            case "Materias":
                await getDatos('materias/AllMaterias');
                setRuta('materias');
                break;
            case "Academias":
                await getDatos('academias/AllAcademias');
                setRuta('academias');
                break;
            case "Catalogos":
                await getDatos('catalogos/AllCatalogos');
                setRuta('catalogos');
                break;
            case "Bloques":
                await getDatos('bloques/AllBloques');
                setRuta('bloques');
                break;
            default:
                break;
        }

        setTablaHook(tablaSel);
    }

    const handleDeleteRow = async (targetIndex) => {
        const confirmacion = window.confirm(
            `¿Desea borrar los datos del id: ${targetIndex}?`
        );

        if (confirmacion) {
            const response = await fetch(`api/${ruta.toLowerCase()}/delete/${targetIndex}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                }
            });
            if (!response.ok) {
                console.log(response.statusText);
            } else {
                setRows(rows.filter((info) => {
                    const primeraClave = Object.entries(info)[0][1];
                    return (primeraClave !== targetIndex);
                }));
            }
        }

    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);

        setModalOpen(true);
    };

    const handleSubmit = async (newRow) => {
        if (rowToEdit === null) {
            let response = {};
            response = await fetch(`api/${tablaHook.toLowerCase()}/Register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(newRow),
            });
            if (response.ok) {
                alert("Registro exitoso :D");
            } else {
                console.log(response.statusText);
            }
        } else {
            const filaEdit = rows.filter((fila) => {
                return Object.entries(fila)[0][1] == rowToEdit;
            });

            const filaFinal = { ...filaEdit[0], ...newRow };

            const pares = Object.entries(filaFinal);
            pares.shift();
            const nuevoObjeto = Object.fromEntries(pares);

            let response = await fetch(`api/${tablaHook.toLowerCase()}/Editar/${rowToEdit}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(nuevoObjeto),
            });
            if (response.ok) {
                alert("Modificacion exitosa");
            } else {
                alert("Error al registrar");
            }
        }
    };

    const getDatos = async (url) => {
        const response = await fetch(`api/${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            }
        });

        if (!response.ok) {
            console.log(response.statusText);
        } else {
            const data = await response.json();
            if (data.length != 0) {
                setRows(data);
                const keys = Object.keys(data[0]);
                const cabeceras = keys.map((key) => ({
                    key,
                    label: key
                }));

                setColumnas(cabeceras);
            } else {
                setRows([]);
                setColumnas([]);
            }
        }
    }

    return (
        <>
            <nav className='navMain'>
                <ul>
                    <li onClick={cambiarTabla} name="Usuarios">Usuarios</li>
                    <li onClick={cambiarTabla} name="Clases">Clases</li>
                    <li onClick={cambiarTabla} name="UsuarioClases">UsuariosClases</li>
                    <li onClick={cambiarTabla} name="ProgramaEducativos">ProgramaEducativos</li>
                    <li onClick={cambiarTabla} name="Materias">Materias</li>
                    <li onClick={cambiarTabla} name="Academias">Academias</li>
                    <li onClick={cambiarTabla} name="Catalogos">Catalogos</li>
                    <li onClick={cambiarTabla} name="Bloques">Bloques</li>
                </ul>
            </nav>
            <div className="contenidoPrin">
                {!tablaHook || tablaHook.length === "" ? (
                    <h3>Seleccione una seccion</h3>
                ) : (
                    <>
                        <div className='contenidoPrin__Up'>
                            <h3>{tablaHook}</h3>
                        </div>
                        <div className="contenidoPrin__Down">
                            <button onClick={() => setModalOpen(true)} className="btnAdd">
                                Add
                            </button>
                            <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} columns={columnas} />
                        </div>
                        {modalOpen ? (
                            <Modal
                                closeModal={() => {
                                    setModalOpen(false);
                                    setRowToEdit(null);
                                }}
                                onSubmit={handleSubmit}
                                defaultValue={rowToEdit !== null ? rows.find((row) => {
                                    return Object.entries(row)[0][1] === rowToEdit
                                }) : null}
                                columns={columnas}
                                nombreTabla={tablaHook}
                            />
                        ) : null}
                    </>
                )}
            </div>
        </>
    )
}

export default Admin;