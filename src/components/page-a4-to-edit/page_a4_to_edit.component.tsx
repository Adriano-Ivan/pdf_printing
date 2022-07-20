import React, { useRef } from "react";
import Draggable from "react-draggable";
import Graph from "../graph/graph.component";
import "./styles.css";

interface PageA4ToEditProps {
  isToShowGraph: boolean;
}
const PageA4ToEdit = ({ isToShowGraph }: PageA4ToEditProps) => {
  return (
    <section className={"container-page-a4-to-edit"}>
      <Draggable bounds={"parent"}>
        {isToShowGraph ? <Graph /> : <p style={{ display: "none" }}>Ei</p>}
      </Draggable>
    </section>
  );
};

export default PageA4ToEdit;
