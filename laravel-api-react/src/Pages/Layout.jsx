import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";

export default function Layout() {
    const { user,setUser, token, setToken } = useContext(AppContext);

    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/logout", {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                setUser(null);
                setToken(null);
                localStorage.removeItem("token");
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    };
    

    return (
        <>
            <header>
                <nav>
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    <div className="flex gap-4">
                        {user ? (
                            <>
                                <div className="text-slate-400 flex gap-4 items-center">
                                    <p>Welcome back {user.name}</p>
                                    <Link to="post" className="nav-link">
                                        New Posts
                                    </Link>
                                    <form>
                                        <button
                                            className="nav-link"
                                            onClick={handleLogout}>
                                            Log out
                                        </button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="register" className="nav-link">
                                    Register
                                </Link>
                                <Link to="login" className="nav-link">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
