import React, { useState } from "react";
import Draggable from "react-draggable";

interface DraggableTextProps {
  text: string;
  onTextChange: (text: string) => void;
  textColor: string;
  fontSize: number;
  position: "top" | "bottom";
}

export const DraggableText: React.FC<DraggableTextProps> = ({
  text,
  onTextChange,
  textColor,
  fontSize,
  position,
}) => {
  const [textSize, setTextSize] = useState(fontSize);

  return (
    <Draggable
      bounds="parent"
      defaultPosition={{ 
        x: 0, 
        y: position === "top" ? 20 : 500 
      }}
      grid={[5, 5]} // Snap to grid for smoother movement
    >
      <div className="absolute left-0 right-0 cursor-move">
        <input
          type="text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={`${position === "top" ? "Top" : "Bottom"} Text`}
          className="w-full bg-transparent text-center outline-none placeholder-gray-300/50"
          style={{
            color: textColor,
            fontSize: `${textSize}px`,
            fontWeight: 900,
            textShadow: `
              -2px -2px 0 #000,  
               2px -2px 0 #000,
              -2px  2px 0 #000,
               2px  2px 0 #000,
               0 4px 8px rgba(0,0,0,0.5)
            `,
            WebkitTextStroke: "2px black",
            cursor: "move",
            userSelect: "none",
            textTransform: "uppercase",
            letterSpacing: "1px",
            padding: "0.5rem",
            lineHeight: "1.2",
            maxWidth: "100%",
            transition: "font-size 0.2s ease"
          }}
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
          <button
            onClick={() => setTextSize(prev => Math.min(prev + 4, 80))}
            className="bg-gray-800/80 p-1 rounded-full hover:bg-gray-700"
          >
            <span className="text-white text-xs">+</span>
          </button>
          <button
            onClick={() => setTextSize(prev => Math.max(prev - 4, 20))}
            className="bg-gray-800/80 p-1 rounded-full hover:bg-gray-700"
          >
            <span className="text-white text-xs">-</span>
          </button>
        </div>
      </div>
    </Draggable>
  );
};
