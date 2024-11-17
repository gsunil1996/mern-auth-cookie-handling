import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validateToken } from "./redux/features/authSlice";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";
import { useEffect } from "react";

const PrivateRoutes = () => {
  const {
    isAuthenticated,
    validateTokenIsLoading,
    validateTokenIsError,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    // Only dispatch validateToken if not authenticated and it's not already loading
    if (!isAuthenticated && !validateTokenIsLoading) {
      dispatch(validateToken());
    }
  }, [isAuthenticated, validateTokenIsLoading, dispatch]);

  if (validateTokenIsLoading) {
    return (
      <Box sx={{ width: "100%", marginTop: "40px" }}>
        <LinearProgress />
      </Box>
    );
  }

  if (validateTokenIsError || !isAuthenticated) {
    // If there's an error or user is not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  // If token is validated successfully or user is authenticated, show the protected route
  return <Outlet />;
};

export default PrivateRoutes;
