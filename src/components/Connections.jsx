import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/slices/connectionSlice";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const showProfile = () => {};

  const showChat = (id) => {
    navigate(`/chat/${id}`);
  };

  if (!connections || connections.length === 0) {
    return (
      <div>
        <h3>No connections found!</h3>
      </div>
    );
  }

  return (
    connections && (
      <div className="mb-25">
        {connections.map((connection) => {
          return (
            <div
              key={connection._id}
              className="flex justify-between w-1/2 mx-auto border border-amber-300 my-8 py-2 px-5 rounded-2xl transition
                        duration-300 hover:shadow-2xl hover:scale-[1.02]"
            >
              <div className="flex flex-1 items-center gap-10">
                <img
                  src={connection.photoUrl}
                  alt="Profile Photo"
                  className="w-24 h-24 rounded-full object-cover border-2 border-amber-300"
                />
                <div>
                  <h2 className="font-semibold text-lg">
                    {connection.firstName} {connection.lastName}
                  </h2>
                  <p className="text-gray-400">
                    {connection.gender} • {connection.age} years
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-1/3 items-start justify-center">
                <p className="text-gray-300">{connection.about}</p>
                <div className="flex gap-2">
                  <button
                    className="btn btn-outline btn-sm mt-3"
                    onClick={showProfile}
                  >
                    View Profile
                  </button>
                  <button
                    className="btn btn-outline btn-sm mt-3"
                    onClick={() => showChat(connection._id)}
                  >
                    View Chat
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Connections;
