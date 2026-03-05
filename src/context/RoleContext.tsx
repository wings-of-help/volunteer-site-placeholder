import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { UserRoleType } from "../api/types/role";

type RoleType = {
  userRole: UserRoleType | null;
  isVolunteer: boolean;
  setUserRole: (role: UserRoleType) => void;
}

export const RoleContext = createContext<RoleType | null>(null);

const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRoleType | null>("distressed");

   useEffect(() => {
    const savedRole = localStorage.getItem("role") as UserRoleType | null;
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  const setRoleHandler = (newRole: UserRoleType) => {
    localStorage.setItem("role", newRole);
    setUserRole(newRole);
  };

  const value: RoleType = {
    userRole: "distressed",
    isVolunteer: userRole === "volunteer",
    setUserRole: setRoleHandler,
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  )
}

export function useUserRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within RoleProvider");
  }
  return context;
}

export default RoleProvider