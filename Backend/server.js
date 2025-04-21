import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
const port = process.env.PORTT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PAS,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nSubject: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <h1><strong>From:</strong> ${name} </h1> <h3>${subject}</h3> <p>(${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email : ", error);
    res.status(500).json({ success: false, message: "Error sending message" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
