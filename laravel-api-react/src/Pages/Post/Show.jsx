import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Show() {
    // console.log(useParams())
    const { user } = useContext(AppContext);
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPost = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/posts/${id}`);
            setPost(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    return (
        <div>
            <div className="mt-8 mx-auto space-y-2">
                {loading ? (
                    <div>Getting the post, please wait...</div>
                ) : post ? (
                    <div
                        key={post.id}
                        className="mb-4 p-4 rounded-md border border-dashed border-slate-900">
                        <div className="flex justify-between">
                            <h3 className="text-2xl font-bold">{post.title}</h3>
                        </div>
                        <p className="text-sm text-slate-600">
                            Created by {post?.user?.name} on{" "}
                            {new Date(post.created_at).toLocaleTimeString()}
                        </p>
                        <p>{post.body}</p>
                        <div className="mt-4 flex justify-end gap-2">
                            {user && user.id === post.user_id && (
                                <>
                                    <Link
                                        to={`/`}
                                        className="bg-red-500 text-white text-sm px-3 py-1 rounded-lg">
                                        Delete
                                    </Link>
                                    <Link
                                        to={`/posts/update/${post.id}`}
                                        className="bg-green-500 text-white text-sm px-3 py-1 rounded-lg">
                                        Update
                                    </Link>
                                </>
                            )}
                            <Link
                                to={`/`}
                                className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg">
                                Back
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>No post found</div>
                )}
            </div>
        </div>
    );
}
