import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const colors = ['#ff0000', '#9333ea', '#2563eb', '#06b6d4', '#22c55e', '#eab308'];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-white uppercase font-bold w-32">{label}</span>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`w-8 h-8 rounded-full transition-transform ${
              color === value ? 'scale-110 ring-2 ring-white' : ''
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};