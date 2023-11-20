import { items } from "../data";
import { IoIosArrowForward } from "react-icons/io";
import Card from "../../shared/Card";

const HomeFoodRecommendations = () => {
    const sliceItems1 = items.slice(4,8)
  return (
    <div className="py-16 container">
      <div className="flex  justify-between items-center mb-5">
        <h5 className="mb-5 font-bold">Recommended Food Items</h5>
        <div className="text-[#F29F05] flex gap-2  items-center">
          <p className="font-bold">See More</p>
          <IoIosArrowForward className="w-5 h-5" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 rounded-[10px] ">
        {sliceItems1.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  )
}

export default HomeFoodRecommendations