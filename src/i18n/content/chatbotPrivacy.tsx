import React from 'react';

/**
 * Privacy Policy for Chatbot Coastal, the chat assistant operated by Xelion
 * S.R.L. This is a separate document from the Reservas Kalawala policy in
 * privacy.tsx: it covers conversations with a Chatbot Coastal assistant on
 * WhatsApp, Messenger, Instagram and client websites, not this site's
 * booking flow. Meta's app review asks for a public policy URL and data
 * deletion instructions, which is why it lives on its own page with a
 * stable anchor (`#data-deletion`) on the deletion section.
 *
 * English only. Locale routes without their own text render this version,
 * the same fallback privacy.tsx uses.
 */

export interface ChatbotPrivacySection {
  id?: string;
  heading: string;
  body: React.ReactNode;
}

export interface ChatbotPrivacyContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  intro: React.ReactNode;
  sections: ChatbotPrivacySection[];
}

const EMAIL = 'tommasoribaudo1@gmail.com';

const Email = () => <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

export const chatbotPrivacy: ChatbotPrivacyContent = {
  seoTitle: 'Privacy Policy: Chatbot Coastal',
  seoDescription:
    'How Chatbot Coastal, operated by Xelion S.R.L., handles personal data when you talk to its assistant on a business website, WhatsApp, Facebook Messenger or Instagram.',
  heading: 'Privacy Policy: Chatbot Coastal',
  lastUpdatedLabel: 'Last updated',
  lastUpdated: '14 October 2026',
  intro: (
    <>
      This policy explains how personal data is handled when you talk to a Chatbot Coastal assistant on a
      business's website, on its WhatsApp number, on its Facebook Page (Messenger) or on its Instagram account. It
      is written in plain language on purpose.
    </>
  ),
  sections: [
    {
      heading: '1. Who we are',
      body: (
        <>
          <p>
            Chatbot Coastal is operated by <strong>Xelion S.R.L.</strong> ("Xelion", "we", "us"). You can reach us
            about anything in this policy at <Email />.
          </p>
          <p>
            Chatbot Coastal is a chat assistant that businesses ("our clients") add to their own channels. It
            answers visitors' questions using the information published on the client's own website, and it says
            clearly in its first message that it is an AI assistant, not a person.
          </p>
          <p>
            <strong>Our role.</strong> For the conversations you have with a client's assistant, the client (the
            business you are writing to) decides why and how your data is used, and Xelion processes it on the
            client's behalf. For our own client accounts, our systems and the running of the service, Xelion is
            responsible for the data.
          </p>
        </>
      ),
    },
    {
      heading: '2. What data we handle',
      body: (
        <>
          <ul>
            <li>
              <strong>Your messages and the assistant's replies</strong>, kept together as a conversation.
            </li>
            <li>
              <strong>An identifier for you on the channel.</strong> On WhatsApp this is your phone number. On
              Messenger and Instagram it is a number Meta assigns to you for that Page or account (we do not
              receive your profile, friends or contacts). On a website it is a random conversation code created by
              the chat window.
            </li>
            <li>
              <strong>On websites only:</strong> the address of the page you were on when you wrote, and the
              language of the page.
            </li>
            <li>
              <strong>Details you choose to give</strong>, such as a name, email address or phone number, if you
              type them into the conversation or into a contact card the assistant shows.
            </li>
            <li>
              <strong>Voice notes on WhatsApp.</strong> If you send one, it is converted to text so the assistant
              can answer. The conversation keeps the text. Pictures and Messenger or Instagram voice messages are
              not read; the assistant asks you to write instead.
            </li>
            <li>
              <strong>Technical records:</strong> message identifiers, times, whether a reply succeeded or failed,
              and usage counts. The company that hosts the service also processes standard connection data (such as
              your IP address) when you use the website chat window.
            </li>
          </ul>
          <p>
            Please do not send sensitive information (health, payment card numbers, passwords, identity documents)
            in a chat. The assistant does not need it.
          </p>
        </>
      ),
    },
    {
      heading: '3. Why we use it',
      body: (
        <>
          <ul>
            <li>To answer your question, using the client's website information.</li>
            <li>
              To send a copy of the conversation to the business, so its team can follow up. The business receives
              the conversation by email, together with any contact details you left.
            </li>
            <li>
              To show the client how the assistant is doing and which questions it could not answer, and to fix
              mistakes.
            </li>
            <li>To keep the service secure, prevent abuse and respect daily limits per sender.</li>
          </ul>
          <p>
            We do not sell your data, and we do not use your conversations to build advertising profiles. The
            assistant does not make decisions that have legal or similarly significant effects on you.
          </p>
        </>
      ),
    },
    {
      heading: '4. Who receives it',
      body: (
        <>
          <p>We use the following providers to run the service. Each only receives what it needs:</p>
          <ul>
            <li>
              <strong>Meta Platforms</strong> (WhatsApp, Messenger, Instagram): delivers your messages to us and
              our replies to you, under its own terms and privacy policy.
            </li>
            <li>
              <strong>OpenAI</strong>: writes the answer. It receives your message, recent messages of the
              conversation, relevant text from the client's website, and, for WhatsApp voice notes, the audio to be
              transcribed.
            </li>
            <li>
              <strong>Supabase</strong>: stores the conversations and settings in a database.
            </li>
            <li>
              <strong>Vercel</strong>: hosts the service.
            </li>
            <li>
              <strong>Resend</strong>: sends the conversation email to the business.
            </li>
            <li>
              <strong>Sentry</strong>: records technical errors so we can fix them.
            </li>
          </ul>
          <p>
            The client (the business) receives the conversations it is responsible for. We disclose data to
            authorities only when the law requires it.
          </p>
        </>
      ),
    },
    {
      heading: '5. Transfers outside your country',
      body: (
        <>
          Some of these providers are located in, or process data in, the United States or other countries. Where
          the law requires it, transfers rely on safeguards such as the European Commission's standard contractual
          clauses or an adequacy decision.
        </>
      ),
    },
    {
      heading: '6. How long we keep it',
      body: (
        <>
          Conversations are kept for as long as the client uses the assistant, unless they are deleted earlier. They
          are deleted when you ask us to (see section 8), when the client asks us to, or when the client's assistant
          is permanently removed. Technical error and usage records are kept only as long as needed to run and
          improve the service.
        </>
      ),
    },
    {
      heading: '7. Your rights',
      body: (
        <>
          <p>
            Depending on where you live (for example, under the EU and UK GDPR), you can ask for access to your
            data, correction, deletion, restriction or portability, and you can object to its use. You can also
            complain to your data protection authority. To use these rights, write to <Email />. You can also write
            directly to the business whose assistant you spoke with.
          </p>
          <p>
            <strong>Stopping the assistant on WhatsApp:</strong> send the word <strong>STOP</strong> and it will
            stop answering you; send <strong>START</strong> to turn it back on.
          </p>
        </>
      ),
    },
    {
      id: 'data-deletion',
      heading: '8. Data deletion instructions',
      body: (
        <>
          <p>To have your conversation data deleted:</p>
          <ol>
            <li>
              Send an email to <Email /> with the subject "Delete my data".
            </li>
            <li>
              Say which channel you used (WhatsApp, Facebook Messenger, Instagram or a website), the business you
              wrote to, and the phone number (WhatsApp) or the name of your Facebook or Instagram account you wrote
              from, so we can find the conversation. We may ask you to confirm that you are the person concerned.
            </li>
            <li>
              We will delete the matching conversations from our systems and confirm by email, normally within 30
              days.
            </li>
          </ol>
          <p>
            A copy of the conversation may already have been emailed to the business, which then holds it under its
            own responsibility; we will tell you how to ask it to delete its copy.
          </p>
        </>
      ),
    },
    {
      heading: '9. Children',
      body: (
        <>
          The assistant is not directed at children under 16, and we do not knowingly collect their data. If you
          believe a child has written to an assistant, contact us and we will delete the conversation.
        </>
      ),
    },
    {
      heading: '10. Security',
      body: (
        <>
          Access to the service's systems is restricted, connections are encrypted, and access keys are stored
          encrypted. No system is perfectly secure, and we cannot guarantee absolute security.
        </>
      ),
    },
    {
      heading: '11. Changes to this policy',
      body: (
        <>
          We may update this policy. The date at the top shows the latest version, and we will place the new version
          at the same address.
        </>
      ),
    },
    {
      heading: '12. Contact',
      body: (
        <>
          <p>Xelion S.R.L.</p>
          <p>
            Email: <Email />
          </p>
        </>
      ),
    },
  ],
};
