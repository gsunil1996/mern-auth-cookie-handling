import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validateToken } from "../redux/features/authSlice";
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

  console.log("isAuthenticated", isAuthenticated, validateTokenIsLoading, validateTokenIsError, validateTokenIsSuccess)

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated && !validateTokenIsLoading) {
      dispatch(validateToken());
    }
  }, [isAuthenticated, validateTokenIsLoading, dispatch]);

  if (validateTokenIsLoading) {
    console.log("isAuthenticated code reached validateTokenIsLoading")
    return (
      <Box sx={{ width: "100%", marginTop: "40px" }}>
        <LinearProgress />
      </Box>
    );
  } else if (validateTokenIsError) {
    console.log("isAuthenticated code reached validateTokenIsError")
    return <Navigate to="/login" />;
  } else if (validateTokenIsSuccess || isAuthenticated) {
    console.log("isAuthenticated code reached Outlet")
    return <Outlet />;
  }

  // Default case if no other conditions are met
  return null;
};

export default PrivateRoutes;
