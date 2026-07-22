import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            const response = await API.post("api/login/", formData);

            localStorage.setItem(
                "access_token",
                response.data.access
            );

            localStorage.setItem(
                "refresh_token",
                response.data.refresh
            );

            navigate("/");
        } catch (err) {
            if (err.response) {
                setError("Invalid username or password");
            } else {
                setError("Could not connect to server");
            }
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#0f172a",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Arial",
            }}
        >
            <div
                style={{
                    width: "400px",
                    background: "#1e293b",
                    padding: "35px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0,0,0,.4)",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <h1
                        style={{
                            color: "white",
                            marginBottom: "10px",
                        }}
                    >
                        📝 Notes App
                    </h1>

                    <p style={{ color: "#94a3b8" }}>
                        Welcome Back
                    </p>
                </div>

                {error && (
                    <div
                        style={{
                            background: "#7f1d1d",
                            color: "#fecaca",
                            padding: "12px",
                            borderRadius: "8px",
                            marginBottom: "20px",
                            textAlign: "center",
                        }}
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "20px" }}>
                        <label
                            style={{
                                color: "#cbd5e1",
                                display: "block",
                                marginBottom: "8px",
                            }}
                        >
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Enter username"
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #334155",
                                background: "#0f172a",
                                color: "white",
                                outline: "none",
                                fontSize: "15px",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "25px" }}>
                        <label
                            style={{
                                color: "#cbd5e1",
                                display: "block",
                                marginBottom: "8px",
                            }}
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter password"
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #334155",
                                background: "#0f172a",
                                color: "white",
                                outline: "none",
                                fontSize: "15px",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "14px",
                            border: "none",
                            borderRadius: "8px",
                            background: "#2563eb",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        Login
                    </button>
                </form>

                <p
                    style={{
                        color: "#94a3b8",
                        textAlign: "center",
                        marginTop: "25px",
                    }}
                >
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        style={{
                            color: "#3b82f6",
                            textDecoration: "none",
                            fontWeight: "bold",
                        }}
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;