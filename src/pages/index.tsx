import Image from "next/image";
import { useState } from "react";
import DashboardLayout from "../../components/layouts/dashboard-layout";

export default function Overview() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!image) return alert("Please select an image first.");
    alert(`Uploaded: ${image.name}`);
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Upload a chest X-ray image to detect pneumonia using our AI model.
      </p>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-50 text-center cursor-pointer hover:border-blue-400 transition"
      >
        {!preview ? (
          <>
            <p className="text-gray-500 dark:text-gray-400 mb-3">
              Drag & Drop an image here or click below
            </p>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileInput"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Choose File
            </label>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Image
              width={400}
              height={400}
              src={preview}
              alt="Preview"
              className="max-h-80 rounded-md border border-gray-200 dark:border-gray-700 object-contain"
            />

            <button
              onClick={handleUpload}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Analyze Image
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
