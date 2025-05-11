import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get("api/posts");
            setData(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1 className="title">Latest Posts</h1>
            <div className="mx-auto space-y-2">
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                {loading ? (
                    <div>Getting latest post, please wait...</div>
                ) : data && data.length > 0 ? (
                    data.map((post) => (
                        <div
                            key={post.id}
                            className="mb-4 p-4 rounded-md border border-dashed border-slate-900">
                            <div className="flex justify-between">
                                <h3 className="text-2xl font-bold">
                                    {post.title}
                                </h3>
                                <div>
                                  <Link to={`/posts/${post.id}`} className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg">Read More</Link>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600">
                                Created by {post.user.name} on{" "}
                                {new Date(post.created_at).toLocaleTimeString()}
                            </p>
                            <p>{post.body}</p>
                        </div>
                    ))
                ) : (
                    <div>No post found</div>
                )}
            </div>
        </>
    );
}
