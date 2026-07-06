import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import {Link} from "react-router-dom"

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="card card-border bg-base-200 w-96">
        <div className="card-body flex items-center">
          <h2 className="text-3xl font-bold text-center mt-2">Welcome Back</h2>
          <h2 className="card-title">Login to continue</h2>
          <div className="w-full mt-5">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Address</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Type here"
              />
              <p className="label"></p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type here"
              />
              <p className="label"></p>
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="w-full flex justify-center">
            <button className="btn btn-primary w-full" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-400">Don't have an account?</p>
            <Link to="/signup" className="btn btn-primary mt-1 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
