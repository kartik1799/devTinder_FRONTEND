import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/slices/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/accepted/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/rejected/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.error(err);
    }
  };

  if (!requests || requests.length === 0) {
    return (
      <div>
        <h3>No connections found!</h3>
      </div>
    );
  }

  return (
    requests && (
      <div>
        {requests.map((request) => {
          return (
            <div
              key={request._id}
              className="flex justify-between w-1/2 mx-auto border border-amber-300 my-8 py-2 px-5 rounded-2xl transition
                        duration-300 hover:shadow-2xl hover:scale-[1.02]"
            >
              <div className="flex flex-1 items-center gap-10">
                <img
                  src={request.fromUserId.photoUrl}
                  alt="Profile Photo"
                  className="w-24 h-24 rounded-full object-cover border-2 border-amber-300"
                />
                <div>
                  <h2 className="font-semibold text-lg">
                    {request.fromUserId.firstName} {request.fromUserId.lastName}
                  </h2>
                  <p className="text-gray-400">
                    {request.fromUserId.gender} • {request.fromUserId.age} years
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-1/5 items-start justify-between self-stretch">
                <p className="text-gray-300 line-clamp-3">
                  {request.fromUserId.about}
                </p>
                <div className="flex gap-3">
                  <button
                    className="btn btn-outline btn-sm mt-3"
                    onClick={() => handleAccept(request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-outline btn-sm mt-3"
                    onClick={() => handleReject(request._id)}
                  >
                    Reject
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

export default Requests;
