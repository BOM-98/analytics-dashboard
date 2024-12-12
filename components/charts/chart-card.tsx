import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactECharts from "echarts-for-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";

interface ChartDataItem {
  name?: string;
  value?: number;
  [key: string]: any;
}

interface ChartCardProps {
  data: {
    stats: {
      [key: string]: ChartDataItem[];
    };
    title: string;
    description?: string;
    options?: {
      chartType?: "pie" | "bar";
      [key: string]: any;
    };
  };
  width?: string;
  height?: string;
}

function formatDescription(desc: string): string[] {
  const words = desc.split(" ");
  const lines: string[] = [];
  for (let i = 0; i < words.length; i += 6) {
    lines.push(words.slice(i, i + 6).join(" "));
  }
  return lines;
}

const ChartCard: React.FC<ChartCardProps> = ({ data, width = "100%", height = "350px" }) => {
  // Use the first key in stats by default if multiple exist
  const statsKey = Object.keys(data.stats)[0];
  const chartData = data.stats[statsKey];

  // Determine chart type (default to pie)
  const chartType = data.options?.chartType || "pie";

  // Default options for pie chart
  const defaultPieOptions = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      bottom: "bottom",
      data: chartData.map((item) => item.name),
    },
    series: [
      {
        name: "Data Series",
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
        data: chartData.map((item) => ({
          value: item.value,
          name: item.name,
        })),
      },
    ],
  };

  // Default options for bar chart
  const defaultBarOptions = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (params: any) => {
        const axisValue = params[0].axisValue;
        const detailLines = params.map((item: any) => `${item.marker}${item.seriesName}: ${item.value}`).join("<br/>");
        return `<strong>${axisValue}</strong><br/>${detailLines}`;
      },
    },
    legend: {
      data: Object.keys(chartData[0]).filter((key) => key !== "hour" && key !== "name"),
    },
    xAxis: {
      type: "category",
      data: chartData.map((item) => item.hour || item.name),
    },
    yAxis: {
      type: "value",
    },
    series: Object.keys(chartData[0])
      .filter((key) => key !== "hour" && key !== "name")
      .map((key) => ({
        name: key,
        type: "bar",
        stack: "total",
        data: chartData.map((item) => item[key]),
      })),
  };

  // Choose default options based on chart type
  const defaultOptions = chartType === "pie" ? defaultPieOptions : defaultBarOptions;

  // Merge default options with any custom options provided
  const mergedOptions = {
    ...defaultOptions,
    ...data.options,
    series: (defaultOptions.series || []).map((seriesItem: any, index: number) => ({
      ...seriesItem,
      ...(data.options?.series?.[index] || {}),
    })),
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        {/* Left side: Title */}
        <CardTitle>{data.title}</CardTitle>
        {/* Right side: Tooltip icon */}
        {data.description && (
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button type="button" className="text-gray-500 hover:text-gray-700" aria-label="Chart info">
                  <Info className="h-4 w-4" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content className="p-2 bg-white rounded shadow-md text-sm whitespace-nowrap">
                <Tooltip.Arrow className="fill-white" />
                {formatDescription(data.description).map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        )}
      </CardHeader>
      <CardContent>
        <div style={{ width: width, height: height }}>
          <ReactECharts
            option={mergedOptions}
            style={{ height: "100%", width: "100%" }}
            opts={{ renderer: "canvas" }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
