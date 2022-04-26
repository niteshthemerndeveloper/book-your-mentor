const nodemailer = require('nodemailer');
const config = require('config');

const sendEmail = async (email, name, subject, resetLink) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.get('HOST'),
      port: 587,
      secure: false, // default
      auth: {
        user: config.get('USER'),
        pass: config.get('PASS'),
      },
    });
    console.log(resetLink);

    await transporter.sendMail({
      from: config.get('USER'),
      to: email,
      subject: subject,
      text: resetLink,
      html: `
      Hi ${name},
      <br>
      <br>
      Please use the below link to reset your password.
      <br>
      ${resetLink}
      <br>
      <br>
      Best Regards,
      <br>
      Nitesh!
      `,
    });

    console.log('Email sent Successfully...');
  } catch (err) {
    console.error(err, 'Email not send');
  }
};

module.exports = sendEmail;
