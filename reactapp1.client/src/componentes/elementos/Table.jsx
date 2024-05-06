/* eslint-disable react/prop-types */
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import '/src/estilos/TableAdminStyle.css'

export const Table = ({ columns, rows, deleteRow, editRow }) => {
    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.key}</th>
                        ))}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (rows.map((row, idx) => {
                        return (
                            <tr key={idx}>
                                {columns.map((column) => (
                                    <td key={column.key} className="expand">{row[column.key]}</td>
                                ))}
                                <td className="fit">
                                    <span className="actions">
                                        <BsFillTrashFill
                                            className="delete-btn"
                                            onClick={() => deleteRow(Object.entries(row)[0][1])}
                                        />
                                        <BsFillPencilFill
                                            className="edit-btn"
                                            onClick={() => editRow(Object.entries(row)[0][1])}
                                        />
                                    </span>
                                </td>
                            </tr>
                        );
                    })) : (<tr><td>No se ha ingresado ningun dato</td></tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default Table;