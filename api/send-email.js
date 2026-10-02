/**
 * Contact form handler for the twofoldtwins site.
 *
 * This lives in /api (not /pages/api) because the site is a Create React App
 * build, not Next.js: Vercel only picks up serverless functions from the
 * top-level /api directory for non-Next projects.
 *
 * Required environment variables (set them in the Vercel project settings and
 * in a local .env for `vercel dev`):
 *   EMAIL_USER          - the Gmail address that sends the mail
 *   EMAIL_APP_PASSWORD  - a Gmail App Password (not the account password)
 * Optional overrides:
 *   CONTACT_TO_KHUSH        - default khushvardhanbhardwaj@gmail.com
 *   CONTACT_TO_TWOFOLDTWINS - default twofoldtwins.inc@gmail.com
 */
const nodemailer = require('nodemailer');

const KHUSH_INBOX = process.env.CONTACT_TO_KHUSH || 'khushvardhanbhardwaj@gmail.com';
const TWOFOLDTWINS_INBOX = process.env.CONTACT_TO_TWOFOLDTWINS || 'twofoldtwins.inc@gmail.com';

// Which inbox a submission goes to, keyed by the `source` field the form sends.
const ROUTES = {
  khush: { to: KHUSH_INBOX, label: 'khush portfolio' },
  twofoldtwins: { to: TWOFOLDTWINS_INBOX, cc: KHUSH_INBOX, label: 'twofoldtwins.in' },
};

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.error('Mail credentials missing: set EMAIL_USER and EMAIL_APP_PASSWORD.');
    return res.status(500).json({
      message: 'Email is not configured on the server yet. Please reach out directly instead.',
    });
  }

  // Vercel parses JSON bodies for us, but guard against a raw string body.
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ message: 'Invalid JSON body' });
    }
  }

  const { name, email, message, source } = body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address' });
  }

  const route = ROUTES[source] || ROUTES.khush;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      // Gmail requires the authenticated account in `from`; the visitor's
      // address goes in replyTo so hitting reply answers them directly.
      from: `"${String(name).slice(0, 70)} (via ${route.label})" <${process.env.EMAIL_USER}>`,
      to: route.to,
      cc: route.cc,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSource: ${route.label}\n\n${message}`,
      html: `
        <h3>New contact form submission</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Source:</strong> ${escapeHtml(route.label)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
};
