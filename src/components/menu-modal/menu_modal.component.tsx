import { useState } from "react";
import {
  Button,
  CloseButton,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import ConfigModal from "../config-modal/config_modal.component";

interface MenuModalProps {
  isMenuModalOpen: boolean;
  setIsMenuModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsToShowGraph: React.Dispatch<React.SetStateAction<boolean>>;
  setGraphWidth: React.Dispatch<React.SetStateAction<number>>;
  setGraphHeight: React.Dispatch<React.SetStateAction<number>>;
  setGraphTitle: React.Dispatch<React.SetStateAction<string>>;
  setIsToShowBorderInTheGraph: React.Dispatch<React.SetStateAction<boolean>>;
  setWeightToGraphBorder: React.Dispatch<React.SetStateAction<number>>;
}

const MenuModal = ({
  isMenuModalOpen,
  setIsMenuModalOpen,
  setGraphWidth,
  setGraphHeight,
  setWeightToGraphBorder,
  setGraphTitle,
  setIsToShowGraph,
  setIsToShowBorderInTheGraph,
}: MenuModalProps) => {
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [configType, setConfigType] = useState("");

  const renderConfigModal = () => {
    if (isConfigModalOpen) {
      return (
        <ConfigModal
          configType={configType}
          isConfigModalOpen={isConfigModalOpen}
          setIsConfigModalOpen={setIsConfigModalOpen}
          setIsToShowGraph={setIsToShowGraph}
          setGraphWidth={setGraphWidth}
          setGraphHeigth={setGraphHeight}
          setIsMenuModalOpen={setIsMenuModalOpen}
          setIsToShowBorderInTheGraph={setIsToShowBorderInTheGraph}
          setWeightToGraphBorder={setWeightToGraphBorder}
          setGraphTitle={setGraphTitle}
        />
      );
    }
  };

  return (
    <>
      <Modal animation={false} show={isMenuModalOpen}>
        <ModalHeader>Selecione o componente que quer adicionar</ModalHeader>
        <ModalBody>
          <Button
            onClick={() => {
              setIsConfigModalOpen(true);
              setConfigType("graph");
            }}
          >
            Configurar gráfico
          </Button>
          <Button
            onClick={() => {
              setIsConfigModalOpen(true);
              setConfigType("uploaded-image");
            }}
          >
            Configurar imagem
          </Button>
        </ModalBody>
        <ModalFooter>
          <CloseButton
            onClick={() => {
              setIsMenuModalOpen(false);
            }}
          >
            Fechar
          </CloseButton>
        </ModalFooter>
      </Modal>
      {renderConfigModal()}
    </>
  );
};

export default MenuModal;
