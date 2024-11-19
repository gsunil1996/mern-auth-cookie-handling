import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoutes from "./protectedRoutes/PrivateRoutes";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { useSelector } from "react-redux";

const App = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <Routes>
      {/* If the user is authenticated, redirect them from login to the home page */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />

      {/* Private routes require validation before access */}
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Catch-all route for not found pages */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
