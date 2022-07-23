import Draggable from "react-draggable";

interface ImageProps {
  imageWidth: number;
  imageHeight: number;
  isToShowBorderInTheImage: boolean;
  weightToBorder: boolean;
  imageTitle: string;
  borderColor: string;
  image: string;
}
const Image = ({
  imageWidth,
  imageHeight,
  isToShowBorderInTheImage,
  borderColor,
  weightToBorder,
  imageTitle,
  image,
}: ImageProps) => {
  const injectPointer = (e: any) => {
    e.target.style.cursor = "pointer";
  };
  return (
    <Draggable onDrag={injectPointer} bounds={"parent"}>
      <div
        style={{
          height: `${imageHeight}%`,
          width: `${imageWidth}%`,
          // backgroundColor: "#eeeeee",
          // border: isToShowBorderInTheImage
          //   ? `${weightToBorder}px solid #000`
          //   : undefined,
        }}
      >
        <h2 style={{ textAlign: "center" }}>{imageTitle}</h2>
        <img
          src={image}
          alt={imageTitle}
          style={{
            height: "100%",
            width: "100%",
            border: isToShowBorderInTheImage
              ? `${weightToBorder}px solid ${borderColor}`
              : undefined,
          }}
        />
      </div>
    </Draggable>
  );
};

export default Image;
