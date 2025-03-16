import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { validateEmail, validatePassword } from "../../utils/helper.js";
import { loginUser } from "../../hooks/useLogin";
import { auth } from "../../firebase/firsebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!validateEmail(form.email)) {
            setError("Invalid email address.");
            setLoading(false);
            return;
        }

        if (!validatePassword(form.password)) {
            setError("Password must be at least 6 characters.");
            setLoading(false);
            return;
        }

        try {
            const data = await loginUser(form.email, form.password);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

      //  Google Login Function
      async function googleLogin() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Google User:", result.user);

            if (result.user) {
                alert("Logged in successfully with Google!");
                navigate("/dashboard"); 
            }
        } catch (error) {
            console.error("Google Login Error:", error.message);
            setError("Google login failed. Try again.");
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                <div className="bg-white p-6 sm:p-8 shadow-lg rounded-md w-full max-w-sm sm:max-w-md">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Login</h2>

                    <form onSubmit={handleLogin} className="flex flex-col">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="border rounded-md px-4 py-2 mb-3 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="border rounded-md px-4 py-2 mb-2 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        <p className="text-sm text-center mt-4">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-blue-600 hover:underline">
                                Signup
                            </Link>
                        </p>
                        {/* Google Login Button */}
                        <button type="button" 
                        onClick={googleLogin}
                        className="bg-white text-blue-600 border border-blue-600 py-2 rounded-md mt-3 hover:bg-blue-100 transition">
                            Login with Google
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
