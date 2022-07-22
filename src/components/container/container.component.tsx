import PageA4ToEdit from "../page-a4-to-edit/page_a4_to_edit.component";
import { Button } from "react-bootstrap";
import "./styles.css";
import { useRef, useState } from "react";
import MenuModal from "../menu-modal/menu_modal.component";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Container = () => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [elementsInSheet, setElementsInSheet] = useState<any[]>([]);
  const refToPrintA4 = useRef<any>();

  const showModal = () => {
    return (
      <MenuModal
        elementsInSheet={elementsInSheet}
        setElementsInSheet={setElementsInSheet}
        isMenuModalOpen={isMenuModalOpen}
        setIsMenuModalOpen={setIsMenuModalOpen}
      />
    );
  };

  const printA4Sheet = (e: any) => {
    html2canvas(refToPrintA4.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("relatory.pdf");
    });
  };
  return (
    <section className={"total-container"}>
      <PageA4ToEdit
        elementsInSheet={elementsInSheet}
        refToPrint={refToPrintA4}
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

        <Button
          variant="success"
          className={"button-download"}
          onClick={printA4Sheet}
        >
          Gerar PDF
        </Button>
      </section>
      {showModal()}
    </section>
  );
};

export default Container;
