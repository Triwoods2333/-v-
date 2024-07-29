import React, { useState, useCallback } from "react";
import { VChart } from "@visactor/react-vchart";

const basicSpec = {
  type: "radar",
  data: [
    {
      id: "radarData",
      values: [
        { key: "Strength", value: 5 },
        { key: "Speed", value: 5 },
        { key: "Shooting", value: 3 },
        { key: "Endurance", value: 5 },
        { key: "Precision", value: 5 },
        { key: "Growth", value: 5 },
      ],
    },
  ],
  categoryField: "key",
  valueField: "value",
  point: { visible: true },
  area: { visible: true },
  axes: [
    {
      orient: "radius", // radius axis
      zIndex: 100,
      min: 0,
      max: 8,
      domainLine: { visible: false },
      label: {
        visible: true,
        space: 0,
        style: { textAlign: "center", stroke: "#fff", lineWidth: 4 },
      },
      grid: { smooth: false },
    },
    {
      orient: "angle", // angle axis
      zIndex: 50,
      tick: { visible: false },
      domainLine: { visible: false },
      label: { space: 20 },
    },
  ],
};

const groupSpec = {
  type: "radar",
  data: [
    {
      values: [
        [45, 61, 92, 57, 46, 36, 33, 63, 57, 53, 69, 40],
        [31, 39, 81, 39, 64, 21, 58, 72, 47, 37, 80, 74],
        [90, 95, 62, 52, 110, 87, 80, 69, 74, 84, 94, 23],
      ].reduce((acc, cur, index) => {
        const type = ["npm", "pypi","total"];
        const month = [
          "Jan.",
          "Feb.",
          "Mar.",
          "Apr.",
          "May.",
          "Jun.",
          "Jul.",
          "Aug.",
          "Sep.",
          "Oct.",
          "Nov.",
          "Dec.",
        ];
        const result = cur.map((item, innerIndex) => ({
          month: month[innerIndex],
          value: item,
          type: type[index],
        }));
        return acc.concat(result);
      }, []),
    },
  ],
  categoryField: "month",
  valueField: "value",
  seriesField: "type",
  stack: true,
  area: { visible: true },
  legends: { visible: true, orient: "right" },
};

export default function () {
  return (
    <>
      <section>
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-4">
          <div className="mb-8 text-center md:mb-12 ">
            <h2 className="text-3xl font-bold md:text-5xl text-primary">
              从各语言软件包检测出的恶意包数量对比
            </h2>
          </div>
        </div>
      </section>
      <div className=" max-w-xl mx-auto flex items-center">
        <div style={{ height: 440 }}>
          <VChart spec={groupSpec} option={{ mode: "desktop-browser" }} />
        </div>
      </div>
    </>
  );
}
