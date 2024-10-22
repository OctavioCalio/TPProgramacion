import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUsers, updateUser } from '../apiUsers'; // Asegúrate de tener estas funciones

const EditUser = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [user, setUser] = useState({
        firtname: '',
        lastname: '',
        email: '',
        domicilio: '',
        celular: '',
        documento: '',
        rol: '',
        area: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUsers(id);
            setUser(fetchedUser);
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser(id, user);
        history.push('/users'); // Redirigir a la lista de usuarios después de editar
    };

    return (
        <div>
            <h2>Editar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firtname"
                    value={user.firtname}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                />
                <input
                    type="text"
                    name="lastname"
                    value={user.lastname}
                    onChange={handleChange}
                    placeholder="Apellido"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="domicilio"
                    value={user.domicilio}
                    onChange={handleChange}
                    placeholder="Domicilio"
                    required
                />
                <input
                    type="text"
                    name="celular"
                    value={user.celular}
                    onChange={handleChange}
                    placeholder="Celular"
                    required
                />
                <input
                    type="text"
                    name="documento"
                    value={user.documento}
                    onChange={handleChange}
                    placeholder="Documento"
                    required
                />
                <input
                    type="text"
                    name="rol"
                    value={user.rol}
                    onChange={handleChange}
                    placeholder="Rol"
                    required
                />
                <input
                    type="text"
                    name="area"
                    value={user.area}
                    onChange={handleChange}
                    placeholder="Área"
                    required
                />
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditUser;
