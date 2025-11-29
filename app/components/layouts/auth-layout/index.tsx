import { Outlet } from "react-router";
// import Logo from "~/components/logo";

const LayoutAuth = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-2">
        <span className="flex items-center self-center">
          {/* <Logo size="large" /> */}Logo
        </span>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutAuth;
