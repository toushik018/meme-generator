import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { ControlProps } from "../types";

export const Controls: React.FC<ControlProps> = ({
  label,
  items,
  value,
  onChange,
  type = "background",
}) => {
  const currentIndex = items.indexOf(value);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    onChange(items[newIndex]);
    scrollToImage(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    onChange(items[newIndex]);
    scrollToImage(newIndex);
  };

  const scrollToImage = (index: number) => {
    const container = containerRef.current;
    if (container) {
      const imageElement = container.children[index] as HTMLElement;
      imageElement.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <span className="text-white uppercase font-bold w-32">{label}</span>
      <button
        onClick={handlePrev}
        className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      <div
        ref={containerRef}
        className="flex gap-2 overflow-x-auto p-2 flex-1 modern-scrollbar"
      >
        {items.map((item, index) => (
          <div
            key={item}
            onClick={() => onChange(item)}
            className={`w-20 h-20 flex-shrink-0 rounded-lg cursor-pointer transition-all ${
              item === value ? "ring-2 ring-blue-500 scale-110" : ""
            }`}
          >
            {type === "background" ? (
              <img
                src={item}
                alt={`Background ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div
                className="w-full h-full rounded-lg bg-center bg-cover"
                style={{ backgroundImage: `url(${item})` }}
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};
export const ImageUpload: React.FC<{
  onUpload: (file: string) => void;
}> = ({ onUpload }) => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
      <Upload className="w-5 h-5" />
      <span>Upload Image</span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />
    </label>
  );
};
