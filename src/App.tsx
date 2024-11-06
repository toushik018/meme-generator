import { useState, useRef, useEffect } from "react";
import { Download, RotateCcw, Shuffle } from "lucide-react";
import * as htmlToImage from "html-to-image";
import { ImageUpload } from "./components/Controls";
import { ColorPicker } from "./components/ColorPicker";
import { ImageCarousel } from "./components/ImageCarousel";
import { fetchMemeTemplates, type MemeTemplate } from "./services/imageService";
import type { MemeConfig } from "./types";
import { ImageGrid } from "./components/ImageGrid";
import { MemeCanvas } from "./components/MemeCanvas";

function App() {
  const [memeTemplates, setMemeTemplates] = useState<MemeTemplate[]>([]);
  const [config, setConfig] = useState<MemeConfig>({
    topText: "",
    bottomText: "",
    topTextColor: "#ffffff",
    bottomTextColor: "#ffffff",
    backgroundImage: "",
    uploadedImage: null,
    selectedFrame: "",
    selectedHead: "",
    selectedAttribute: "",
  });

  const memeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMemeTemplates = async () => {
      const templates = await fetchMemeTemplates();
      setMemeTemplates(templates);
      if (templates.length > 0) {
        setConfig((prev) => ({
          ...prev,
          backgroundImage: templates[0].url,
        }));
      }
    };
    loadMemeTemplates();
  }, []);

  const handleDownload = async () => {
    const element = document.querySelector(".meme-canvas");
    if (element) {
      try {
        const dataUrl = await htmlToImage.toPng(element as HTMLElement);
        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }
  };

  const handleReset = () => {
    setConfig({
      topText: "",
      bottomText: "",
      topTextColor: "#ffffff",
      bottomTextColor: "#ffffff",
      backgroundImage: memeTemplates[0]?.url || "",
      uploadedImage: null,
      selectedFrame: "",
      selectedHead: "",
      selectedAttribute: "",
    });
  };

  const handleRandomize = () => {
    const randomTemplate =
      memeTemplates[Math.floor(Math.random() * memeTemplates.length)];
    setConfig((prev) => ({
      ...prev,
      backgroundImage: randomTemplate?.url || prev.backgroundImage,
    }));
  };

  const handleTextChange = (position: "top" | "bottom", text: string) => {
    setConfig((prev) => ({
      ...prev,
      [position === "top" ? "topText" : "bottomText"]: text,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Meme Generator
        </h1>

        {/* Editor and Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Preview */}
          <div className="relative bg-gray-800 p-6 rounded-2xl shadow-xl">
            <MemeCanvas
              ref={memeRef}
              backgroundImage={config.uploadedImage || config.backgroundImage}
              topText={config.topText}
              bottomText={config.bottomText}
              topTextColor={config.topTextColor}
              bottomTextColor={config.bottomTextColor}
              onTextChange={handleTextChange}
            />

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
              <button
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
              <button
                onClick={handleRandomize}
                className="flex-1 flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <Shuffle className="w-5 h-5" />
                Randomize
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl space-y-8">
            <div className="flex gap-4">
              <ImageUpload
                onUpload={(file) =>
                  setConfig({ ...config, uploadedImage: file })
                }
              />
            </div>

            <ImageCarousel
              label="Meme Templates"
              images={memeTemplates}
              selectedImage={config.backgroundImage}
              onSelect={(url) => setConfig({ ...config, backgroundImage: url })}
            />

            <div className="space-y-6">
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

        {/* Template Gallery */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Template Gallery
          </h2>
          <ImageGrid
            images={memeTemplates}
            selectedImage={config.backgroundImage}
            onSelect={(url) => setConfig({ ...config, backgroundImage: url })}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
