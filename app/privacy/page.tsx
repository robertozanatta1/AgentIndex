import type { Metadata } from "next";
import LegalPage, { legalContact } from "@/components/LegalPage";
export const metadata: Metadata = { title: "Privacy Policy", description: "How AgentIndex collects and uses your information." };
export default function Privacy() {
  const mail = <a href={`mailto:${legalContact}`}>{legalContact}</a>;
  return (
    <LegalPage title="Privacy Policy">
      <p>AgentIndex (getagentindex.com) is run by an individual based in British Columbia, Canada. This page explains what we collect, why, and what you can do about it. Questions: {mail}.</p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Email address</strong>: when you join the newsletter or the Pro waitlist.</li>
        <li><strong>Customer details</strong>: if you buy a sponsorship or Pro, your name, email, and the listing or URL you want promoted.</li>
        <li><strong>Payment information</strong>: handled entirely by Stripe. We never see or store your full card number. We receive limited details from Stripe such as your name, email, billing country and payment status.</li>
        <li><strong>Basic technical data</strong>: our host keeps standard server logs (such as IP address, browser type and pages requested) for security and reliability.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To send the emails you signed up for, such as new use cases and launch alerts.</li>
        <li>To run sponsorships: publishing your listing, billing, and contacting you about it.</li>
        <li>To keep the site secure and working.</li>
      </ul>
      <h2>Who we share it with</h2>
      <p>We do not sell or rent your personal information. We share it only with the service providers that run the site:</p>
      <ul>
        <li><strong>Vercel</strong>: website hosting.</li>
        <li><strong>Stripe</strong>: payment processing.</li>
        <li><strong>Resend</strong>: sending email.</li>
      </ul>
      <p>These providers may store and process data outside Canada, including in the United States, where it may be subject to local laws. We may also disclose information if the law requires it.</p>
      <h2>Email consent and unsubscribing (CASL)</h2>
      <p>We only email you if you opted in, for example by entering your email in a signup form, or about a purchase you made with us. Every marketing email identifies AgentIndex, includes our contact information, and has a way to unsubscribe. You can unsubscribe at any time with the link in any email, by replying to an email with "unsubscribe", or by writing to {mail}. We will process requests promptly and within 10 business days.</p>
      <h2>How long we keep it</h2>
      <p>We keep your email until you unsubscribe or ask us to delete it. We keep sponsor and payment records as long as tax and accounting rules require.</p>
      <h2>Your choices</h2>
      <p>You can ask to see, correct or delete the personal information we hold about you by emailing {mail}. If you are not satisfied with our answer, you can contact the Office of the Information and Privacy Commissioner for British Columbia.</p>
      <h2>Cookies</h2>
      <p>We do not use advertising or tracking cookies. Stripe may set cookies on its own checkout pages to process payments and prevent fraud.</p>
      <h2>Changes</h2>
      <p>If we change this policy, we will update it here and change the date at the top.</p>
    </LegalPage>
  );
}
