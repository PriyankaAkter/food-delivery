import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import SideBar from "./SideBar"
import MenuBar from "./MenuBar"


const PopularFoods = () => {
  return (
    <div>
        <p className=" flex items-center gap-2 font-semibold mb-12">Home <MdOutlineKeyboardArrowRight className="w-5 h-5" /> <span className="text-[#64748B]">Our popular foods</span></p>
        <div className="flex gap-12">
            <SideBar />
            <MenuBar />
        </div>
    </div>
  )
}

export default PopularFoods