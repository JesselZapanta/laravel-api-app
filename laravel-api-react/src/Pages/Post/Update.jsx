import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
    const { token, user } = useContext(AppContext);
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        body: "",
    });

    const navigate = useNavigate();

    const getPost = async () => {
        setProcessing(true);
        try {
            const res = await axios.get(`/api/posts/${id}`);
            if (res.status === 200) {
                if (res.data.user_id !== user.id) {
                    navigate("/"); //wont work
                    // console.log("Redirecting to home");
                    return;
                }

                setFormData({
                    title: res.data.title,
                    body: res.data.body,
                });
            }
        } catch (err) {
            console.log(err);
        } finally {
            setProcessing(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const res = await axios.put(`/api/posts/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.status === "updated") {
                // alert("Post is created!");
                navigate("/");
            }
        } catch (err) {
            setErrors(err.response.data.errors);
        } finally {
            setProcessing(false);
        }
    };

    useEffect(() => {
        getPost();
    }, [user]);

    // console.log(post);
    return (
        <>
            <h1 className="title">Update post</h1>
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
                    {processing ? "Please wait" : "Update"}
                </button>
            </form>
        </>
    );
}
