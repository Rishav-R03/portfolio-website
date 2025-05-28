import nodemailer from 'nodemailer'
export const contactFormContoller = async (req, res) => {
    try {
        const { name, email, message, rating } = req.body;
        // 1. save to mongodb
        const newContact = new Contact({ name, email, message, rating });
        await newContact.save();
        res.status(200).json({
            success: true,
            message: 'Form sent successfully'
        });
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.SEND_EMAIL,
                pass: process.env.EMAIL_PWD
            }
        });
        // 2. setting up mail 
        const mailOptions = {
            from: process.env.SEND_EMAIL, // sender's add
            to: process.env.RECEIVE_EMAIL, // my email 
            subject: `New Contact Form Submission: ${message || 'No Subject'}`,
            html: `
                <p>You have a new contact form submission from your portfolio:</p>
                <ul>
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Subject:</strong> ${subject || 'N/A'}</li>
                    <li><strong>Message:</strong> ${message || 'N/A'}</li>
                </ul>
            `
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
        res.status(200).json({ message: 'Message sent successfully!' });

    } catch (err) {
        console.error('Error processing contact form:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
}