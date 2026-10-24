import nodemailer from 'nodemailer';
import 'dotenv/config'; // Loads your variables from .env
import crypto from 'crypto';
import { Invitation } from '../models/Invitation.js'; // Paths to your models


export const sendEmail = async (req, res) => {
    console.log(req.body)
    // Generate secure 64-character token string
    const token = crypto.randomBytes(32).toString('hex');
    const { email, permission } = req.body;
    // Save invitation metadata to MongoDB
    await Invitation.create({
      todoId: req.params.id,
      recipientEmail: email,
      permission: 'edit',
      token: token
    });

    // 1. Create a transporter object using Gmail SMTP configuration
    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, 
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // Your 16-character App Password
    },
    });

    // 2. Define the email options
    const mailOptions = {
    from: `"ToDo App" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER, // List of receivers
    subject: 'Hello from Node.js & Gmail SMTP! ✔',
    text: 'This is a plain text email sent using Nodemailer.', 
    html: `<div style="font-family: sans-serif; padding: 20px;">
          <h3>You have been invited to ${permission} a To-Do list item!</h3>
          <p>Click one of the actions below to respond:</p>
          <br/>
          <a href="http://localhost:3000/api/share/respond?token=${token}&action=accept" 
             style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-right: 10px;">
            Accept & Join
          </a>
          <a href="http://localhost:3000/api/share/respond?token=${token}&action=decline" 
             style="background: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
            Decline
          </a>
        </div>`
    };

    // 3. Send the email
    async function sendMail() {
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Message sent successfully! 🚀');
            console.log('Message ID:', info.messageId);
            res.status(201).json({message: "Invitation email successfully sent!"});
        } catch (error) {
            console.error('Error occurred while sending email:', error);
            res.status(500).json({ message: error.message || error });
        }
    }
    sendMail();
};

export const handleResponse = async (req, res) => {
    try {
    const { token, action } = req.query;

    // 1. Locate the token document inside MongoDB
    const invite = await Invitation.findOne({ token, status: 'pending' });
    if (!invite) {
      return res.status(400).send('<h1>Link expired or already processed.</h1>');
    }

    if (action === 'decline') {
      invite.status = 'declined';
      await invite.save();
      return res.send('<h1>You have successfully declined the invitation.</h1>');
    }

    if (action === 'accept') {
      // 💡 Assumption: The target user is logged into your platform. 
      // You should grab their active user account database ID from req.user
      const loggedInUserId = req.user?._id; 
      
      if (!loggedInUserId) {
        // Alternative approach: If not logged in, forward them to your login/register page first
        return res.redirect(`/login?redirectTo=/api/invitations/respond?token=${token}&action=accept`);
      }

      // Update To-Do Access Permissions Arrays dynamically inside MongoDB
      const updateField = invite.permission === 'edit' 
        ? { $addToSet: { shared_with: loggedInUserId } } 
        : { $addToSet: { shared_with: loggedInUserId } };

      await Todo.findByIdAndUpdate(invite.todoId, updateField);

      // Finalize token lifecycle state
      invite.status = 'accepted';
      await invite.save();

      // Send them to their main home UI workspace panel
      return res.redirect('/welcome');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}