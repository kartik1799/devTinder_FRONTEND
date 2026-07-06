import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/slices/userSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const data = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", null, { withCredentials: true });
      setIsOpen(false);
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        {data && <p>Welcome, {data.firstName}</p>}
        <div
          className={`dropdown dropdown-end ${isOpen ? "dropdown-open" : ""}`}
        >
          <div
            role="button"
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-ghost btn-circle avatar mx-2"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  !data
                    ? "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
                    : data.photoUrl
                }
              />
            </div>
          </div>
          {isOpen && (
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="justify-between"
                >
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" onClick={() => setIsOpen(false)}>
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" onClick={() => setIsOpen(false)}>
                  Requests
                </Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
