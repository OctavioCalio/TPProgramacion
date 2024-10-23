import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api';
import { Link } from 'react-router-dom';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage] = useState(5); // Puedes ajustar este valor según tus necesidades

    useEffect(() => {
        fetchTasks();
    }, [currentPage]);

    const fetchTasks = async () => {
        setLoading(true);
        const response = await getTasks({ page: currentPage - 1, perPage });
        setTasks(response.data.data);
        setTotalPages(Math.ceil(response.data.total / perPage));
        setLoading(false);
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        fetchTasks();
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading) {
        return <div className="d-flex justify-content-center" style={{ marginTop: '100px' }}>
            <div className="spinner-border" role="status"></div>
            <p>Las listas pueden demorar más de un minuto en cargarse...</p>
            
            </div>;
    }

    return (
        <div className="container-fluid mt-4">
            <h2 className="mb-4">Lista de Tareas</h2>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task._id}>
                                <td>{task.name}</td>
                                <td>{task.description}</td>
                                <td>
                                    <Link to={`/tasks/${task._id}/edit`} className="btn btn-warning btn-sm me-2">Editar</Link>
                                    <button onClick={() => handleDelete(task._id)} className="btn btn-danger btn-sm">Eliminar</button>
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

export default TaskList;
