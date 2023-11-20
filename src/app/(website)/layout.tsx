// "use client";

import { Toast } from "@/components/ui/toast";
import Footer from "./components/layout/Footer/Footer";
import Navbar from "./components/layout/Navbar/Navbar";

function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
     <Navbar />
        {children}
     <Footer />
     {/* <Toast />
      */}
    </div>
  );
}

export default WebsiteLayout;
