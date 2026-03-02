import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Data Deletion — Stuff N Things',
  description: 'Request deletion of your personal data from Stuff N Things LLC.',
}

export default function DataDeletion() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="text-brand-cyan hover:text-brand-cyan/80 text-sm mb-8 inline-block">
          ← Back to stuffnthings.io
        </Link>

        <h1 className="text-4xl font-bold text-white mb-2">Data Deletion Request</h1>
        <p className="text-slate-500 mb-12">Your data, your choice.</p>

        <div className="space-y-10 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">How to Request Data Deletion</h2>
            <p className="mb-4">
              If you would like to request the deletion of your personal data from our systems,
              including any data associated with third-party platform integrations (Meta, Google,
              X, TikTok, or others), you can do so by contacting us:
            </p>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
              <p>
                <strong className="text-white">Email:</strong>{' '}
                <a href="mailto:info@stuffnthings.io?subject=Data%20Deletion%20Request" className="text-brand-cyan hover:underline">
                  info@stuffnthings.io
                </a>
              </p>
              <p className="text-sm text-slate-400">
                Subject line: <span className="text-slate-300">Data Deletion Request</span>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">What to Include</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your full name and the email address associated with your account.</li>
              <li>The name of your business (if applicable).</li>
              <li>Which third-party platforms you connected through our services (if any).</li>
              <li>Any specific data you would like deleted, or a request for complete deletion.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">What Happens Next</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We will acknowledge your request within <strong className="text-white">48 hours</strong>.</li>
              <li>Your data will be deleted from our systems within <strong className="text-white">30 days</strong> of the confirmed request.</li>
              <li>We will revoke any active OAuth tokens and disconnect third-party platform access associated with your account.</li>
              <li>You will receive a confirmation email once deletion is complete.</li>
              <li>Some data may be retained where required by law (e.g., billing records for tax compliance), but will not be used for any other purpose.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Third-Party Platform Data</h2>
            <p>
              Deleting your data from our systems removes all information we store and process.
              To delete data held directly by third-party platforms (Meta, Google, etc.), you will
              need to manage that through each platform&apos;s own privacy settings. We can assist you
              with revoking our app&apos;s access to your accounts as part of the deletion process.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
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

        <div className="mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500">
          <p>
            See also: <Link href="/privacy" className="text-brand-cyan hover:underline">Privacy Policy</Link>
            {' · '}
            <Link href="/terms" className="text-brand-cyan hover:underline">Terms of Service</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
