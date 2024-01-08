import Settings from "./components/Settings";
import { SideBar } from "../components/shared/SideBar";

const Page = () => {
  return (
    <div className="flex ">
      <SideBar />
      <div className="container1">
        <Settings />
      </div>
    </div>
  );
};

export default Page;
