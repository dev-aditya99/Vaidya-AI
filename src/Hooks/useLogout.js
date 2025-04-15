import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogout = () => {
    const { setAuthUser, authBaseUrl } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const logoutUser = async () => {
        try {
            setLoading(true);
            const res = await fetch(authBaseUrl + "/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.removeItem("user");
            setAuthUser(null);
            toast.success(data?.msg);
        } catch (error) {
            toast.error("Error During Logout : " + error.message)
        } finally {
            setLoading(false)
        }
    }

    return { logoutUser, loading };
}

export default useLogout;