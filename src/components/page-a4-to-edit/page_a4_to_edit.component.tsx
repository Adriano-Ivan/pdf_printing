import { IncomingMessage } from "http";
import React, { useRef } from "react";
import Graph from "../graph/graph.component";
import Image from "../image/image.component";

import "./styles.css";

interface PageA4ToEditProps {
  elementsInSheet: any[];
  refToPrint: React.MutableRefObject<null>;
}

const PageA4ToEdit = ({ elementsInSheet, refToPrint }: PageA4ToEditProps) => {
  return (
    <section ref={refToPrint} className={"container-page-a4-to-edit"}>
      {elementsInSheet.map((element: any, i) => {
        if (element.componentType.toLocaleLowerCase().trim() === "graph") {
          return (
            <Graph
              key={i + element.title + element.height}
              isToShowBorderInTheGraph={element.isToShowBorder}
              weightToBorder={element.borderWeight}
              graphTitle={element.title}
              graphHeight={element.height}
              graphWidth={element.width}
              borderColor={element.borderColor}
            />
          );
        } else {
          return (
            <Image
              image={element.image}
              borderColor={element.borderColor}
              imageHeight={element.height}
              imageWidth={element.width}
              imageTitle={element.title}
              isToShowBorderInTheImage={element.isToShowBorder}
              weightToBorder={element.borderWeight}
            />
          );
        }
      })}
    </section>
  );
};

export default PageA4ToEdit;
