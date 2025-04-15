import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser, authBaseUrl } = useAuthContext();

    // login user method 
    const loginUser = async ({ email, password }) => {
        const success = await handleInputErrors({
            email, password
        });

        if (!success) return;

        setLoading(true)
        try {
            const res = await fetch(authBaseUrl + "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            })

            const data = await res.json();

            // if any error 
            if (data.error) {
                throw new Error(data.error)
            }

            // set to localStorage 
            localStorage.setItem("user", JSON.stringify(data));
            setAuthUser(data);

            toast.success(data?.msg);
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loginUser, loading };
}

export default useLogin;

async function handleInputErrors({ email, password }) {
    if (!email || !password) {
        toast.error("Please fill all the required fields")
        return false;
    }

    if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
    }

    return true;
}