import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoutes from "./PrivateRoutes";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

const App = () => {

  return (
    <Routes>
      {/* If the user is authenticated, redirect them from login to the home page */}
      <Route path="/login" element={<Login />} />

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
