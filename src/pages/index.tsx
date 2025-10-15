import DashboardLayout from "../../components/layouts/dashboard-layout";

export default function Overview() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Upload a chest X-ray image to detect pneumonia using our AI model.
      </p>

      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-60 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-3">
          Drag & Drop an image here
        </p>
        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Upload Image
        </button>
      </div>
    </DashboardLayout>
  );
}
