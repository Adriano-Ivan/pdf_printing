import { useState } from "react";
import {
  Button,
  CloseButton,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import "./styles.css";

interface ConfigModalProps {
  isConfigModalOpen: boolean;
  setIsConfigModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMenuModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsToShowGraph?: React.Dispatch<React.SetStateAction<boolean>>;
  setGraphWidth?: React.Dispatch<React.SetStateAction<number>>;
  setGraphHeigth?: React.Dispatch<React.SetStateAction<number>>;
  setGraphTitle?: React.Dispatch<React.SetStateAction<string>>;
  setIsToShowBorderInTheGraph?: React.Dispatch<React.SetStateAction<boolean>>;
  setWeightToGraphBorder: React.Dispatch<React.SetStateAction<number>>;
  configType: string;
}

const ConfigModal = ({
  isConfigModalOpen,
  setIsConfigModalOpen,
  configType,
  setIsToShowGraph,
  setGraphWidth,
  setGraphHeigth,
  setIsMenuModalOpen,
  setGraphTitle,
  setIsToShowBorderInTheGraph,
  setWeightToGraphBorder,
}: ConfigModalProps) => {
  const [widthConfig, setWidthConfig] = useState(10);
  const [heightConfig, setHeightConfig] = useState(10);
  const [titleConfig, setTitleConfig] = useState("");
  const [isToShowBorderConfig, setIsToShowBorderConfig] = useState(false);
  const [weightToBorderConfig, setWeightToBorderConfig] = useState(1);

  const renderTitle = () => {
    if (configType.toLowerCase().trim() === "graph") {
      return "Configure o gráfico";
    }

    if (configType.toLowerCase().trim() === "uploaded-image") {
      return "Configure a imagem";
    }

    return "";
  };

  const renderTextSaveConfigButton = () => {
    if (configType.toLocaleLowerCase().trim() === "graph") {
      return "Salvar configurações e exibir gráfico";
    }

    if (configType.toLocaleLowerCase().trim() === "uploaded-image") {
      return "Salvar configurações e exibir imagem";
    }

    return "";
  };

  const isToShowWarningAboutWrongConfig = () => {
    return (
      widthConfig < 10 ||
      widthConfig > 100 ||
      heightConfig < 10 ||
      heightConfig > 100
    );
  };

  const conditionsAreCorrect = () => {
    return (
      configType.toLocaleLowerCase().trim() === "graph" &&
      widthConfig >= 10 &&
      widthConfig <= 100 &&
      heightConfig >= 10 &&
      widthConfig <= 100
    );
  };

  const saveConfig = () => {
    setIsConfigModalOpen(false);
    setIsMenuModalOpen(false);

    if (
      conditionsAreCorrect() &&
      setGraphWidth &&
      setIsToShowGraph &&
      setGraphHeigth &&
      setGraphTitle &&
      setIsToShowBorderInTheGraph
    ) {
      setGraphWidth(widthConfig);
      setGraphHeigth(heightConfig);
      setGraphTitle(titleConfig);
      setWeightToGraphBorder(weightToBorderConfig);
      setIsToShowBorderInTheGraph(isToShowBorderConfig);
      setIsToShowGraph(true);
    }

    if (isToShowWarningAboutWrongConfig()) {
      alert("A largura deve estar entre 10 e 100");
    }
  };

  const defineWidth = (e: any) => {
    if (Number(e.target.value) > 100) {
      e.target.value = 100;
    }

    setWidthConfig(Number(e.target.value));
  };

  const defineHeight = (e: any) => {
    if (Number(e.target.value > 100)) {
      e.target.value = 100;
    }

    setHeightConfig(Number(e.target.value));
  };

  const defineTitle = (e: any) => {
    setTitleConfig(e.target.value);
  };

  const defineIsBorderOrNot = (e: any) => {
    console.log(e.target.value);
    if (e.target.value === "yes") {
      setIsToShowBorderConfig(true);
    } else if (e.target.value === "no") {
      setIsToShowBorderConfig(false);
    }
  };

  const defineWeight = (e: any) => {
    setWeightToBorderConfig(Math.abs(Number(e.target.value)));
  };

  return (
    <Modal show={isConfigModalOpen}>
      <ModalHeader>{renderTitle()}</ModalHeader>
      <ModalBody>
        <form className="container-config-options">
          <label className="config-label config-label-title">
            <span className="config-label-text">Título:</span>
            <input
              onChange={defineTitle}
              type="text"
              defaultValue={titleConfig}
              min={10}
              max={100}
            ></input>
          </label>
          <label className="config-label">
            <span className="config-label-text">Largura (% da folha):</span>
            <input
              onChange={defineWidth}
              type="number"
              defaultValue={widthConfig}
              min={10}
              max={100}
            ></input>
          </label>

          <label className="config-label">
            <span className="config-label-text">Altura (% da folha):</span>
            <input
              onChange={defineHeight}
              type="number"
              defaultValue={heightConfig}
              min={10}
              max={100}
            ></input>
          </label>

          <label className=" config-label-options-border">
            <span className="config-label-text">Deseja borda ?</span>
            <input
              onChange={defineIsBorderOrNot}
              type="radio"
              value="yes"
              name="borda_ou_nao"
            ></input>
            {"Sim"}

            <input
              onChange={defineIsBorderOrNot}
              type="radio"
              value="no"
              name="borda_ou_nao"
            ></input>
            {"Não "}
          </label>
          <label className="config-label">
            <span className="config-label-text">Espessura da borda (px):</span>
            <input
              onChange={defineWeight}
              type="number"
              defaultValue={weightToBorderConfig}
              min={1}
            ></input>
          </label>
        </form>
      </ModalBody>
      <ModalFooter>
        <CloseButton
          onClick={(e) => {
            setIsConfigModalOpen(false);
          }}
        >
          Fechar
        </CloseButton>
        <Button
          onClick={(e) => {
            saveConfig();
          }}
        >
          {renderTextSaveConfigButton()}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfigModal;
