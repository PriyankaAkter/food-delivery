import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ColumnDef } from '@tanstack/react-table';
import { RestaurantColumnType } from '@/app/types/type';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import Image from 'next/image';
import BasicTable1 from '@/app/(admin)/dashboard/components/shared/BasicTable1';
import { toast } from 'react-toastify';



const fetchDeliveryMan = async () => {
    const deliverymansData = await axios.get(
      "http://localhost:3000/api/user"
    );
    return deliverymansData.data;
  };
const RestaurantDataTable = () => {
    const queryClient = useQueryClient();
    const { data:deliveryman, isLoading, error } = useQuery({
        queryKey: ["deliveryman"],
        queryFn: () => fetchDeliveryMan(),
      });
      
      
      if (isLoading) {
        return <h6>Loading...</h6>;
      }
      if (error) return "An error has occurred: " + error.message;
      console.log({ deliveryman });
     
const fetchDeli = deliveryman?.users?.filter((d:any)=>d?.role=="DELIVERY_MAN")
console.log({ fetchDeli });


//single data delete
const DeleteRestaurant = async (data:RestaurantColumnType) => {
  // console.log({data});
  
    try {
      const deleteData = await axios.delete(`http://localhost:3000/api/user/${data?.id}`)
      // console.log("Delete Response:", deleteData.data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success('Delivery man deleted successfully')
      return deleteData?.data
    } catch (error) {
      console.error(error)
      toast.error("Error Occur!");
    }
  };


const columns: ColumnDef<RestaurantColumnType>[] = [
  
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    id: "image",
    header: "image",
    cell: ({row}) => {
      console.log(row.original);
      if(!row.original?.image) return ""
      return (
        <div className="w-16 h-16 relative"> 
          <Image src={row.original?.image} alt="restaurant" fill />
        </div>
      );
    },
  },
  
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Phone",
    accessorKey: "phone",
    cell: ({row}) => {
      // console.log(row.original);
      if(!row.original?.phone) return ""
      return (
        <div> 
          {row.original?.phone}
        </div>
      );
    },
  },
  {
    id: "createdAt",
    header: "Joined Date",
    cell: ({ row }) => {
      const createdAt = row?.original?.createdAt as string | undefined;
      if (createdAt) {
        return <p>{new Date(createdAt).toLocaleString()}</p>;
      } else {
        return <span>No joined date available</span>;
      }
    },
  },

  {
    id: "action",
    header: "ACTION",
    cell: ({row}) => {
      // console.log(row?.original);
      
      return (
        <div className="flex gap-5 justify-center">
          {row?.original && (
            <button onClick={() => DeleteRestaurant(row.original)} className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]">
              <RiDeleteBin5Fill className="text-[#F57213] w-4 h-4" />
            </button>
          )}
        </div>
      );
    },
  },
];

  return (
    <div
      className="overflow-x-auto rounded-[10px] my-4 p-4 shadow-md"
      style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
    >
      <div className="flex justify-between items-center py-8 px-6">
        <h6>All Delivery Mans</h6>
        <div>
         

             {/* <DialogDemo
            className="bg-[#F57213] hover:bg-[#F57213] text-white"
            button1="Add New"
            title="Add Restaurant"
            icon={<AiOutlinePlus className="w-3 h-3 text-white" />}
            update="save"
          />   */}
       
        </div>
      </div>
      
      <BasicTable1 data={fetchDeli} columns={columns} />
      
    </div>
  )
}

export default RestaurantDataTable