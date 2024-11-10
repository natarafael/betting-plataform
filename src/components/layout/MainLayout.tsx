import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <>
      {/* Main Content */}
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </>
  );
};
