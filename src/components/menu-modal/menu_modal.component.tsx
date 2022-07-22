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
import "./styles.css";

interface MenuModalProps {
  isMenuModalOpen: boolean;
  setIsMenuModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  elementsInSheet: any[];
  setElementsInSheet: React.Dispatch<React.SetStateAction<any[]>>;
}

const MenuModal = ({
  isMenuModalOpen,
  setIsMenuModalOpen,
  elementsInSheet,
  setElementsInSheet,
}: MenuModalProps) => {
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [configType, setConfigType] = useState("");

  const renderConfigModal = () => {
    if (isConfigModalOpen) {
      return (
        <ConfigModal
          elementsInSheet={elementsInSheet}
          setElementsInSheet={setElementsInSheet}
          configType={configType}
          isConfigModalOpen={isConfigModalOpen}
          setIsConfigModalOpen={setIsConfigModalOpen}
          setIsMenuModalOpen={setIsMenuModalOpen}
        />
      );
    }
  };

  return (
    <>
      <Modal animation={false} show={isMenuModalOpen}>
        <ModalHeader className={"modal-menu-title"}>
          Selecione o componente que quer adicionar
        </ModalHeader>
        <ModalBody className="container-options-add">
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
