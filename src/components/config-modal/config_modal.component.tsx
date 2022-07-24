import { config } from "process";
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
  configType: string;
  elementsInSheet: any[];
  setElementsInSheet: React.Dispatch<React.SetStateAction<any[]>>;
}

const ConfigModal = ({
  isConfigModalOpen,
  setIsConfigModalOpen,
  configType,
  elementsInSheet,
  setElementsInSheet,
  setIsMenuModalOpen,
}: ConfigModalProps) => {
  const [widthConfig, setWidthConfig] = useState(10);
  const [heightConfig, setHeightConfig] = useState(10);
  const [titleConfig, setTitleConfig] = useState("");
  const [isToShowBorderConfig, setIsToShowBorderConfig] = useState(true);
  const [weightToBorderConfig, setWeightToBorderConfig] = useState(1);
  const [imageFileConfig, setImageFileConfig] = useState("");
  const [borderColorConfig, setBorderColorConfig] = useState("#000000");

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
      widthConfig >= 10 &&
      widthConfig <= 100 &&
      heightConfig >= 10 &&
      widthConfig <= 100 &&
      weightToBorderConfig >= 1
    );
  };

  const returnCommonAttributes = () => {
    return {
      componentType: configType,
      width: widthConfig,
      height: heightConfig,
      title: titleConfig,
      borderWeight: weightToBorderConfig,
      isToShowBorder: isToShowBorderConfig,
      borderColor: borderColorConfig,
    };
  };

  const saveConfig = () => {
    setIsConfigModalOpen(false);
    setIsMenuModalOpen(false);

    if (conditionsAreCorrect() && configType.trim().toLowerCase() === "graph") {
      setElementsInSheet([
        ...elementsInSheet,
        {
          ...returnCommonAttributes(),
        },
      ]);
    } else if (
      conditionsAreCorrect() &&
      configType.trim().toLocaleLowerCase() === "uploaded-image"
    ) {
      setElementsInSheet([
        ...elementsInSheet,
        {
          ...returnCommonAttributes(),
          image: imageFileConfig,
        },
      ]);
    }

    if (isToShowWarningAboutWrongConfig()) {
      alert("A largura deve estar entre 10 e 100");
    }
  };

  const defineWidth = (e: any) => {
    if (Number(e.target.value) > 100) {
      e.target.value = 100;
    }

    setWidthConfig(Math.abs(Number(e.target.value)));
  };

  const defineHeight = (e: any) => {
    if (Number(e.target.value > 100)) {
      e.target.value = 100;
    }

    setHeightConfig(Math.abs(Number(e.target.value)));
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

  const defineImageFile = (e: any) => {
    const imageObject: any = e.target.files[0];
    console.log(imageObject);
    setImageFileConfig(URL.createObjectURL(imageObject));
  };

  const defineBorderColor = (e: any) => {
    const color: any = e.target.value;

    console.log(color);
    setBorderColorConfig(color);
  };
  return (
    <Modal show={isConfigModalOpen}>
      <ModalHeader>
        <h3>{renderTitle()}</h3>
      </ModalHeader>
      <ModalBody>
        <form className="container-config-options">
          {configType.trim().toLocaleLowerCase() === "uploaded-image" ? (
            <label className="config-label config-label-title">
              <span className="config-label-text">Imagem:</span>
              <input
                onChange={defineImageFile}
                type="file"
                name="image"
              ></input>
            </label>
          ) : null}

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
            <span className="config-label-text">
              Deseja exibir borda e definir cor e espessura ?
            </span>
            <br></br>
            <input
              onChange={defineIsBorderOrNot}
              type="radio"
              className={`radio-button-yes-or-not`}
              checked={isToShowBorderConfig}
              value="yes"
              name="borda_ou_nao"
            ></input>
            {"Sim"}

            <input
              onChange={defineIsBorderOrNot}
              type="radio"
              style={{ marginLeft: "40px" }}
              className={`radio-button-yes-or-not`}
              checked={!isToShowBorderConfig}
              value="no"
              name="borda_ou_nao"
            ></input>
            {"Não "}
          </label>

          {isToShowBorderConfig && (
            <>
              <label className="config-label">
                <span className="config-label-text">
                  Espessura da borda (px):
                </span>
                <input
                  onChange={defineWeight}
                  type="number"
                  defaultValue={weightToBorderConfig}
                  min={1}
                ></input>
              </label>

              <label className="config-label">
                <span className="config-label-text">Cor da borda</span>
                <input
                  onChange={defineBorderColor}
                  type="color"
                  defaultValue={borderColorConfig}
                  min={1}
                ></input>
              </label>
            </>
          )}
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
