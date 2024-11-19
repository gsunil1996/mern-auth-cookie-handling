import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction, resetLogin, resetValidateToken } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginAction({ username, password })).unwrap();
      dispatch(resetLogin())
      dispatch(resetValidateToken())
      setUsername("")
      setPassword("")
      navigate("/")
    } catch (error) {
      alert(error)
      dispatch(resetLogin())
      setUsername("")
      setPassword("")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Username</p>
        <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
        <p>passwords</p>
        <input type="text" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button>Login</button>
        <br />
        <button onClick={() => navigate("/")}>Home</button>
      </form>
    </div>
  )
}

export default Login