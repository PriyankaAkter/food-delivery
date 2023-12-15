
import { SideBar } from "./components/shared/SideBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <div className="flex">
    <SideBar />
    <div className="flex-1">{children}</div>
    <ToastContainer />
  </div>
  );
}
