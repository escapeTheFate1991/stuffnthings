import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — Stuff N Things',
  description: 'Terms of Service for Stuff N Things LLC — the agreement governing use of our services.',
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="text-brand-cyan hover:text-brand-cyan/80 text-sm mb-8 inline-block">
          ← Back to stuffnthings.io
        </Link>

        <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-slate-500 mb-12">Last updated: March 1, 2026</p>

        <div className="space-y-10 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Agreement to Terms</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you
              (&quot;Client,&quot; &quot;you,&quot; or &quot;your&quot;) and Stuff N Things LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot;
              or &quot;our&quot;), a Delaware limited liability company located at 2093 Philadelphia Pike,
              Claymont, DE 19703. By accessing our website or engaging our services, you agree to
              be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Services</h2>
            <p className="mb-3">
              Stuff N Things provides web design, development, hosting, management, optimization,
              analytics, and social media integration services (&quot;Services&quot;). Our Services may include
              but are not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Website design, development, and deployment.</li>
              <li>Ongoing website hosting, maintenance, and performance optimization.</li>
              <li>Analytics, reporting, and AI-powered insights on website traffic, user behavior, and performance.</li>
              <li>Social media account management, content scheduling, and publishing via authorized third-party platform integrations.</li>
              <li>Search engine optimization (SEO) and Core Web Vitals monitoring.</li>
              <li>Friction audits and conversion optimization.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Subscription & Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Services are provided on a monthly subscription basis as outlined in your selected plan.</li>
              <li>Payments are due on the billing date specified in your service agreement.</li>
              <li>All fees are non-refundable except as required by law or as specified in a separate written agreement.</li>
              <li>We reserve the right to modify pricing with 30 days&apos; written notice. Existing subscriptions continue at their current rate through the end of the billing cycle in which notice is given.</li>
              <li>Failure to pay may result in suspension or termination of Services after a 10-day grace period and written notice.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Client Responsibilities</h2>
            <p className="mb-3">You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information necessary for us to deliver the Services.</li>
              <li>Grant us reasonable access to your accounts, platforms, and systems as needed to perform the Services, including social media accounts, hosting panels, and analytics platforms.</li>
              <li>Ensure that all content you provide for publication complies with applicable laws and does not infringe on any third-party rights.</li>
              <li>Respond to requests for approvals, feedback, or information in a timely manner.</li>
              <li>Maintain the security of your account credentials and notify us immediately of any unauthorized access.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Platform Integrations</h2>
            <p className="mb-3">
              Our Services may involve connecting to third-party platforms (including Meta, Google,
              X, TikTok, and others) on your behalf. By authorizing these connections:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You represent that you have the authority to grant us access to those accounts.</li>
              <li>You acknowledge that third-party platforms are governed by their own terms of service and policies, which you are responsible for complying with.</li>
              <li>We are not responsible for changes, outages, or policy modifications by third-party platforms that may affect the delivery of our Services.</li>
              <li>You may revoke third-party access at any time, understanding that it may limit our ability to provide certain Services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data & Analytics</h2>
            <p>
              As part of our Services, we collect and analyze data from your websites, connected
              platforms, and user interactions. This includes website traffic, user behavior, engagement
              metrics, and performance data processed through Google Analytics, our proprietary
              AI-powered analytics systems, and other tools. All data collection is governed by our{' '}
              <Link href="/privacy" className="text-brand-cyan hover:underline">Privacy Policy</Link>.
              Aggregated, anonymized insights derived from client data may be used to improve our
              Services and develop benchmarks, but will never identify you or your business without
              your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-white">Your Content:</strong> You retain all ownership rights
                to content, logos, trademarks, and materials you provide to us. You grant us a
                limited license to use these materials solely for the purpose of delivering the Services.
              </li>
              <li>
                <strong className="text-white">Our Work:</strong> Upon full payment, you own the
                custom website design and content created specifically for you. Underlying frameworks,
                libraries, reusable components, tools, and methodologies remain our intellectual property.
              </li>
              <li>
                <strong className="text-white">Third-Party Assets:</strong> Any third-party software,
                fonts, images, or tools used in your project are subject to their respective licenses.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Confidentiality</h2>
            <p>
              Both parties agree to keep confidential any proprietary or sensitive information
              disclosed during the course of the engagement. This includes but is not limited to
              business strategies, analytics data, access credentials, and financial information.
              This obligation survives termination of the Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Stuff N Things LLC shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages arising from
              or related to the use of our Services. Our total liability for any claim shall not
              exceed the fees paid by you in the three (3) months preceding the claim. We are not
              liable for losses arising from third-party platform changes, outages, or actions
              outside our reasonable control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Warranties & Disclaimers</h2>
            <p>
              We strive to deliver high-quality services including websites targeting 95+ Lighthouse
              scores and sub-1.5s LCP. However, Services are provided &quot;as is&quot; and &quot;as available.&quot;
              We do not guarantee specific search engine rankings, traffic levels, conversion rates,
              or revenue outcomes. Performance metrics are targets, not guarantees, and are subject
              to factors outside our control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Termination</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Either party may terminate the service relationship with 30 days&apos; written notice.</li>
              <li>We may suspend or terminate Services immediately if you breach these Terms, fail to pay after the grace period, or engage in activity that puts our systems or reputation at risk.</li>
              <li>Upon termination, we will provide you with a copy of your website files and data within 30 days of request. Hosting and management services cease at the end of the final billing period.</li>
              <li>Sections on Intellectual Property, Confidentiality, Limitation of Liability, and Governing Law survive termination.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">12. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Stuff N Things LLC, its members, employees,
              and agents from any claims, damages, losses, or expenses (including reasonable
              attorney&apos;s fees) arising from your breach of these Terms, your content, or your
              use of the Services in violation of applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">13. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the State of
              Delaware, without regard to its conflict of law provisions. Any disputes arising under
              these Terms shall be resolved in the state or federal courts located in New Castle
              County, Delaware.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">14. Modifications</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be posted on this
              page with an updated effective date. Continued use of our Services after modifications
              constitutes acceptance of the updated Terms. Material changes will be communicated via
              email to active clients.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">15. Contact Us</h2>
            <p>
              Stuff N Things LLC<br />
              2093 Philadelphia Pike<br />
              Claymont, DE 19703<br />
              <a href="mailto:info@stuffnthings.io" className="text-brand-cyan hover:underline">
                info@stuffnthings.io
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
