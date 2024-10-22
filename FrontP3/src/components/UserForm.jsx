// UserForm.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createUser, getUserById, updateUser } from '../apiUsers'; // Asegúrate de que la ruta sea correcta
import { getTasks } from '../api';


const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firtname: '',
        lastname: '',
        email: '',
        domicilio: '',
        celular: '',
        documento: '',
        rol: '',
        area: '',
        task: ''
    }); // Agrega otros campos según lo necesites
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (id) {
                    const response = await getUserById(id);
                    setUserData(response.data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();

        const fetchTasks = async () => {
            try {
                const response = await getTasks({});
                setTasks(response.data.data);
            } catch (err) {
                console.error("Error al cargar las tareas:", err);
            }
        };
        fetchTasks();

    }, [id]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos del usuario antes de enviar:", userData);
        try {
            if (id) {
                console.log("Actualizando usuario con ID:", id);
                await updateUser(id, userData);
            } else {
                console.log("Creando nuevo usuario...");
                await createUser(userData);
            }
            console.log("Usuario enviado exitosamente");
            navigate('/users'); // Redirige a la lista de usuarios
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Cargando usuario...</p>;
    if (error) return <p>Error: {error}</p>;


    return (

        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2 className="mb-4">Crear Usuario</h2>
                    <form onSubmit={handleSubmit}>

                        {/* Campo para el nombre */}
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                name="firtname"
                                value={userData.firtname}
                                onChange={handleChange}
                                placeholder="Nombre"
                                required
                                className="form-control mb-2"
                            />
                        </div>

                        {/* Campo para el apellido */}

                        <div className="form-group mb-3">
                            <input
                                type="text"
                                name="lastname"
                                value={userData.lastname}
                                onChange={handleChange}
                                placeholder="Apellido"
                                required
                                className="form-control mb-2"
                            />
                        </div>

                        {/* Campo para el email */}

                        <div className="form-group mb-3">
                            <input
                                type="text"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                                className="form-control mb-2"
                            />
                        </div>



                        {/* Campo para el domicilio */}

                        <div className="form-group mb-3">
                            <input
                                type="text"
                                name="domicilio"
                                value={userData.domicilio}
                                onChange={handleChange}
                                placeholder="Domicilio"
                                required
                                className="form-control mb-2"
                            />
                        </div>

                        {/* Campo para el celular */}

                        <div className="form-group mb-3">
                            <input
                                type="tel"
                                name="celular"
                                value={userData.celular}
                                onChange={handleChange}
                                placeholder="Celular"
                                required
                                className="form-control mb-2"
                            />
                        </div>

                        {/* Campo para el documento */}

                        <div className="form-group mb-3">
                            <input
                                type="text"
                                name="documento"
                                value={userData.documento}
                                onChange={handleChange}
                                placeholder="Documento"
                                required
                                className="form-control mb-2"
                            />
                        </div>

                        {/* Campo para el rol */}

                        <div className="form-group mb-3">
                            <input
                                type="text"
                                name="rol"
                                value={userData.rol}
                                onChange={handleChange}
                                placeholder="Rol"
                                required
                                className="form-control mb-2"
                            />
                        </div>

                        {/* Campo para el área */}

                        <div className="form-group mb-3">
                            <input
                                type="text"
                                name="area"
                                value={userData.area}
                                onChange={handleChange}
                                placeholder="Área"
                                required
                                className="form-control mb-2"
                            />
                        </div>

                        {/* Reemplazamos el campo de texto de tarea por un selector */}
                        <div className="form-group mb-3">
                            <select
                                name="task"
                                value={userData.task}
                                onChange={handleChange}
                                required
                                className="form-control"
                            >
                                <option value="">Seleccione una tarea previamente cargada</option>
                                {tasks.map(task => (
                                    <option key={task._id} value={task._id}>
                                        {task.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>


                </div>
            </div>


        </div>

    );



};

export default UserForm;
