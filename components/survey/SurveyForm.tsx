'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';

interface FormData {
  total_applications: string;
  total_responses: string;
  total_first_round: string;
  total_final_round: string;
  total_offers: string;
  major: string;
  degree: string;
  school_tier: string;
  gpa_range: string;
  graduating_time: string;
  internship_count: string;
  has_return_offer: string;
  needs_sponsorship: string;
  when_started_applying: string;
}

const initialFormData: FormData = {
  total_applications: '',
  total_responses: '',
  total_first_round: '',
  total_final_round: '',
  total_offers: '',
  major: '',
  degree: '',
  school_tier: '',
  gpa_range: '',
  graduating_time: '',
  internship_count: '',
  has_return_offer: '',
  needs_sponsorship: '',
  when_started_applying: '',
};

export function SurveyForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          total_applications: parseInt(formData.total_applications),
          total_responses: parseInt(formData.total_responses),
          total_first_round: parseInt(formData.total_first_round),
          total_final_round: parseInt(formData.total_final_round),
          total_offers: parseInt(formData.total_offers),
          major: formData.major,
          degree: formData.degree,
          school_tier: formData.school_tier,
          gpa_range: formData.gpa_range,
          graduating_time: formData.graduating_time,
          internship_count: parseInt(formData.internship_count),
          has_return_offer: formData.has_return_offer,
          needs_sponsorship: formData.needs_sponsorship,
          when_started_applying: formData.when_started_applying,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit survey');
      }

      setSubmitStatus('success');
      setFormData(initialFormData);

      // Scroll to success message
      setTimeout(() => {
        document.getElementById('submit-status')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Share Your Job Search Experience
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Your anonymous data helps thousands of job seekers understand the real market. Takes 2-3 minutes.
        </p>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400">✓</span>
            <span>100% Anonymous</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400">✓</span>
            <span>Instant Results</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400">✓</span>
            <span>Community Driven</span>
          </div>
        </div>
      </div>

      <Card className="shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-8 p-8 md:p-12">

        {/* Application Statistics */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-100 dark:border-blue-900">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Application Statistics</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="total_applications" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Total Applications Sent *
              </label>
              <input
                type="number"
                id="total_applications"
                name="total_applications"
                value={formData.total_applications}
                onChange={handleChange}
                required
                min="0"
                placeholder="e.g., 250"
                className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="total_responses" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Total Responses Received *
              </label>
              <input
                type="number"
                id="total_responses"
                name="total_responses"
                value={formData.total_responses}
                onChange={handleChange}
                required
                min="0"
                placeholder="e.g., 15"
                className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="total_first_round" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                First Round Interviews *
              </label>
              <input
                type="number"
                id="total_first_round"
                name="total_first_round"
                value={formData.total_first_round}
                onChange={handleChange}
                required
                min="0"
                placeholder="e.g., 10"
                className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="total_final_round" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Final Round Interviews *
              </label>
              <input
                type="number"
                id="total_final_round"
                name="total_final_round"
                value={formData.total_final_round}
                onChange={handleChange}
                required
                min="0"
                placeholder="e.g., 3"
                className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 transition-all duration-200"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="total_offers" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Total Offers Received *
              </label>
              <input
                type="number"
                id="total_offers"
                name="total_offers"
                value={formData.total_offers}
                onChange={handleChange}
                required
                min="0"
                placeholder="e.g., 1"
                className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Academic Background */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b-2 border-indigo-100 dark:border-indigo-900">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
              <span className="text-xl">🎓</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Academic Background</h3>
          </div>

          <div>
            <label htmlFor="major" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Major *
            </label>
            <input
              type="text"
              id="major"
              name="major"
              value={formData.major}
              onChange={handleChange}
              required
              placeholder="e.g., Computer Science"
              className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="degree" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Degree Level *
            </label>
            <select
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 transition-all duration-200"
            >
              <option value="">Select degree</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div>
            <label htmlFor="school_tier" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              School Tier *
            </label>
            <select
              id="school_tier"
              name="school_tier"
              value={formData.school_tier}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 transition-all duration-200"
            >
              <option value="">Select tier</option>
              <option value="Target (Top 50)">Target (Top 50)</option>
              <option value="Reach (Top 20)">Reach (Top 20)</option>
              <option value="Safety (Below Top 50)">Safety (Below Top 50)</option>
            </select>
          </div>

          <div>
            <label htmlFor="gpa_range" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              GPA Range *
            </label>
            <select
              id="gpa_range"
              name="gpa_range"
              value={formData.gpa_range}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 transition-all duration-200"
            >
              <option value="">Select GPA range</option>
              <option value="3.7-4.0">3.7-4.0</option>
              <option value="3.5-3.7">3.5-3.7</option>
              <option value="3.0-3.5">3.0-3.5</option>
              <option value="Below 3.0">Below 3.0</option>
            </select>
          </div>

          <div>
            <label htmlFor="graduating_time" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Graduating Time *
            </label>
            <input
              type="text"
              id="graduating_time"
              name="graduating_time"
              value={formData.graduating_time}
              onChange={handleChange}
              required
              placeholder="e.g., May 2025"
              className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 transition-all duration-200"
            />
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b-2 border-purple-100 dark:border-purple-900">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <span className="text-xl">💼</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Experience</h3>
          </div>

          <div>
            <label htmlFor="internship_count" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Number of Previous Internships *
            </label>
            <input
              type="number"
              id="internship_count"
              name="internship_count"
              value={formData.internship_count}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="has_return_offer" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Return Offer Status *
            </label>
            <select
              id="has_return_offer"
              name="has_return_offer"
              value={formData.has_return_offer}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 transition-all duration-200"
            >
              <option value="">Select status</option>
              <option value="Yes, but I'm still searching...">Yes, but I'm still searching...</option>
              <option value="No, I don't have a return offer">No, I don't have a return offer</option>
              <option value="Yes, I accepted my return offer">Yes, I accepted my return offer</option>
            </select>
          </div>
        </div>

        {/* Job Search Details */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b-2 border-green-100 dark:border-green-900">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <span className="text-xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Job Search Details</h3>
          </div>

          <div>
            <label htmlFor="needs_sponsorship" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Visa Sponsorship Status *
            </label>
            <select
              id="needs_sponsorship"
              name="needs_sponsorship"
              value={formData.needs_sponsorship}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 transition-all duration-200"
            >
              <option value="">Select status</option>
              <option value="Yes, I need sponsorship">Yes, I need sponsorship</option>
              <option value="No, US citizen">No, US citizen</option>
              <option value="No, permanent resident">No, permanent resident</option>
            </select>
          </div>

          <div>
            <label htmlFor="when_started_applying" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              When Did You Start Applying? *
            </label>
            <input
              type="text"
              id="when_started_applying"
              name="when_started_applying"
              value={formData.when_started_applying}
              onChange={handleChange}
              required
              placeholder="e.g., August 2024 or 3 months before graduation"
              className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 transition-all duration-200"
            />
          </div>
        </div>

        {/* Submit Status */}
        {submitStatus !== 'idle' && (
          <div id="submit-status" className={`p-6 rounded-xl border-2 ${
            submitStatus === 'success'
              ? 'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200'
              : 'bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'
          }`}>
            {submitStatus === 'success' ? (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎉</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg mb-1">Thank you for sharing your data!</p>
                  <p className="text-sm">Your submission helps thousands of job seekers understand the market better. Check out the <a href="/dashboard" className="underline font-semibold">dashboard</a> to see your data included in the stats!</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg mb-1">Submission failed</p>
                  <p className="text-sm">{errorMessage || 'Please try again later or contact support if the issue persists.'}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-6 border-t-2 border-gray-100 dark:border-gray-800">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </span>
            ) : (
              '✨ Submit Your Experience'
            )}
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
            🔒 All data is anonymous and will be used to help job seekers understand the market
          </p>
        </div>
      </form>
    </Card>
    </div>
  );
}
