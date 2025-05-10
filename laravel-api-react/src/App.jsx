// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext';

export default function App() {

// const [data, setData] = useState([])

//   const getdata = async () => {
//     try {
//       const res = await axios.get('http://127.0.0.1:8000/api/posts');
//       setData(res.data);

//       if(res.status === 200){
//         //do sometjing
//       }
//     }catch(err){
//       console.log(err)
//     }
//   }

//   useEffect(() => {
//     getdata();
//   })

    const {user} = useContext(AppContext);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* wrapper */}
                    <Route path="/" element={<Layout />}>
                        {/* index route */}
                        <Route index element={<Home />} />

                        <Route
                            path="/register"
                            element={user ? <Home /> : <Register />}
                        />
                        <Route
                            path="/login"
                            element={user ? <Home /> : <Login />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
