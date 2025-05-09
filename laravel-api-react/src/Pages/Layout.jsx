import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
    const { user } = useContext(AppContext);

    return (
        <>
            <header>
                <nav>
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    <div className="flex gap-4">
                        {user.name ? (
                            <>
                                <div className="text-slate-400">
                                    <p>Welcome back {user.name}</p>
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
