const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'reservation.av.calendar@gmail.com',
    pass: 'SgfAvailability2021#',
  },
});
exports.transporter = transporter;
