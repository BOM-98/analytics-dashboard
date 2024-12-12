"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactECharts from "echarts-for-react";

const data = [
  { name: "Viewed", value: 400 },
  { name: "Clicked", value: 300 },
  { name: "Interacted", value: 200 },
  { name: "Converted", value: 100 },
];

export function AdEngagement() {
  const cardTitle = "Ad Engagement Breakdown";
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      bottom: "bottom",
      data: data.map((item) => item.name),
    },
    series: [
      {
        name: "Engagement",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: "{b}: {d}%",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "14",
            fontWeight: "bold",
          },
        },
        data: data.map((item) => ({
          value: item.value,
          name: item.name,
        })),
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ad Engagement Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: "300px" }}>
          <ReactECharts option={option} style={{ height: "100%", width: "100%" }} opts={{ renderer: "svg" }} />
        </div>
      </CardContent>
    </Card>
  );
}
