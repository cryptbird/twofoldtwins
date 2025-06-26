import nodemailer from 'nodemailer';

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD, // Use App Password, not your regular Gmail password
  },
});

export default async function handler(req, res) {
  console.log('API route called:', req.method);
  console.log('Environment variables:', {
    EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
    EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD ? 'Set' : 'Not set'
  });

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;
    console.log('Received form data:', { name, email, message: message?.substring(0, 50) + '...' });

    if (!name || !email || !message) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'twofoldtwins.inc@gmail.com', // Your receiving email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    };

    console.log('Attempting to send email...');
    // Send email
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      message: 'Failed to send email',
      error: error.message 
    });
  }
} 