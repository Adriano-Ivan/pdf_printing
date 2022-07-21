import PageA4ToEdit from "../page-a4-to-edit/page_a4_to_edit.component";
import { Button } from "react-bootstrap";
import "./styles.css";
import { useState } from "react";
import MenuModal from "../menu-modal/menu_modal.component";

const Container = () => {
  const [isToShowGraph, setIsToShowGraph] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [graphWidth, setGraphWidth] = useState(50);
  const [graphHeight, setGraphHeight] = useState(30);
  const [graphTitle, setGraphTitle] = useState("");
  const [isToShowBorderInTheGraph, setIsToShowBorderInTheGraph] =
    useState(false);
  const [weightToBorder, setWeightToGraphBorder] = useState(1);

  const showModal = () => {
    return (
      <MenuModal
        isMenuModalOpen={isMenuModalOpen}
        setGraphTitle={setGraphTitle}
        setIsMenuModalOpen={setIsMenuModalOpen}
        setIsToShowGraph={setIsToShowGraph}
        setIsToShowBorderInTheGraph={setIsToShowBorderInTheGraph}
        setGraphWidth={setGraphWidth}
        setWeightToGraphBorder={setWeightToGraphBorder}
        setGraphHeight={setGraphHeight}
      />
    );
  };

  return (
    <section className={"total-container"}>
      <PageA4ToEdit
        weightToBorder={weightToBorder}
        isToShowBorderInTheGraph={isToShowBorderInTheGraph}
        graphTitle={graphTitle}
        graphWidth={graphWidth}
        graphHeight={graphHeight}
        isToShowGraph={isToShowGraph}
      />
      <section className={"menu-area"}>
        <Button
          className={"button-add"}
          onClick={() => {
            setIsMenuModalOpen(true);
          }}
        >
          Adicionar componente
        </Button>

        <Button variant="success" className={"button-download"}>
          Gerar PDF
        </Button>
      </section>
      {showModal()}
    </section>
  );
};

export default Container;
