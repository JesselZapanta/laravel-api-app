import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Create() {

    const {token} = useContext(AppContext); 

    const [formData, setFormData] = useState({
        title: "",
        body: "",
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const res = await axios.post('/api/posts', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.status === "created") {
                // alert("Post is created!");
                navigate('/');
            }
        } catch (err) {
            setErrors(err.response.data.errors)
        } finally {
            setProcessing(false);
        }
    };
    return (
        <>
            <h1 className="title">Create a new post</h1>
            <form className="w-1/2 mx-auto space-y-6">
                <div className="space-y-2">
                    <label htmlFor="title">Title</label>

                    <input
                        type="text"
                        name="title"
                        placeholder="Post title"
                        value={formData.title}
                        onChange={(e) => {
                            setFormData({ ...formData, title: e.target.value });
                        }}
                    />

                    {errors.title && (
                        <p className="text-sm text-red-400">{errors.title}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label htmlFor="body">Body</label>

                    <textarea
                        rows="6"
                        type="text"
                        name="body"
                        placeholder="Enter here..."
                        value={formData.body}
                        onChange={(e) => {
                            setFormData({ ...formData, body: e.target.value });
                        }}></textarea>

                    {errors.body && (
                        <p className="text-sm text-red-400">{errors.body}</p>
                    )}
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={processing}
                    className="primary-btn">
                    {processing ? "Please wait" : "Create"}
                </button>
            </form>
        </>
    );
}
