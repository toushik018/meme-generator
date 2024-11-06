export interface MemeConfig {
  topText: string;
  bottomText: string;
  topTextColor: string;
  bottomTextColor: string;
  backgroundImage: string;
  uploadedImage: string | null;
  selectedFrame: string;
  selectedHead: string;
  selectedAttribute: string;
}

export interface ControlProps {
  label: string;
  items: string[];
  value: string;
  onChange: (value: string) => void;
  type?: 'background' | 'frame' | 'head' | 'attribute';
}