import EditUser from "./EditUser";
import { useSelector } from "react-redux";

const Profile = () => {
  const userDetails = useSelector((store) => store.user);
  return (
    userDetails && (
      <div className="flex justify-center">
        <EditUser userDetails={userDetails} />
      </div>
    )
  );
};

export default Profile;
