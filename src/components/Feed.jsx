import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/slices/feedSlice";
import TinderCard from "react-tinder-card";
import { BASE_URL } from "../utils/constants";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeedData = async () => {
    if (feed) return;
    const res = await axios.get(BASE_URL + "/feed", {
      withCredentials: true,
    });
    dispatch(addFeed(res?.data?.data));
  };

  useEffect(() => {
    getFeedData();
  }, []);

  const handleSwipe = async (dir) => {
    console.log(dir);
    if (dir === "right") {
      await axios.post(
        BASE_URL + `/request/send/interested/${user._id}`,
        {},
        { withCredentials: true },
      );
    } else {
      await axios.post(
        BASE_URL + `/request/send/ignored/${user._id}`,
        {},
        { withCredentials: true },
      );
    }
  };

  if (!feed || feed.length === 0) {
    return (
      <div>
        <h1>No users found!</h1>
      </div>
    );
  }
  const user = feed[0];

  return (
    <div className="flex justify-center my-4 mb-20">
      <TinderCard
        key={user._id}
        onSwipe={(direction) => handleSwipe(direction)}
        onCardLeftScreen={() => dispatch(removeUserFromFeed(user._id))}
        preventSwipe={["up", "down"]}
      >
        <div className="card bg-base-200 w-96 shadow-sm p-2 m-2 cursor-grab">
          <figure className="pointer-events-none">
            <img
              src={user.photoUrl}
              alt="User"
              draggable={false}
              className="w-70 h-96 pointer-events-none"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {user.firstName + " " + user.lastName}
            </h2>
            <p>{user.about}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Ignore</button>
              <button className="btn btn-primary">Interested</button>
            </div>
          </div>
        </div>
      </TinderCard>
    </div>
  );
};

export default Feed;
