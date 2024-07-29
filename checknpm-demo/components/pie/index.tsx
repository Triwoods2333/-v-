import React from "react";
import { VChart } from "@visactor/react-vchart";

interface Props {
  data: { type: string; value: number }[];
}

const donutChart = {
  title: {
    visible: true,
    text: "Pie chart",
    subtext: "软件包检测饼状统计图",
  },
  legends: {
    visible: true,
    orient: "right",
  },
};

const PieChart: React.FC<Props> = ({ data }) => {
  const commonSpec = {
    type: "pie",
    data: [
      {
        id: "id0",
        values: data,
      },
    ],
    valueField: "value",
    categoryField: "type",
    label: {
      visible: true,
    },
    tooltip: {
      mark: {
        content: [
          {
            key: (datum: any) => datum["type"],
            value: (datum: any) => datum["value"] + "%",
          },
        ],
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <VChart
        spec={{
          ...commonSpec,
          ...donutChart,
        }}
        option={{ mode: "desktop-browser" }}
        style={{ height: 440, width: 680 }}
      />
    </div>
  );
};

export default PieChart;
