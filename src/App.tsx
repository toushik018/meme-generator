import { useState, useRef, useEffect } from "react";
import { Download, RotateCcw, Shuffle } from "lucide-react";
import * as htmlToImage from "html-to-image";
import { Controls, ImageUpload } from "./components/Controls";
import { ColorPicker } from "./components/ColorPicker";
import {
  fetchMemeTemplates,
  frames,
  heads,
  attributes,
} from "./services/imageService";
import type { MemeConfig } from "./types";

function App() {
  const [backgrounds, setBackgrounds] = useState<string[]>([]);
  const [config, setConfig] = useState<MemeConfig>({
    topText: "",
    bottomText: "",
    topTextColor: "#ffffff",
    bottomTextColor: "#ffffff",
    backgroundImage: "",
    uploadedImage: null,
    selectedFrame: frames[0].url,
    selectedHead: heads[0].url,
    selectedAttribute: attributes[0].url,
  });

  const memeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadBackgrounds = async () => {
      const templates = await fetchMemeTemplates();
      const limitedTemplates = templates.slice(0, 60);
      setBackgrounds(limitedTemplates.map((template) => template.url));
      if (limitedTemplates.length > 0) {
        setConfig((prev) => ({
          ...prev,
          backgroundImage: limitedTemplates[0].url,
        }));
      }
    };
    loadBackgrounds();
  }, []);

  const handleDownload = async () => {
    if (memeRef.current) {
      const dataUrl = await htmlToImage.toPng(memeRef.current);
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = dataUrl;
      link.click();
    }
  };

  const handleReset = () => {
    setConfig({
      topText: "",
      bottomText: "",
      topTextColor: "#ffffff",
      bottomTextColor: "#ffffff",
      backgroundImage: backgrounds[0] || "",
      uploadedImage: null,
      selectedFrame: "",
      selectedHead: "",
      selectedAttribute: "",
    });
  };

  const handleRandomize = () => {
    setConfig({
      ...config,
      backgroundImage:
        backgrounds[Math.floor(Math.random() * backgrounds.length)],
      selectedFrame: frames[Math.floor(Math.random() * frames.length)].url,
      selectedHead: heads[Math.floor(Math.random() * heads.length)].url,
      selectedAttribute:
        attributes[Math.floor(Math.random() * attributes.length)].url,
    });
  };

  return (
    <div className="min-h-screen bg-[#111] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview */}
          <div className="relative">
            <div
              ref={memeRef}
              className="aspect-square relative rounded-lg overflow-hidden"
            >
              <img
                src={config.uploadedImage || config.backgroundImage}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {config.selectedFrame && (
                <img
                  src={config.selectedFrame}
                  alt="Frame"
                  className="absolute inset-0 w-full h-full"
                />
              )}
              {config.selectedHead && (
                <img
                  src={config.selectedHead}
                  alt="Head"
                  className="absolute inset-0 w-full h-full"
                />
              )}
              {config.selectedAttribute && (
                <img
                  src={config.selectedAttribute}
                  alt="Attribute"
                  className="absolute inset-0 w-full h-full"
                />
              )}
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <input
                  type="text"
                  value={config.topText}
                  onChange={(e) =>
                    setConfig({ ...config, topText: e.target.value })
                  }
                  placeholder="Top Text"
                  className="w-full bg-transparent text-center text-4xl font-bold outline-none"
                  style={{ color: config.topTextColor }}
                />
                <input
                  type="text"
                  value={config.bottomText}
                  onChange={(e) =>
                    setConfig({ ...config, bottomText: e.target.value })
                  }
                  placeholder="Bottom Text"
                  className="w-full bg-transparent text-center text-4xl font-bold outline-none"
                  style={{ color: config.bottomTextColor }}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
              <button
                onClick={handleRandomize}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
              >
                <Shuffle className="w-5 h-5" />
                Randomize
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <ImageUpload
                onUpload={(file) =>
                  setConfig({ ...config, uploadedImage: file })
                }
              />
            </div>

            <Controls
              label="Background"
              items={backgrounds}
              value={config.backgroundImage}
              onChange={(value) =>
                setConfig({ ...config, backgroundImage: value })
              }
              type="background"
            />

            <Controls
              label="Frame"
              items={frames.map((frame) => frame.url)}
              value={config.selectedFrame}
              onChange={(value) =>
                setConfig({ ...config, selectedFrame: value })
              }
              type="frame"
            />

            <Controls
              label="Head"
              items={heads.map((head) => head.url)}
              value={config.selectedHead}
              onChange={(value) =>
                setConfig({ ...config, selectedHead: value })
              }
              type="head"
            />

            <Controls
              label="Attribute"
              items={attributes.map((attr) => attr.url)}
              value={config.selectedAttribute}
              onChange={(value) =>
                setConfig({ ...config, selectedAttribute: value })
              }
              type="attribute"
            />

            <div className="space-y-4">
              <ColorPicker
                label="Top Text"
                value={config.topTextColor}
                onChange={(color) =>
                  setConfig({ ...config, topTextColor: color })
                }
              />
              <ColorPicker
                label="Bottom Text"
                value={config.bottomTextColor}
                onChange={(color) =>
                  setConfig({ ...config, bottomTextColor: color })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
