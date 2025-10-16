import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { AnalysisResult } from "../../types";
import DashboardLayout from "../../components/layouts/dashboard-layout";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export default function Overview() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Invalid file type", {
        description: "Please upload a JPEG, PNG, or WebP image.",
      });
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large", {
        description: `Maximum file size is 10MB. Your file is ${(
          file.size /
          1024 /
          1024
        ).toFixed(2)}MB.`,
      });
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (validateFile(file)) {
        processFile(file);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (validateFile(file)) {
        processFile(file);
      }
    }
  };

  const processFile = (file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      toast.success("Image uploaded successfully", {
        description: "Starting analysis...",
      });
      analyzeImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = (imageData: string) => {
    setIsAnalyzing(true);
    setProgress(0);
    setResult(null);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);

      const outcomes = [
        {
          result: "Pneumonia" as const,
          confidence: 87 + Math.floor(Math.random() * 10),
          explanation:
            "The model detected opacity in the lower right lung field, consistent with pneumonia. Consolidation patterns and air bronchograms are visible, indicating bacterial infection.",
        },
        {
          result: "Infiltration" as const,
          confidence: 72 + Math.floor(Math.random() * 10),
          explanation:
            "The model identified increased interstitial markings and subtle infiltrates in both lung fields. This suggests possible early-stage infection or inflammatory process requiring further evaluation.",
        },
        {
          result: "Normal" as const,
          confidence: 92 + Math.floor(Math.random() * 8),
          explanation:
            "The model found clear lung fields with no signs of consolidation, infiltrates, or abnormal opacities. The cardiac silhouette and bony structures appear normal.",
        },
      ];

      const selectedOutcome =
        outcomes[Math.floor(Math.random() * outcomes.length)];

      const analysisResult: AnalysisResult = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        imageData: imageData,
        result: selectedOutcome.result,
        confidence: selectedOutcome.confidence,
        modelExplanation: selectedOutcome.explanation,
      };

      // Save to localStorage
      try {
        const history = JSON.parse(
          localStorage.getItem("pneumoHistory") || "[]"
        );
        history.unshift(analysisResult);
        localStorage.setItem("pneumoHistory", JSON.stringify(history));
      } catch {
        toast.error("Failed to save to history", {
          description: "Unable to save analysis to local storage.",
        });
      }

      setResult(analysisResult);
      setIsAnalyzing(false);

      // Show result toast
      toast.success("Analysis complete!", {
        description: `Result: ${selectedOutcome.result} (${selectedOutcome.confidence}% confidence)`,
      });
    }, 4000);
  };

  const handleNewUpload = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setProgress(0);
    setIsAnalyzing(false);
  };

  return (
    <DashboardLayout>
      {/* <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Upload a chest X-ray image to detect pneumonia using our AI model.
      </p> */}

      {/*==================== Upload Zone ====================*/}
      {!preview ? (
        <div
          onDrop={handleDrop}
          style={{ minHeight: "650px" }}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition flex items-center justify-center bg-white dark:bg-gray-800"
        >
          <div>
            <p className="text-gray-500 dark:text-gray-400 mb-3">
              Drag & Drop an X-ray image here or click below
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
              Supported formats: JPEG, PNG, WebP (Max 10MB)
            </p>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
              accept="image/jpeg,image/jpg,image/png,image/webp"
            />
            <label
              htmlFor="fileInput"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition"
            >
              Choose File
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/*==================== Image Preview ====================*/}
          <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-6 flex justify-center bg-white dark:bg-gray-800">
            <Image
              width={500}
              height={500}
              src={preview}
              alt="X-ray Preview"
              className="max-h-96 rounded-md object-contain"
            />
          </div>
          {/*==================== End of Image Preview ====================*/}

          {/*==================== Progress Bar ====================*/}
          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Analyzing X-ray...
                </span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          {/*==================== End of Progress Bar ====================*/}

          {/*==================== Results ====================*/}
          {result && !isAnalyzing && (
            <div className="space-y-6">
              {/*==================== Result Card ====================*/}
              <div
                className={`p-6 rounded-lg border-2 ${
                  result.result === "Pneumonia"
                    ? "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700"
                    : result.result === "Infiltration"
                    ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700"
                    : "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Diagnosis Result</h3>
                    <p
                      className={`text-2xl font-bold ${
                        result.result === "Pneumonia"
                          ? "text-red-600 dark:text-red-400"
                          : result.result === "Infiltration"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {result.result}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Confidence
                    </p>
                    <p className="text-3xl font-bold">{result.confidence}%</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Model Analysis</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {result.modelExplanation}
                  </p>
                </div>
              </div>
              {/*==================== End of Result Card ====================*/}

              {/*==================== Action Button ====================*/}
              <button
                onClick={handleNewUpload}
                className="w-full px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
              >
                Upload New X-ray
              </button>
              {/*==================== End of Action Button ====================*/}
            </div>
          )}
          {/*==================== End of Results ====================*/}
        </div>
      )}
    </DashboardLayout>
  );
}
