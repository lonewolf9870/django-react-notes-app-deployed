import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await API.post("api/register/", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            navigate("/login");
        } catch (err) {
            if (err.response && err.response.data) {
                setError(
                    Object.values(err.response.data)
                        .flat()
                        .join(" ")
                );
            } else {
                setError("Could not connect to server.");
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
                    width: "420px",
                    background: "#1e293b",
                    padding: "35px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0,0,0,.4)",
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "30px",
                    }}
                >
                    <h1
                        style={{
                            color: "white",
                            marginBottom: "10px",
                        }}
                    >
                        📝 Notes App
                    </h1>

                    <p
                        style={{
                            color: "#94a3b8",
                        }}
                    >
                        Create your account
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
                    <div style={{ marginBottom: "18px" }}>
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
                            placeholder="Choose a username"
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

                    <div style={{ marginBottom: "18px" }}>
                        <label
                            style={{
                                color: "#cbd5e1",
                                display: "block",
                                marginBottom: "8px",
                            }}
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
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

                    <div style={{ marginBottom: "18px" }}>
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
                            placeholder="Create a password"
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
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="Confirm password"
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
                        Create Account
                    </button>
                </form>

                <p
                    style={{
                        textAlign: "center",
                        color: "#94a3b8",
                        marginTop: "25px",
                    }}
                >
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        style={{
                            color: "#3b82f6",
                            textDecoration: "none",
                            fontWeight: "bold",
                        }}
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;