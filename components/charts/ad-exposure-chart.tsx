import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactECharts from "echarts-for-react";

const data = [
  { hour: "12AM", display: 50, video: 30, social: 20 },
  { hour: "3AM", display: 30, video: 20, social: 10 },
  { hour: "6AM", display: 40, video: 25, social: 15 },
  { hour: "9AM", display: 100, video: 70, social: 50 },
  { hour: "12PM", display: 150, video: 100, social: 80 },
  { hour: "3PM", display: 200, video: 150, social: 100 },
  { hour: "6PM", display: 180, video: 120, social: 90 },
  { hour: "9PM", display: 130, video: 90, social: 70 },
];

export function AdExposureChart() {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["Display", "Video", "Social"],
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.hour),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Display",
        type: "bar",
        stack: "total",
        data: data.map((item) => item.display),
      },
      {
        name: "Video",
        type: "bar",
        stack: "total",
        data: data.map((item) => item.video),
      },
      {
        name: "Social",
        type: "bar",
        stack: "total",
        data: data.map((item) => item.social),
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hourly Ad Exposure</CardTitle>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "350px" }} />
      </CardContent>
    </Card>
  );
}
