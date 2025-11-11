import Nav from '@/components/Nav';
import Card from '@/components/Card';
import SurveyCallout from '@/components/SurveyCallout';

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Nav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <h1 className="text-4xl font-bold mb-8">About This Project</h1>

            <Card>
              <h2 className="text-2xl font-semibold mb-4">The Story</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                I've sent out 500+ applications and gotten 3 interviews, 0 offers. For the longest time I thought something was wrong with me.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Then I started talking to people and realized... wait, is everyone going through this?
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                So I made a quick anonymous survey to actually figure out what's normal. How many applications are people really sending?
                What are response rates looking like? When are people actually getting offers?
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl font-semibold mb-4">Methodology</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>100% anonymous responses collected via our website</li>
                <li>Data collected from software engineering job seekers</li>
                <li>Filters available: major, school tier, sponsorship status, location, experience level</li>
                <li>Updated in real-time as new responses come in</li>
                <li>All data is public and transparent</li>
              </ul>
            </Card>

            <Card>
              <h2 className="text-2xl font-semibold mb-4">Privacy</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This survey is completely anonymous. We don't collect names, emails, or any personally identifiable information.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                The goal is to help everyone understand what's normal in today's brutal job market - not to identify individuals.
              </p>
            </Card>

            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Built with Next.js 14, TypeScript, and TailwindCSS</p>
              <p className="mt-2">100% free • 100% open • 100% anonymous</p>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <SurveyCallout />
          </aside>
        </div>
      </div>
    </main>
  );
}
