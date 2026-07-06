import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    about: "",
    age: "",
    gender: "",
    skills: "",
    photoUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError("");

      await axios.post(BASE_URL + "/signup", user);

      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="card card-border bg-base-200 w-3/10 mr-auto ml-auto mt-8 mb-20 p-4">
        <div className="card-body flex items-center">
          <h2 className=" text-3xl card-title mb-7">Join Cricket World 🏏</h2>
          <div className="w-full">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input w-full"
                value={user.firstName || ""}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                placeholder="Type here"
              />
              <p className="label"></p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input w-full"
                value={user.lastName || ""}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                placeholder="Type here"
              />
              <p className="label"></p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="email"
                className="input w-full"
                value={user.emailId || ""}
                onChange={(e) => setUser({ ...user, emailId: e.target.value })}
                placeholder="Type here"
              />
              <p className="label"></p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input w-full"
                value={user.password || ""}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Type here"
              />
              <p className="label"></p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <textarea
                className="textarea w-full"
                placeholder="About"
                value={user.about || ""}
                onChange={(e) => setUser({ ...user, about: e.target.value })}
              ></textarea>
              <p className="label"></p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="number"
                className="input w-full"
                value={user.age || ""}
                onChange={(e) => setUser({ ...user, age: e.target.value })}
                placeholder="Type here"
              />
              <p className="label"></p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <select
                value={user.gender || ""}
                className="select w-full"
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              >
                <option value="" disabled={true}>Select your gender</option>
                <option value="M">M</option>
                <option value="F">F</option>
                <option value="Other">Other</option>
              </select>
              <p className="label"></p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Skills</legend>
              <input
                type="text"
                className="input w-full"
                value={user.skills || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    skills: e.target.value
                      .split(",")
                      .map((skill) => skill.trim()),
                  })
                }
                placeholder="Type here"
              />
              <p className="label"></p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="text"
                className="input w-full"
                value={user.photoUrl || ""}
                onChange={(e) => setUser({ ...user, photoUrl: e.target.value })}
                placeholder="Type here"
              />
              <p className="label"></p>
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center w-full">
            <button
              disabled={loading}
              className="btn btn-primary w-full"
              onClick={handleSignUp}
            >
              {loading ? "Creating..." : "Create Profile"}
            </button>
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-400">Already have an account?</p>
            <Link to="/login" className="btn btn-primary mt-1 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      {showAlert && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile created successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
