import { Upload } from "lucide-react";
import { UploadDropzoneProps } from "../types/interfaces/upload-dropzone";



export default function UploadDropzone({ onDrop, onFileChange }: UploadDropzoneProps) {
  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="h-full w-full border-2 border-dashed border-[#3a3a3a49] dark:border-[#e4794b8c] rounded-xl text-center cursor-pointer hover:border-[#E4794B] dark:hover:border-[#E4794B] hover:bg-[#e4794b0a] dark:hover:bg-[#e4794b0a] transition-all flex items-center justify-center bg-[#e1e2c5] dark:bg-[#0c0c0c]"
    >
      <div className="flex flex-col items-center gap-6 px-8">
        <div className="w-20 h-20 rounded-full bg-[#e4794b1a] dark:bg-[#e4794b2a] flex items-center justify-center">
          <Upload className="w-10 h-10 text-[#E4794B]" />
        </div>
        
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Drag & Drop an X-ray image here
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            or click the button below to browse
          </p>
        </div>

        <div className="space-y-3">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={onFileChange}
            accept="image/jpeg,image/jpg,image/png,image/webp"
          />
          <label
            htmlFor="fileInput"
            className="inline-block border-ai-gradient font-bold text-[#111111] rounded-lg hover:opacity-90 cursor-pointer transition"
          >
            <p className="dark:text-[#000000] text-[#000000cb] my-3 mx-10">
              Choose File
            </p>
          </label>
          
          <p className="text-xs text-gray-400 dark:text-gray-600">
            Supported formats: JPEG, PNG, WebP • Max size: 10MB
          </p>
        </div>
      </div>
    </div>
  );
}