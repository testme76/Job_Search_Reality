import Link from "next/link";

export default function SurveyCallout() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6 sticky top-24">
      <h2 className="text-2xl font-bold mb-3 text-blue-900 dark:text-blue-100">📝 Share Your Data</h2>
      <p className="text-sm text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
        <strong>Job searching?</strong> Your anonymous data helps everyone understand the real market. Takes 2-3 minutes.
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
        <h3 className="text-sm font-bold mb-2 text-gray-900 dark:text-white">What we ask:</h3>
        <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Applications sent</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Interviews & offers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Major & school tier</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Location & sponsorship</span>
          </li>
        </ul>
      </div>

      <Link
        href="/survey"
        className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 mb-3"
      >
        📋 Fill Out Survey
      </Link>

      <Link
        href="/responses"
        className="block w-full text-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-lg border-2 border-blue-600 dark:border-blue-400"
      >
        📊 View Responses
      </Link>

      <p className="text-xs text-gray-600 dark:text-gray-400 mt-4 text-center">
        🔒 100% anonymous
      </p>
    </div>
  );
}
