import { Outlet } from "react-router-dom";


export default function MainLayout() {
  return (
    <>
      <main className="auth">
        <Outlet />
      </main>
    </>
  );
}
