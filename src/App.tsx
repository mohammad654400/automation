// import Home from "./pages/Home/Home";

// function App() {
//   return (
//     <>
//       <Home />
//     </>
//   );
// }

// export default App;
// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home/Home";
// import Login from "./components/Login/Login";
// import HomePage from "./components/Slider/HomePage/HomePage";
// import RequestForm from "./components/Slider/RequestForm/RequestForm";

// function App() {
//   const checkTokenExpiration = () => {
//     const expirationTime = localStorage.getItem("expiration_time");
//     if (expirationTime && new Date().getTime() > parseInt(expirationTime)) {
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("refresh_token");
//       localStorage.removeItem("expiration_time");
//       return false;
//     }
//     return true;
//   };

//   const isAuthenticated =
//     checkTokenExpiration() && localStorage.getItem("refresh_token");

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
//           }
//         />
//         <Route
//           path="/home"
//           element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
//         >
//           <Route index element={<HomePage />} />
//           <Route path="/automation/RequestForm" element={<RequestForm />} />

//           {/* Add more routes as needed */}
//         </Route>
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import HomePage from "./components/Slider/HomePage/HomePage";
import RequestForm from "./components/Slider/RequestForm/RequestForm";
import ItemProduct from "./components/Slider/HomePage/itemProduct";

function App() {
  const checkTokenExpiration = () => {
    const expirationTime = localStorage.getItem("expiration_time");
    if (expirationTime && new Date().getTime() > parseInt(expirationTime)) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("expiration_time");
      return false;
    }
    return true;
  };

  const isAuthenticated =
    checkTokenExpiration() && localStorage.getItem("refresh_token");

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      >
        <Route index element={<HomePage />} />
        <Route path="automation/requestform1" element={<RequestForm />} />
        <Route path="message/:id" element={<ItemProduct />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
