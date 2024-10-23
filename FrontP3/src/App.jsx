import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import UserList from './components/UserList';  // Asegúrate de crear este componente
import UserForm from './components/UserForm';
import EditUser from './components/EditUser';
import PrivateRoute from './components/PrivateRoute'; // Asegúrate de crear este componente
import 'bootstrap/dist/css/bootstrap.min.css';
import { User } from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {

    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();


    if (isAuthenticated) {

        return (
            <Router>
                <Navbar />
                <Routes >

                    {/* Rutas privadas para tareas */}
                    <Route path="/tasks" element={
                        <PrivateRoute>
                            <TaskList />
                        </PrivateRoute>
                    } />
                    <Route path="/tasks/create" element={
                        <PrivateRoute>
                            <TaskForm />
                        </PrivateRoute>
                    } />
                    <Route path="/tasks/:id/edit" element={
                        <PrivateRoute>
                            <TaskForm />
                        </PrivateRoute>
                    } />

                    {/* Rutas privadas para usuarios */}
                    <Route path="/users" element={
                        <PrivateRoute>
                            <UserList />
                        </PrivateRoute>
                    } />
                    <Route path="/users/create" element={
                        <PrivateRoute>
                            <UserForm />
                        </PrivateRoute>
                    } />
                    <Route path="/users/:id/edit" element={
                        <PrivateRoute>
                            <UserForm />
                        </PrivateRoute>
                    } />

                    {/* Página Pública */}
                    <Route path="/" element={
                        <div className="container mt-4">
                            <h1>Administración</h1>
                            <br></br>
                            <h4>¡Bienvenido {user.name}!</h4>
                            <br></br>
                            <p>Para agregar, modificar o eliminar usuarios y tareas utilice los 
                                accesos en la barra de navegación
                                
                            </p>
                                           
                        </div>
                    } />
                </Routes>
            </Router>
        );



    } else {
        return (

            <Router>
                <Navbar />
                <Routes >
                    {/* Página Pública */}
                    <Route path="/" element={
                        <div className="container mt-4">
                            <h1>Ingresar</h1>
                            <p>Bienvenido al sistema de administración. Para continuar, inicie sesión</p>

                            <button
                                className="btn btn-primary"
                               
                                onClick={() => loginWithRedirect()}
                            >
                                Ingresar
                            </button>

                        </div>
                    } />
                </Routes>
            </Router>

        );
    }
};

export default App;


