import nodemailer from 'nodemailer';

// Create SMTP transporter from environment variables
export function createTransportFromEnv() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error('SMTP is not configured');
  }
  const secure = port === 465;
  return nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
}

// Send contact form email
export async function sendContactEmail({ to, fromEmail, fromName, phone, message }) {
  const transport = createTransportFromEnv();
  const subject = `New contact from ${fromName || fromEmail}`;
  const text = `Name: ${fromName}\nEmail: ${fromEmail}\nPhone: ${phone || '-'}\n\nMessage:\n${message}`;
  await transport.sendMail({
    from: { name: 'Pixel Market', address: process.env.SMTP_FROM || fromEmail },
    to,
    subject,
    text,
  });
}
