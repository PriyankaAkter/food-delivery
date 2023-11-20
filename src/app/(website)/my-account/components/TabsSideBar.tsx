
const TabsSideBar = ({tab,setTab}:any) => {
  return (
    <div
      className="w-[300px] bg-white h-fit rounded-md"
      style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
    >
      <div
        onClick={() => setTab(1)}
        className={
          tab == 1
            ? "p-4 bg-[#f57213]  text-white text-xl font-medium cursor-pointer"
            : "p-4 text-black text-xl font-medium cursor-pointer "
        }
      >
        DASHBOARD
      </div>

      <div
        onClick={() => setTab(2)}
        className={
          tab == 2
            ? "p-4 bg-[#f57213]  text-white text-xl font-medium cursor-pointer"
            : "p-4 text-black text-xl font-medium cursor-pointer "
        }
      >
        ORDERS
      </div>

      {/* <div
        onClick={() => setTab(3)}
        className={
          tab == 3
            ? "p-4 bg-[#f57213]  text-white text-xl font-medium cursor-pointer"
            : "p-4 text-black text-xl font-medium cursor-pointer "
        }
      >
        ADDRESSES
      </div> */}
      <div
        onClick={() => setTab(3)}
        className={
          tab == 4
            ? "p-4 bg-[#f57213]  text-white text-xl font-medium cursor-pointer"
            : "p-4 text-black text-xl font-medium cursor-pointer "
        }
      >
        ACCOUNT DETAILS
      </div>
      <div
        onClick={() => setTab(4)}
        className={
          tab == 5
            ? "p-4 bg-[#f57213]  text-white text-xl font-medium cursor-pointer"
            : "p-4 text-black text-xl font-medium cursor-pointer "
        }
      >
        LOGOUT
      </div>
    </div>
  );
};

export default TabsSideBar;
