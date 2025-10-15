import DashboardLayout from "../../../components/layouts/dashboard-layout";

export default function History() {
  const mockData = [
    { id: 1, date: "2025-10-15", result: "Pneumonia Detected", confidence: 92 },
    { id: 2, date: "2025-10-14", result: "Normal", confidence: 96 },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Analysis History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-left">
            <tr>
              <th className="py-3 px-5">Date</th>
              <th className="py-3 px-5">Diagnosis</th>
              <th className="py-3 px-5">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((entry) => (
              <tr
                key={entry.id}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="py-3 px-5">{entry.date}</td>
                <td className="py-3 px-5">{entry.result}</td>
                <td className="py-3 px-5">{entry.confidence}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
