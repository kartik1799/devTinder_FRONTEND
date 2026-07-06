import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/slices/userSlice";
import { BASE_URL } from "../utils/constants";

const EditUser = ({ userDetails }) => {
  const [user, setUser] = useState(userDetails);
  const [showAlert, setShowAlert] = useState(false);

  const payload = {
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    about: user.about,
    photoUrl: user.photoUrl,
  };

  const dispatch = useDispatch();

  const handleProfile = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className=" flex flex-col">
      <div className="flex justify-center my-8 mb-20">
        <div className="card card-border bg-base-200 w-96 mr-4">
          <div className="card-body flex items-center">
            <h2 className="card-title">
              Welcome, {userDetails?.firstName + " " + userDetails?.lastName}
            </h2>
            <div className="w-full">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
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
                  className="input"
                  value={user.lastName || ""}
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                  placeholder="Type here"
                />
                <p className="label"></p>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <textarea
                  className="textarea"
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
                  className="input"
                  value={user.age || ""}
                  onChange={(e) => setUser({ ...user, age: e.target.value })}
                  placeholder="Type here"
                />
                <p className="label"></p>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  value={user.gender}
                  className="select"
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                >
                  <option disabled={true}>Select your gender</option>
                  <option>M</option>
                  <option>F</option>
                  <option>Others</option>
                </select>
                <p className="label"></p>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL</legend>
                <input
                  type="text"
                  className="input"
                  value={user.photoUrl || ""}
                  onChange={(e) =>
                    setUser({ ...user, photoUrl: e.target.value })
                  }
                  placeholder="Type here"
                />
                <p className="label"></p>
              </fieldset>
            </div>
            <p className="text-red-500"></p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={handleProfile}>
                Update Profile
              </button>
            </div>
          </div>
        </div>
        <div className="card bg-base-200 w-96 shadow-sm p-2 h-full">
          <figure>
            <img src={userDetails.photoUrl} className="w-70 h-96" alt="User" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {userDetails.firstName + " " + userDetails.lastName} -{" "}
              {userDetails.gender}
            </h2>
            <div className="space-y-2">
              <p>{userDetails.about}</p>
              <p>Age: {userDetails.age}</p>
            </div>
          </div>
        </div>
      </div>
      {showAlert && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
