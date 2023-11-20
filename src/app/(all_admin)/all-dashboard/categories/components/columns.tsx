// "use client";
// import { ColumnDef} from "@tanstack/react-table";

// import { RiDeleteBin5Fill } from "react-icons/ri";
// import { BiSolidPencil } from "react-icons/bi";
// import { CategoryType} from "@/app/types/type";
// import { DialogDemo } from "./DialogDemo";
// import { AiOutlineRead } from "react-icons/ai";
// import axios from "axios";
// import { QueryClient, useQueryClient } from "@tanstack/react-query";


// const queryClient = useQueryClient();
// //get single category 

// const GetSingleCategory = async (data:CategoryType) => {
//   try {
//     const getSingleData = await axios.get(`http://localhost:3000/api/categories/${data.id}`)
//     // queryClient.invalidateQueries({ queryKey: ["categories"] });
//     return getSingleData.data
//   } catch (error) {
//     console.error(error)
//   }
// };

// //single data delete
//     const DeleteCategory = async (data:CategoryType) => {
//       try {
//         const deleteData = await axios.post(`http://localhost:3000/api/categories/${data.id}`,data)
//         QueryClient.invalidateQueries({ queryKey: ["categories"] });
//         return deleteData.data
//       } catch (error) {
//         console.error(error)
//       }
//     };

// export const columns: ColumnDef<CategoryType>[] = [
//   {
//     header: "ID",
//     accessorKey: "id",
//   },
  
//   {
//     header: "Name",
//     accessorKey: "name",
//   },
//   {
//     header: "Slug",
//     accessorKey: "slug",
//   },
 
//   {
//     id: "action",
//     header: "ACTION",
//     cell: ({row}) => {
//         // console.log(row.original.id);
        
//       return (
//         <div className="flex gap-5">
//           <button onClick={()=>GetSingleCategory(row.original)} className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]">
//             <AiOutlineRead className="text-[#F57213] w-4 h-4" />
//           </button>
//           <DialogDemo className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]" title="Update Category" update="update" icon={<BiSolidPencil className="text-[#F57213] w-5 h-5" />}  />
//           {/* <button onClick={()=>SingleCategory(row.original)}  className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]">
//             <RiDeleteBin5Fill className="text-[#F57213] w-4 h-4" />
//           </button> */}
//           <button onClick={()=>DeleteCategory(row.original)} className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]">
//             <RiDeleteBin5Fill className="text-[#F57213] w-4 h-4" />
//           </button>
//         </div>
//       );
//     },
//   },
// ];

