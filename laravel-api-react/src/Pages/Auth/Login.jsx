import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Login() {
    const { setToken } = useContext(AppContext);

    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setError({});
        try {
            const res = await axios.post("/api/login", formData);
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                setToken(res.data.token);
                navigate("/");
            }
        } catch (err) {
            console.log(err);
            if (err.status === 422) {
                setError(err.response.data.errors);
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <>
            <h1 className="title">Login to your account</h1>
            <form className="w-1/2 mx-auto space-y-6">
                <div className="space-y-1">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="e.g. juandelacruz@gmail.com"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    {error.email && (
                        <p className="text-sm text-red-400">{error.email}</p>
                    )}
                </div>
                <div className="space-y-1">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        // value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                    />
                    {error.password && (
                        <p className="text-sm text-red-400">{error.password}</p>
                    )}
                </div>
                <button
                    className="primary-btn"
                    disabled={processing}
                    onClick={handleSubmit}>
                    {processing ? "Please wait" : "Log in"}
                </button>
            </form>
        </>
    );
}
