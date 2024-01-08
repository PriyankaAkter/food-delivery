import { AiFillStar } from "react-icons/ai";
import { items } from "../../components/views/data";
import Link from "next/link";
import { RestaurantColumnType } from "@/app/types/type";

interface RestaurantCardProps {
  item: RestaurantColumnType;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ item }) => {
  return (
    <div className="relative">
      <div
        style={{
          backgroundImage: `url(${item?.image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="w-full sm:w-[350px] h-[449px] rounded-[4px] "
      >
        <div className="bg-black bg-opacity-40 absolute top-0 left-0 w-full sm:w-[350px] h-[449px] rounded-[4px] px-6 py-7 flex flex-col justify-end  text-white gap-2">
          <Link href={`/restaurants/${item.slug}`} className="">
            {item.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
