

import nodemailer from "nodemailer"

export const sendEmail= async(req,res)=>{
    const { name, email, message } = req.body;


    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'sanjeevpatel3007@gmail.com', // Your Gmail address
            pass: 'Indramani1@' // Your Gmail password
          }
        });
    
        // Send mail with defined transport object
        const info = await transporter.sendMail({
          from: `"${name}" <${email}>`, // Sender address
          to: 'recipient@example.com', // List of recipients
          subject: 'New Contact Form Submission', // Subject line
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text body
          html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>` // HTML body
        });
    
        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' });
      }


}