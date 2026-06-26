import { Outlet } from "react-router-dom";
import { LeadProvider } from "../context/LeadContext";

const ProtectedLayout = () => {
  return (
    <LeadProvider>
      <Outlet />
    </LeadProvider>
  );
};

export default ProtectedLayout;