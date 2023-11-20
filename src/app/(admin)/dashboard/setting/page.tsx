
import Settings from "./components/Settings";
import { SideBar } from "../components/shared/SideBar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Page = () => {
  
  return (
    <div className="flex">
      <SideBar />
      <div className="w-[1460px]">
        <Settings />
      </div>
    </div>
  );
};

export default Page;
