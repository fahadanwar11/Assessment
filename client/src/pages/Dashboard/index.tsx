import { userInfoData } from "@/utils/Interfaces";
import { useSelector } from "react-redux";
import AdminPanel from "./Components/AdminPanel";
import UserPanel from "./Components/UserPanel";

function Dashboard() {
  const { role, userId } = useSelector((state: userInfoData) => state.auth);
  return (
    <div>
      {role === "Super Admin" || role === "Admin" ? (
        <AdminPanel role={role} />
      ) : (
        <UserPanel userId={userId} />
      )}
    </div>
  );
}

export default Dashboard;
