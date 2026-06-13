import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-extrabold text-gray-900">MW Software</Link>
          <Link to="/" className="text-sm text-blue-600 hover:text-blue-700">← Back to Home</Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-10">Last updated: June 13, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              When you use our software or contact us, we may collect:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>Name and email address (when you contact us or purchase a product)</li>
              <li>Company name and business information</li>
              <li>Payment information (processed securely via our payment providers)</li>
              <li>Usage data within our applications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>To provide and maintain our services</li>
              <li>To process your transactions</li>
              <li>To send you support and updates</li>
              <li>To respond to your enquiries</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Data Storage</h2>
            <p className="text-gray-600 leading-relaxed">
              For one-time license purchases, your data is stored on your own server. We have no access to your data unless you explicitly grant it for support purposes.
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              For monthly hosted plans, data is stored on secure servers with encryption at rest and in transit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Data Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted third parties who assist us in operating our services, so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              Our websites may use cookies to enhance your experience. You can choose to disable cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              Under GDPR and UK data protection law, you have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at: <a href="mailto:hello@mwsoftware.dev" className="text-blue-600 hover:underline">hello@mwsoftware.dev</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
