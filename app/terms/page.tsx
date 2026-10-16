import type { Metadata } from "next";
import LegalPage, { legalContact } from "@/components/LegalPage";
export const metadata: Metadata = { title: "Terms of Service", description: "Terms for using AgentIndex and buying sponsorships." };
export default function Terms() {
  const mail = <a href={`mailto:${legalContact}`}>{legalContact}</a>;
  return (
    <LegalPage title="Terms of Service">
      <p>These terms apply to getagentindex.com ("AgentIndex"), run by an individual based in British Columbia, Canada. By using the site or buying a sponsorship, you agree to them. Contact: {mail}.</p>
      <h2>Using the site</h2>
      <p>AgentIndex is a free directory of AI agent use cases. The content is general information, not professional advice. Tools, prices and capabilities change, so check them yourself before relying on them. Don't misuse the site: no scraping that overloads it, no attempts to break it, and nothing illegal.</p>
      <h2>Content</h2>
      <p>The directory content belongs to AgentIndex, unless it's marked as third-party. You're welcome to link to it and share it, with credit. Product names and trademarks belong to their owners. Linking to a product does not mean we endorse it.</p>
      <h2>Sponsorships</h2>
      <ul>
        <li>Sponsored placements are clearly labeled "Sponsored".</li>
        <li>We may decline or remove a sponsorship that is misleading, illegal, unsafe or off-topic. If we remove one for a reason other than a breach of these terms, we refund the unused part of the current period.</li>
        <li>You are responsible for the accuracy of your listing and for having the rights to any names, logos and claims you give us.</li>
      </ul>
      <h2>Billing, cancellation and refunds</h2>
      <ul>
        <li>Sponsorships are billed monthly through Stripe, in advance, and renew automatically until you cancel.</li>
        <li>You can cancel anytime. Email {mail} or use the link in your Stripe receipt. Your placement stays live until the end of the period you've paid for, and you won't be charged again.</li>
        <li>We don't give refunds or partial refunds for unused time, except where the law requires one or as described above.</li>
        <li>We will give you at least 30 days' notice by email before changing the price of an active sponsorship.</li>
      </ul>
      <h2>Pro waitlist</h2>
      <p>Joining the Pro waitlist is free. We will tell you before any paid Pro plan starts, and we will only charge you if you choose to subscribe.</p>
      <h2>No warranty and limits on liability</h2>
      <p>The site is provided "as is", without guarantees that it will always be available or error-free. As far as the law allows, AgentIndex is not liable for indirect or consequential losses. Our total liability to you is limited to the amount you paid us in the 3 months before the claim.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of British Columbia and the federal laws of Canada that apply there. Nothing here limits rights you have under consumer protection law.</p>
      <h2>Changes</h2>
      <p>We may update these terms and will change the date at the top. Material changes for active sponsors will be emailed in advance.</p>
    </LegalPage>
  );
}
