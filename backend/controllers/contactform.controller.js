export const contactFormContoller = async (req, res) => {
    try {
        const { name, email, subject, rating } = req.body;

        // Debug: Log what you're receiving
        console.log('Received data:', req.body);
        console.log('Name:', name, 'Email:', email, 'Subject:', subject);

        // More specific validation with trimming
        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Name is required'
            });
        }

        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        if (!subject || !subject.trim()) {
            return res.status(400).json({
                success: false,
                message: 'subject is required'
            });
        }

        // Rest of your code remains the same...
        const newContact = new Contact({
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            rating: rating ? parseInt(rating) : null
        });

        await newContact.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.SEND_EMAIL,
                pass: process.env.EMAIL_PWD
            }
        });

        const mailOptions = {
            from: process.env.SEND_EMAIL,
            to: process.env.RECEIVE_EMAIL,
            subject: `New Contact Form Submission: ${subject.trim()}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p>You have a new contact form submission:</p>
                <ul>
                    <li><strong>Name:</strong> ${name.trim()}</li>
                    <li><strong>Email:</strong> ${email.trim()}</li>
                    <li><strong>Message:</strong> ${subject.trim()}</li>
                    <li><strong>Rating:</strong> ${rating || 'N/A'}</li>
                </ul>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        res.status(200).json({
            success: true,
            message: 'Contact form submitted successfully!'
        });

    } catch (err) {
        console.error('Error processing contact form:', err.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
}