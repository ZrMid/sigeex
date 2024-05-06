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

    const cambiarTabla = async (e) => {
        const tablaSel = e.target.getAttribute('name');
        switch (tablaSel) {
            case "Usuarios":
                await getDatos('usuarios/AllUsers');
                break;
            case "Clases":
                await getDatos('clases/AllClases');
                break;
            case "UsuariosClases":
                await getDatos('usuarioclases/AllUsuarioClases');
                break;
            case "ProgramaEducativo":
                await getDatos('programaeducativos/AllProgramaEducativos');
                break;
            case "Materias":
                await getDatos('materias/AllMaterias');
                break;
            case "Academias":
                await getDatos('academias/AllAcademias');
                break;
            case "Catalogos":
                await getDatos('catalogos/AllCatalogos');
                break;
            case "Bloques":
                await getDatos('bloques/AllBloques');
                break;
            default:
                break;
        }

        setTablaHook(e.target.textContent);
    }

    const handleDeleteRow = (targetIndex) => {
        setRows(rows.filter((info) => {
            const primeraClave = Object.entries(info)[0][1];
            return (primeraClave !== targetIndex);
        }));
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);

        setModalOpen(true);
    };

    const handleSubmit = (newRow) => {
        rowToEdit === null
            ? (
                //falta fetch para agregar
                true
            )
            : (
                //falta hacer el editar
                true
            );
        getDatos();
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

        return true;
    }

    return (
        <>
            <nav className='navMain'>
                <ul>
                    <li onClick={cambiarTabla} name="Usuarios">Usuarios</li>
                    <li onClick={cambiarTabla} name="Clases">Clases</li>
                    <li onClick={cambiarTabla} name="UsuariosClases">UsuariosClases</li>
                    <li onClick={cambiarTabla} name="ProgramaEducativo">ProgramaEducativo</li>
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
                                defaultValue={rowToEdit !== null ? rows.find((row)=>{
                                    return Object.entries(row)[0][1] === rowToEdit
                                }) : null}
                                columns={columnas}
                                setRows={setRows}
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