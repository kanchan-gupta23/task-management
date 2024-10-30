import React, { useEffect } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout();           // Logs out the user
        navigate("/login"); // Redirects to the login page
    }, [logout, navigate]);

    return null; // No need to render anything if redirecting
}

export default Logout;
