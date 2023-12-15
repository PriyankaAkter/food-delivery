import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SideBar } from "./components/shared/SideBar";


export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <div className="flex">
    
    <div className="flex-1">{children}</div>
    <ToastContainer />

  </div>
  );
}
