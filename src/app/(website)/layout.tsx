// "use client";

import { Toast } from "@/components/ui/toast";
import Footer from "./components/layout/Footer/Footer";
import Navbar from "./components/layout/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default WebsiteLayout;
