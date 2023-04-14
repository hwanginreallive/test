import { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import authContext from '../../store/authContext';
import Login from '../auth/login';
import Register from '../auth/register';
import Dashboard from '../dashboard';
const Router = () => {
    const history = useNavigate();

    const [state] = useContext(authContext);

    useEffect(() => {
        if (!state?.user?.access_token) {
            history('/');
        }
    }, [history, state?.user?.access_token]);
    return (
        <Routes>
            <Route path="/" element={state?.user?.access_token ? <Dashboard /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
};

export default Router;
