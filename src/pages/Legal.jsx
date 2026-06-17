import { Scale } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const LEGAL_TABS = [
  { path: '/privacy', label: 'Privacy' },
  { path: '/terms', label: 'Terms' },
  { path: '/dpa', label: 'DPA' },
  { path: '/cookies', label: 'Cookies' },
];

const LEGAL_CONTENT = {
  '/privacy': {
    title: 'Privacy Policy',
    sections: [
      {
        heading: '1. Information We Collect',
        body: 'When you create an Empire Passport, we collect your email address and account metadata. Waitlist signups store your email and signup source. We use Supabase for authentication and data storage.',
      },
      {
        heading: '2. How We Use Data',
        body: 'Account data is used to authenticate you across Empire network properties, process referrals, and display your Empire Points balance. We do not sell your personal information to third parties.',
      },
      {
        heading: '3. Your Rights',
        body: 'You may request deletion of your account and associated data by contacting us. You can opt out of marketing communications at any time.',
      },
    ],
  },
  '/terms': {
    title: 'Terms of Service',
    sections: [
      {
        heading: '1. Acceptance',
        body: 'By using any Hell Yeah Games Inc. property — including Headquarters, Hell Yeah Games, Cyborg Gamers, Kryptotrac, Iron Claw, Gamer Gurls, or Hacker Media — you agree to these terms.',
      },
      {
        heading: '2. Accounts',
        body: 'You are responsible for maintaining the security of your Empire Passport credentials. One person per account. Abuse of the referral system may result in account suspension.',
      },
      {
        heading: '3. Content & Conduct',
        body: 'Do not use our platforms for illegal activity, harassment, or attempts to compromise our infrastructure. We reserve the right to terminate access for violations.',
      },
    ],
  },
  '/dpa': {
    title: 'Data Processing Agreement',
    sections: [
      {
        heading: '1. Scope',
        body: 'This DPA applies to business customers who integrate with Empire network services and process personal data on behalf of end users.',
      },
      {
        heading: '2. Sub-processors',
        body: 'We use Supabase (database and auth), Resend (email delivery), and standard cloud hosting providers. A current sub-processor list is available on request.',
      },
      {
        heading: '3. Security',
        body: 'We implement row-level security on database tables, environment-based secret management, and role-based admin access for internal dashboards.',
      },
    ],
  },
  '/cookies': {
    title: 'Cookie Policy',
    sections: [
      {
        heading: '1. What We Use',
        body: 'We use session storage for referral tracking (?ref= links) and Supabase auth tokens stored in local storage to keep you signed in. No third-party advertising cookies are deployed.',
      },
      {
        heading: '2. Analytics',
        body: 'We may add privacy-respecting analytics in the future. If we do, this policy will be updated and you will be notified.',
      },
      {
        heading: '3. Managing Cookies',
        body: 'Clearing your browser storage will sign you out and remove any pending referral codes. Most browsers let you control this in privacy settings.',
      },
    ],
  },
};

const Legal = () => {
  const location = useLocation();
  const content = LEGAL_CONTENT[location.pathname] || LEGAL_CONTENT['/privacy'];

  return (
    <div className="page-shell">
      <PageHeader
        eyebrow="Legal"
        title={content.title}
        subtitle="Documentation governing use of Hell Yeah Games Inc. and Empire network properties."
      />

      <nav className="corp-legal-nav" aria-label="Legal documents">
        {LEGAL_TABS.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`corp-legal-tab ${location.pathname === path ? 'active' : ''}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <p className="corp-updated">
        <Scale size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} aria-hidden="true" />
        Last updated: June 17, 2026
      </p>

      <div className="glass-panel corp-legal-doc">
        {content.sections.map(({ heading, body }) => (
          <section key={heading}>
            <h3>{heading}</h3>
            <p>{body}</p>
          </section>
        ))}

        <div className="corp-legal-callout">
          <strong>Questions?</strong> Contact legal@hellyeahgames.com for policy inquiries or data requests.
        </div>
      </div>
    </div>
  );
};

export default Legal;