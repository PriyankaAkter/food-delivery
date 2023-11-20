import Image from "next/image"
//  type Product = {
//     id: number;
//     name: string;
//     category: string;
//     photo: JSX.Element; // Assuming it's a JSX element
//     description: string;
//     availability: string;
//     price: string;
//   }
export const products = [
    {
        id: 1,
        name: "Patty wraps",
        category: "Sandwich",
        photo: "/assests/images/home/img1.png",
        description: "Healthly & weight crontrolling snacks",
        availability: "32 in Stock",
        price: "150.00 tk",
    },
    {
        id: 2,
        name: "Veg Dosa",
        category: "North Indian Thali",
        photo: "/assests/images/home/img2.png",
        description: "Fresh vegetable & Bread",
        availability: "Out of Stock",
        price: "250.00 tk",
    },
    {
        id: 3,
        name: "Veg Dosa",
        category: "North Indian Thali",
        photo: "/assests/images/home/img3.png",
        description: "Fresh vegetable & Bread",
        availability: "Out of Stock",
        price: "250.00 tk",
    },
    {
        id: 4,
        name: "Veg Dosa",
        category: "North Indian Thali",
        photo: "/assests/images/home/img4.png",
        description: "Fresh vegetable & Bread",
        availability: "Out of Stock",
        price: "250.00 tk",
    }
]


export type Products = (typeof products)[number]
