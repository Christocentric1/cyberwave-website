import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// Send contact form email
export const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Submission from ${contactData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #667eea; }
            .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #667eea; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${contactData.name}</div>
              </div>

              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${contactData.email}">${contactData.email}</a></div>
              </div>

              ${contactData.company ? `
              <div class="field">
                <div class="label">Company:</div>
                <div class="value">${contactData.company}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${contactData.message.replace(/\n/g, '<br>')}</div>
              </div>

              <div class="footer">
                <p>Submitted on ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
                ${contactData.ip_address ? `<p>IP Address: ${contactData.ip_address}</p>` : ''}
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}
${contactData.company ? `Company: ${contactData.company}` : ''}

Message:
${contactData.message}

Submitted on ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
${contactData.ip_address ? `IP Address: ${contactData.ip_address}` : ''}
      `.trim()
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    throw error;
  }
};

// Send confirmation email to the user
export const sendConfirmationEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: contactData.email,
      subject: 'Thank you for contacting CyberWave Security',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-top: none; }
            .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px; background: #f0f0f0; }
            .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>CyberWave Security</h1>
            </div>
            <div class="content">
              <h2>Thank you for reaching out!</h2>
              <p>Hi ${contactData.name},</p>
              <p>We've received your message and will get back to you within 24 hours.</p>
              <p>Our team is reviewing your inquiry and will provide you with a detailed response soon.</p>
              <p>In the meantime, feel free to explore our services or give us a call at <strong>+44 (0) 7307101571</strong> if you need immediate assistance.</p>
              <a href="https://cyberwavesecurity.co.uk" class="button">Visit Our Website</a>
            </div>
            <div class="footer">
              <p><strong>CyberWave Security</strong></p>
              <p>Email: info@cyberwavesecurity.co.uk | Phone: +44 (0) 7307101571</p>
              <p>Protecting your digital assets with cutting-edge security solutions</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Thank you for contacting CyberWave Security!

Hi ${contactData.name},

We've received your message and will get back to you within 24 hours.

Our team is reviewing your inquiry and will provide you with a detailed response soon.

In the meantime, feel free to give us a call at +44 (0) 7307101571 if you need immediate assistance.

Best regards,
CyberWave Security Team

Email: info@cyberwavesecurity.co.uk
Phone: +44 (0) 7307101571
Website: https://cyberwavesecurity.co.uk
      `.trim()
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent to:', contactData.email);
  } catch (error) {
    // Don't throw error for confirmation email failures
    console.error('⚠️ Confirmation email failed:', error.message);
  }
};
