"use client";
import React, { useState } from "react";
import OrdersTab from "./OrdersTab";
import TabsSideBar from "./TabsSideBar";

const Tabs = () => {
  const [tab, setTab] = useState(1);

  return (
    <div className="py-20 flex gap-10">
      <TabsSideBar tab={tab} setTab={setTab} />
      <div>
        <div>{tab == 1 && <div>Dashboard tab</div>}</div>
        <div>
          {tab == 2 && (
            <div>
              <OrdersTab />
            </div>
          )}
        </div>
        <div>{tab == 3 && <div>Address tab</div>}</div>
      </div>
    </div>
  );
};

export default Tabs;
