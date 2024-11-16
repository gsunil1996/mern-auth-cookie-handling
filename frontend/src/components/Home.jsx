import { useDispatch } from "react-redux";
import { logoutAction, resetLogout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom"

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await dispatch(logoutAction()).unwrap();
      dispatch(resetLogout())
      navigate("/login");
    } catch (error) {
      alert(error)
      dispatch(resetLogout())
    }
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home