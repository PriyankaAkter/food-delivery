'use client'
import { Card, DonutChart, Title } from "@tremor/react";

    import React from "react";
    
    const cities = [
      {
        name: "Chicken Masala",
        sales: 9800,
      },
      // ...
      {
        name: "Panir Tikka",
        sales: 1398,
      },
      {
        name: "Patty Wraps",
        sales: 1000,
      },
    ];
    
    const valueFormatter = (number:any) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;
    
    export const DonutChartUsageExample2 = () => {
    //   const [value, setValue] = React.useState(null);
      return (
        <>
          <Card className="mx-auto">
            <Title>Top 3 selling items by earing</Title>
            <DonutChart
             label= "Chicken Masala $224"
              className="p-4 w-[250px] h-[250px] "
              data={cities}
              category="sales"
              index="name"
              colors={["rose", "yellow", "orange"]}
            //   onValueChange={(v) => setValue(v)}
            />
          </Card>
          {/* <pre>{JSON.stringify(value)}</pre>  */}
        </>
      );
    };
