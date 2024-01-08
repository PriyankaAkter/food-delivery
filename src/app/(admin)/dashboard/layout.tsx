import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SideBar } from "./components/shared/SideBar";
import MobileSideBar from "./components/shared/sidebar/MobileSideBar";


export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <div className="2xl:flex">
    {/* <SideBar /> */}
    <MobileSideBar />
    <div className="flex-1">{children}</div>
    <ToastContainer />
  </div>
  );
}
