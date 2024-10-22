import React, { useEffect, useState } from 'react';
import { createTask, getTaskById, updateTask } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = () => {
    const [task, setTask] = useState({ name: '', description: '' });
    const navigate = useNavigate(); // Cambiar aquí
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchTask = async () => {
                const response = await getTaskById(id);
                setTask(response.data);
            };

            fetchTask();
        }
    }, [id]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let savedTask;
        if (id) {
            savedTask = await updateTask(id, task);
        } else {
            savedTask = await createTask(task);
            console.log('Se creó la tarea de id:', task._id);
        }
        navigate('/tasks'); // Cambiar aquí
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2 className="mb-4">{id ? 'Editar Tarea' : 'Crear Tarea'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Nombre</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name" 
                                name="name" 
                                value={task.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Descripción</label>
                            <textarea 
                                className="form-control" 
                                id="description" 
                                name="description" 
                                value={task.description} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {id ? 'Actualizar' : 'Crear'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;