import { ProductType } from "@/app/types/type";

const getCart = (): ProductType[] => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const data = localStorage.getItem("cart");
      return data ? JSON.parse(data) : [];
    } else {
      return [];
    }
  };
  
  export default getCart;
  


  