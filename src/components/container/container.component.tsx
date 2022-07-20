import PageA4ToEdit from "../page-a4-to-edit/page_a4_to_edit.component";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import "./styles.css";
import { useState } from "react";

const Container = () => {
  const [isToShowGraph, setIsToShowGraph] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const showModal = () => {
    return (
      <Modal animation={false} show={isMenuModalOpen}>
        <ModalHeader>Selecione o que quer exibir</ModalHeader>
        <ModalBody>
          <Button
            onClick={() => {
              setIsToShowGraph(true);
            }}
          >
            Exibir gráfico
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              setIsMenuModalOpen(false);
            }}
          >
            Sair
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  return (
    <section className={"total-container"}>
      <PageA4ToEdit isToShowGraph={isToShowGraph} />
      <section className={"menu-area"}>
        <Button
          className={"button-add"}
          onClick={() => {
            setIsMenuModalOpen(true);
          }}
        >
          Adicionar
        </Button>

        <Button className={"button-download"}>Imprimir</Button>
      </section>
      {showModal()}
    </section>
  );
};

export default Container;
