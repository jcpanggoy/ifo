import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RequestPage from "./components/RequestPage";
import AdminPage from "./components/AdminPage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<LoginPage />}
                />
                <Route
                    path="/admin"
                    element={<AdminPage />}
                />

                <Route
                    path="/requestor"
                    element={<RequestPage />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

// const Root = () => {
//     return <Navigate to="/login" />;
// };

// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route
//             path="/"
//             element={<Root />}
//         >
//             <Route
//                 path="login"
//                 element={<LoginPage />}
//             />
//             <Route
//                 path="requestor"
//                 element={<RequestPage />}
//             />
//             <Route
//                 path="admin"
//                 element={<AdminPage />}
//             />
//         </Route>
//     )
// );

// ReactDOM.createRoot(document.getElementById("root")).render(
//     <React.StrictMode>
//         <RouterProvider router={router} />
//     </React.StrictMode>
// );

/* 

import React from 'react'
import Dashboard from './Components/Dashboard'
import Homepage from './Components/Homepage'
import {BrowserRouter, Routes,Route } from "react-router-dom"
const App = () => {
  
  return (
    <div>
      <h1 className="text-3xl text-white font-bold">Auth-Application</h1>
      <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


*/
