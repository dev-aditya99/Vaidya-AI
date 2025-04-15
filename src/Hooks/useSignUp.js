import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser, authBaseUrl } = useAuthContext();

    // sign up method 
    const signup = async ({ first_name, last_name, email, password, confirm_password }) => {
        const success = await handleInputErrors({
            first_name, last_name, email, password, confirm_password
        });

        if (!success) return;

        setLoading(true)
        try {
            const res = await fetch(authBaseUrl + "/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ first_name, last_name, email, password, confirm_password }),
                credentials: "include"
            })

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("user", JSON.stringify(data));
            setAuthUser(data);

            toast.success("Sign Up Successfully!");
        } catch (error) {
            toast.error("Error During Signup : " + error.message)
        } finally {
            setLoading(false)
        }

    }

    return { loading, signup };
}

export default useSignUp;

async function handleInputErrors({ first_name, last_name, email, password, confirm_password }) {

    if (!first_name || !last_name || !email || !password || !confirm_password || !role) {
        toast.error("Please fill all the required fields")
        return false;
    }

    if (password !== confirm_password) {
        toast.error("Passwords doesn't match");
        return false;
    }

    if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
    }

    return true;

}