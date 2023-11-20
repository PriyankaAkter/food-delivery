import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log({ session });
  //   if(session?.user){
  //     return <div>

  //     </div>
  //   }
  return (
    <div className="container">
      {session?.user ? (
        <div>
          <h6>Email of a username: {session?.user?.email}</h6>
          <h6>Email of a username: {session?.user?.username}</h6>
        </div>
      ):(
        <h6>Please Login </h6>
      )}
    </div>
  );
};

export default Page;
