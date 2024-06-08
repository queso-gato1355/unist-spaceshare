import { useContext } from 'react';
import UserContext from '@/context/UserContext';

const LogoutButton = () => {
    const { logout } = useContext(UserContext);

    return (
        <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">
            Logout
        </button>
    );
};

export default LogoutButton;
