import { useState, forwardRef } from "react";
import Draggable from "react-draggable";

interface MemeCanvasProps {
  backgroundImage: string;
  topText: string;
  bottomText: string;
  topTextColor: string;
  bottomTextColor: string;
  onTextChange: (position: "top" | "bottom", text: string) => void;
}

export const MemeCanvas = forwardRef<HTMLDivElement, MemeCanvasProps>(
  (
    {
      backgroundImage,
      topText,
      bottomText,
      topTextColor,
      bottomTextColor,
      onTextChange,
    },
    ref
  ) => {
    const [textSizes, setTextSizes] = useState({
      top: 40,
      bottom: 40,
    });

    const textStyle = (color: string, size: number) => ({
      color,
      fontWeight: 900,
      textShadow: `
      -2px -2px 0 #000,  
       2px -2px 0 #000,
      -2px  2px 0 #000,
       2px  2px 0 #000,
       0 4px 8px rgba(0,0,0,0.5)
    `,
      WebkitTextStroke: "2px black",
      textTransform: "uppercase" as const,
      textAlign: "center" as const,
      fontSize: `${size}px`,
      lineHeight: 1.2,
      outline: "none",
      background: "transparent",
      padding: "8px",
      width: "300px",
      display: "block",
      cursor: "move",
      userSelect: "none" as const,
    });

    return (
      <div className="space-y-4">
        {/* Size Controls */}
        <div className="flex gap-8 bg-gray-700 p-4 rounded-lg">
          <div className="flex-1 space-y-2">
            <label className="text-white text-sm">Top Text Size</label>
            <input
              type="range"
              min="20"
              max="80"
              value={textSizes.top}
              onChange={(e) =>
                setTextSizes((prev) => ({
                  ...prev,
                  top: Number(e.target.value),
                }))
              }
              className="w-full accent-blue-500"
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-white text-sm">Bottom Text Size</label>
            <input
              type="range"
              min="20"
              max="80"
              value={textSizes.bottom}
              onChange={(e) =>
                setTextSizes((prev) => ({
                  ...prev,
                  bottom: Number(e.target.value),
                }))
              }
              className="w-full accent-blue-500"
            />
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={ref}
          className="relative rounded-xl overflow-hidden bg-gray-700 meme-canvas"
        >
          <div className="aspect-square relative">
            <img
              src={backgroundImage}
              alt="Meme"
              className="absolute inset-0 w-full h-full object-contain bg-black"
            />

            <Draggable bounds="parent">
              <div
                className="absolute"
                style={{
                  top: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => onTextChange("top", e.target.value)}
                  placeholder="Top Text"
                  style={textStyle(topTextColor, textSizes.top)}
                />
              </div>
            </Draggable>

            <Draggable bounds="parent">
              <div
                className="absolute"
                style={{
                  bottom: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => onTextChange("bottom", e.target.value)}
                  placeholder="Bottom Text"
                  style={textStyle(bottomTextColor, textSizes.bottom)}
                />
              </div>
            </Draggable>
          </div>
        </div>
      </div>
    );
  }
);

MemeCanvas.displayName = "MemeCanvas";
