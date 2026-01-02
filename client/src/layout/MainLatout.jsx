import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
import Footer from '../components/footer/Footer'
import './Main.css'

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}
