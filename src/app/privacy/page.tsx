import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Stuff N Things',
  description: 'Privacy Policy for Stuff N Things LLC — how we collect, use, and protect your information.',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="text-brand-cyan hover:text-brand-cyan/80 text-sm mb-8 inline-block">
          ← Back to stuffnthings.io
        </Link>

        <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-500 mb-12">Last updated: March 1, 2026</p>

        <div className="space-y-10 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Who We Are</h2>
            <p>
              Stuff N Things LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website
              stuffnthings.io and provides web design, development, hosting, management, analytics, and
              social media integration services. Our registered address is 2093 Philadelphia Pike,
              Claymont, DE 19703.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-3">We may collect the following categories of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-white">Contact Information:</strong> Name, email address, phone
                number, and business details you provide when contacting us, requesting an audit,
                or signing up for our services.
              </li>
              <li>
                <strong className="text-white">Account & Authentication Data:</strong> Credentials and
                tokens generated when you connect third-party accounts (e.g., Meta, Google, X, TikTok)
                through our platform via OAuth or similar authorization protocols.
              </li>
              <li>
                <strong className="text-white">Website Analytics & Performance Data:</strong> Traffic
                metrics, user behavior patterns, engagement data, Core Web Vitals, page performance
                scores, and other experience metrics collected from websites we build and manage on
                your behalf. This may include data from Google Analytics, our proprietary AI-powered
                analytics systems, and other third-party tools.
              </li>
              <li>
                <strong className="text-white">Social Media Data:</strong> When you authorize us to
                manage your social media presence, we may access account information, posting history,
                audience demographics, engagement metrics, and content performance data from connected
                platforms.
              </li>
              <li>
                <strong className="text-white">Usage Data:</strong> Information about how you interact
                with our services, including IP addresses, browser type, device information, pages
                visited, and referring URLs.
              </li>
              <li>
                <strong className="text-white">Business & Billing Information:</strong> Company name,
                billing address, and payment details necessary to process your subscription.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, maintain, and improve our web design, development, hosting, and management services.</li>
              <li>To manage and optimize your social media accounts and content on your behalf.</li>
              <li>To analyze website traffic, user behavior, and performance metrics to deliver actionable insights and ongoing improvements.</li>
              <li>To generate AI-powered analytics, reports, recommendations, and content suggestions.</li>
              <li>To process payments and manage your account.</li>
              <li>To communicate with you regarding your services, updates, and support requests.</li>
              <li>To comply with legal obligations and enforce our Terms of Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Integrations</h2>
            <p className="mb-3">
              Our services integrate with third-party platforms including but not limited to Meta
              (Facebook, Instagram, Threads), Google (YouTube, Analytics, Search Console), X (Twitter),
              and TikTok. When you connect these accounts:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We access only the data and permissions you explicitly authorize.</li>
              <li>We use OAuth 2.0 or equivalent secure authorization protocols — we never store your third-party passwords.</li>
              <li>Data retrieved from these platforms is used solely to provide the services you requested.</li>
              <li>You may revoke access at any time through the respective platform&apos;s settings or by contacting us.</li>
            </ul>
            <p className="mt-3">
              Each third-party platform has its own privacy policy governing their use of your data.
              We encourage you to review those policies directly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Sharing & Disclosure</h2>
            <p className="mb-3">We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Service Providers:</strong> Trusted partners who assist in delivering our services (hosting, analytics, payment processing) under strict confidentiality agreements.</li>
              <li><strong className="text-white">Third-Party Platforms:</strong> Only as necessary to perform authorized actions on your connected accounts.</li>
              <li><strong className="text-white">Legal Requirements:</strong> When required by law, regulation, legal process, or governmental request.</li>
              <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with notice to affected users.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Security</h2>
            <p>
              We implement industry-standard security measures including encryption in transit (TLS),
              secure token storage, access controls, and regular security reviews. While no system is
              100% secure, we take commercially reasonable steps to protect your information from
              unauthorized access, alteration, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or as needed to provide
              our services. Analytics and performance data may be retained in aggregated or anonymized
              form for longer periods to improve our services. Upon termination of services, we will
              delete or anonymize your data within 90 days unless legally required to retain it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Your Rights</h2>
            <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, correct, or delete your personal information.</li>
              <li>Opt out of certain data processing activities.</li>
              <li>Revoke consent or disconnect third-party account integrations.</li>
              <li>Request a portable copy of your data.</li>
              <li>Lodge a complaint with a supervisory authority.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:info@stuffnthings.io" className="text-brand-cyan hover:underline">
                info@stuffnthings.io
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Cookies & Tracking</h2>
            <p>
              We use cookies and similar technologies (including Google Analytics) to understand how
              visitors interact with our website and our clients&apos; websites. These tools help us measure
              performance, optimize user experience, and deliver relevant content. You can manage
              cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under 18. We do not knowingly collect
              personal information from children. If we learn we have collected data from a child,
              we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page
              with an updated effective date. Continued use of our services after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">12. Contact Us</h2>
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
