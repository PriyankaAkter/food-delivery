import React from "react";
import DashboardDataTable from "./DashboardDataTable";
import { Restaurants } from "@/app/(admin)/dashboard/components/shared/data";
import { columns } from "./columns";

const Dashboard = () => {
  return (
    <div className="w-full">
      <h5>Overview</h5>
      <p className="mb-10">Dashboard</p>

      <DashboardDataTable data={Restaurants} columns={columns} />
    </div>
  );
};

export default Dashboard;
