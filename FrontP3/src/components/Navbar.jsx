import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {

    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    if (isAuthenticated) {
        console.log('Usuario acaba de ingresar: ', user);

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/" style={{ padding: '1em' }}>Programación III</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/tasks">Lista de Tareas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tasks/create" >Crear Tarea</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">Lista de Usuarios</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/users/create">Crear Usuario</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        <h1 style={{color:"white", fontSize:"large", margin:"1.5em"}}>Usuario activo: {user.name}</h1>
                        <li className="nav-item">
                            {!isAuthenticated ? (
                                <button
                                    className="btn btn-primary"
                                    style={{ margin: "1em" }}
                                    onClick={() => loginWithRedirect()}
                                >
                                    Ingresar
                                </button>
                            ) : (
                                <button
                                    className="btn btn-danger"
                                    style={{ margin: "1em" }}
                                    onClick={() => logout({ returnTo: https://tp-programacion-tawny.vercel.app })}
                                >
                                    Salir
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>



        );

    } else {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/" style={{ padding: '1em' }}>Programación III</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">

                    </ul>

                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            {!isAuthenticated ? (
                                <button
                                    className="btn btn-primary"
                                    style={{ margin: "1em" }}
                                    onClick={() => loginWithRedirect()}
                                >
                                    Ingresar
                                </button>
                            ) : (
                                <button
                                    className="btn btn-danger"
                                    style={{ margin: "1em" }}
                                    onClick={() => logout({ returnTo: https://tp-programacion-tawny.vercel.app })}
                                >
                                    Salir
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>

        );

    }
};

export default Navbar;
