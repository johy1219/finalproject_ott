const nodemailer = require('nodemailer');
const smtpTransport = nodemailer.createTransport(
    {
        service: "Gmail", auth: { user:"yl1033371@gmail.com",pass:"yelim5345"},
        tls: {rejectauthorized: false} }
);
module.exports = smtpTransport;