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
    validateTokenIsSuccess,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(validateToken());
    }
  }, []);

  if (validateTokenIsLoading) {
    return (
      <Box sx={{ width: "100%", marginTop: "40px" }}>
        <LinearProgress />
      </Box>
    );
  } else if (validateTokenIsError) {
    return <Navigate to="/login" />;
  } else if (validateTokenIsSuccess || isAuthenticated) {
    return <Outlet />;
  }

  // Default case if no other conditions are met
  return null;
};

export default PrivateRoutes;
