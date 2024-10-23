import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../apiUsers';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage] = useState(5);

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        setLoading(true);
        const response = await getUsers({ page: currentPage - 1, perPage });
        setUsers(response.data.data);
        setTotalPages(Math.ceil(response.data.total / perPage));
        setLoading(false);
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
        fetchUsers();
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <div className="text-center">
                    <div className="spinner-border mb-3" role="status"></div>
                    <br></br>
                    <p>Las listas pueden demorar más de un minuto en cargarse...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid mt-4">
            <h2 className="mb-4">Lista de Usuarios</h2>
            <div className="table-responsive w-100">
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Área</th>
                            <th>Tarea</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.firtname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.rol}</td>
                                <td>{user.area}</td>
                                <td>{user.task.length > 0 ? user.task[0].name : 'Sin tarea asignada'}</td>
                                <td className="d-flex">
                                    <Link to={`/users/${user._id}/edit`} className="btn btn-warning btn-sm me-2">Editar</Link>
                                    <button onClick={() => handleDelete(user._id)} className="btn btn-danger btn-sm">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Anterior</button>
                    </li>
                    {[...Array(totalPages).keys()].map(number => (
                        <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(number + 1)}>{number + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Siguiente</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default UserList;


