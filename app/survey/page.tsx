import Nav from "@/components/Nav";
import { SurveyForm } from "@/components/survey/SurveyForm";

export default function SurveyPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SurveyForm />
      </div>
    </main>
  );
}
