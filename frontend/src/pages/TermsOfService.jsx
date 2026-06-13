import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-extrabold text-gray-900">MW Software</Link>
          <Link to="/" className="text-sm text-blue-600 hover:text-blue-700">← Back to Home</Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold mb-4">Terms of Service</h1>
        <p className="text-gray-500 mb-10">Last updated: June 13, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Products and Services</h2>
            <p className="text-gray-600 leading-relaxed">
              MW Software provides software applications for small businesses. Each product is sold as either a one-time license (source code) or a monthly subscription (hosted service).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. One-Time License</h2>
            <p className="text-gray-600 leading-relaxed">
              When you purchase a one-time license:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>You receive the full source code of the product</li>
              <li>You may deploy it on your own servers</li>
              <li>You may modify the code as needed</li>
              <li>You receive 1 year of support and updates</li>
              <li>Ownership transfers to you upon purchase</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Monthly Subscription</h2>
            <p className="text-gray-600 leading-relaxed">
              When you subscribe to a monthly plan:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>We host and maintain the software for you</li>
              <li>You may cancel anytime with no fees</li>
              <li>Your data will be retained for 30 days after cancellation</li>
              <li>Price changes will be communicated 30 days in advance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Payment</h2>
            <p className="text-gray-600 leading-relaxed">
              All payments are processed securely through our payment providers. We do not store your credit card details. Prices are listed in GBP (£) and exclude applicable taxes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Refund Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We offer a 30-day money-back guarantee on all purchases. If you are not satisfied with your purchase, contact us within 30 days for a full refund. Monthly subscriptions can be cancelled anytime without further charges.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Support</h2>
            <p className="text-gray-600 leading-relaxed">
              We provide email support for all products. Priority support is included with monthly plans. We aim to respond to all enquiries within 24 hours during business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              MW Software shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our products. Our total liability shall not exceed the amount you paid for the product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about these Terms, please contact us at: <a href="mailto:hello@mwsoftware.dev" className="text-blue-600 hover:underline">hello@mwsoftware.dev</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
