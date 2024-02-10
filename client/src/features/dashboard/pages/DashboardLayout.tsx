import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../services";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ firstName: string }>({ firstName: "" });

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      if (fetchedUser) {
        setUser(fetchedUser);
      } else {
        return navigate("/");
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>Hi {user?.firstName || "Default User"}</div>
      <button>Logout</button>
      <Outlet />
    </div>
  );
}
