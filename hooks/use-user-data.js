// Custom User Data Hook

import { useEffect, useState } from "react";

const useUserData = () => {
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [initials, setInitials] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const firstName = user.firstName || "";
        const lastName = user.lastName || "";
        const userInitials = (firstName[0] || "") + (lastName[0] || "");
        setInitials(userInitials.toUpperCase());
        setFirstName(firstName);
        setLastName(lastName);
        setUserRole(user.role);
        setUserId(user.userId);
      }
    }
  }, []);

  return { userRole, userId, firstName, lastName, initials };
};

export default useUserData;