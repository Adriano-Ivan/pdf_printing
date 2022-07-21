import React, { useRef } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import ReactECharts from "echarts-for-react";
import "./styles.css";

interface PageA4ToEditProps {
  isToShowGraph: boolean;
  graphWidth: number;
  graphHeight: number;
  graphTitle: string;
  isToShowBorderInTheGraph: boolean;
  weightToBorder: number;
}

const options = {
  grid: { top: 8, right: 8, bottom: 24, left: 36 },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true,
    },
  ],
  tooltip: {
    trigger: "axis",
  },
};

const PageA4ToEdit = ({
  isToShowGraph,
  graphWidth,
  graphHeight,
  graphTitle,
  isToShowBorderInTheGraph,
  weightToBorder,
}: PageA4ToEditProps) => {
  const renderGraph = () => {
    return (
      <div
        style={{
          width: `${graphWidth}%`,
          backgroundColor: "#eeeeee",
          height: `${graphHeight}%`,
          border: isToShowBorderInTheGraph
            ? `${weightToBorder}px solid #000`
            : undefined,
        }}
        className="container-graph"
      >
        <h1>{graphTitle}</h1>
        <ReactECharts option={options} />
      </div>
    );
  };

  return (
    <section className={"container-page-a4-to-edit"}>
      <Draggable bounds={"parent"}>
        {isToShowGraph ? renderGraph() : <span></span>}
      </Draggable>
    </section>
  );
};

export default PageA4ToEdit;
