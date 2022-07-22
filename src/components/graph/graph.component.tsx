import Draggable from "react-draggable";
import ReactECharts from "echarts-for-react";

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

interface GraphProps {
  graphWidth: number;
  graphHeight: number;
  isToShowBorderInTheGraph: boolean;
  weightToBorder: number;
  graphTitle: string;
}
const Graph = ({
  graphWidth,
  graphHeight,
  isToShowBorderInTheGraph,
  weightToBorder,
  graphTitle,
}: GraphProps) => {
  const injectPointer = (e: any) => {
    e.target.style.cursor = "pointer";
  };
  return (
    <Draggable onDrag={injectPointer} bounds={"parent"}>
      <div
        style={{
          width: `${graphWidth}%`,
          backgroundColor: "#eeeeee",
          height: `${graphHeight}%`,
          border: isToShowBorderInTheGraph
            ? `${weightToBorder}px solid #000`
            : undefined,
        }}
      >
        <h2>{graphTitle}</h2>
        <ReactECharts style={{ cursor: "pointer" }} option={options} />
      </div>
    </Draggable>
  );
};

export default Graph;
