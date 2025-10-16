import Image from "next/image";
import { useEffect, useState } from "react";
import { AnalysisResult } from "../../../types";
import DashboardLayout from "../../../components/layouts/dashboard-layout";

export default function History() {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("pneumoHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const getResultColor = (result: string) => {
    switch (result) {
      case "Pneumonia":
        return "text-red-600 dark:text-red-400";
      case "Infiltration":
        return "text-yellow-600 dark:text-yellow-400";
      case "Normal":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Analysis History</h1>

      {history.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            No analysis history yet. Upload your first X-ray to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <table className="min-w-full">
              <thead className="bg-gray-100 dark:bg-gray-700 text-left">
                <tr>
                  <th className="py-3 px-5">Date</th>
                  <th className="py-3 px-5">Diagnosis</th>
                  <th className="py-3 px-5">Confidence</th>
                  <th className="py-3 px-5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="py-3 px-5">{entry.date}</td>
                    <td
                      className={`py-3 px-5 font-semibold ${getResultColor(
                        entry.result
                      )}`}
                    >
                      {entry.result}
                    </td>
                    <td className="py-3 px-5">{entry.confidence}%</td>
                    <td className="py-3 px-5">
                      <button
                        onClick={() => setSelectedItem(entry)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/*==================== Detail Modal ====================*/}
          {selectedItem && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold">Analysis Details</h2>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex justify-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <Image
                      width={400}
                      height={400}
                      src={selectedItem.imageData}
                      alt="X-ray"
                      className="max-h-64 object-contain rounded"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Date:</span>
                      <span>{selectedItem.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Result:</span>
                      <span
                        className={`font-bold ${getResultColor(
                          selectedItem.result
                        )}`}
                      >
                        {selectedItem.result}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Confidence:</span>
                      <span>{selectedItem.confidence}%</span>
                    </div>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Model Analysis</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedItem.modelExplanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/*==================== End of Detail Modal ====================*/}
        </div>
      )}
    </DashboardLayout>
  );
}
