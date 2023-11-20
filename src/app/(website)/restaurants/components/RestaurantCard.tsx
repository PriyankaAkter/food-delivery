import { AiFillStar } from "react-icons/ai";
import { items } from "../../components/views/data";
import Link from "next/link";

const RestaurantCard = ({item}:any) => {
  // const uniqueRestaurant = new Set();

  // const unique_restaurant = items.filter((item) => {
  //   if (!uniqueRestaurant.has(item.shop)) {
  //     uniqueRestaurant.add(item.shop);
  //     return true;
  //   }
  //   return false;
  // });

//   console.log({ unique_restaurant });
  return (
    
      
        <div className="relative ">
          <div
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="w-[350px] h-[449px] rounded-[4px] "
          >
            <div className="bg-black bg-opacity-40 absolute top-0 left-0  w-[350px] h-[449px] rounded-[4px] px-6 py-7 flex flex-col justify-end  text-white gap-2">
              <Link href={`/restaurants/${item.slug}`} className="">{item.name}</Link>
              {/* <div className="flex items-center gap-2">
                <AiFillStar className="w-5 h-5 text-[#FFB93E]" />
                <p>({item.rating}) 25K</p>
              </div> */}
            </div>
          </div>
        </div>
      
    
  );
};

export default RestaurantCard;
