const router = require('express').Router();
const path = require('path');
const nodemailer = require('nodemailer');

var smtpTransport = require('nodemailer-smtp-transport');

var mailAccountUser = 'info@moveuphomebuyers.com';
var mailAccountPassword = 'qwotoyvymshzewdd';
var toEmailAddress = 'info@moveuphomebuyers.com';

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/send-email', async (req, res) => {
  const {
    name,
    email,
    phone,
    message
  } = req.body;
  var fromEmail = ` ${email}`;
  contentHTML = `
        <h1>User Information MoveUp</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
            <li>PhoneNumber: ${phone}</li>
            <li>Address: ${message}</li>
        </ul>
    `;

  var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    secure: true,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: mailAccountUser,
      pass: mailAccountPassword
    }
  }))

  var mail = {
    from: fromEmail,
    to: toEmailAddress,
    subject: "MoveUp",
    text: "Contacto",
    html: contentHTML
  }

  transport.sendMail(mail, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + response.message);
    }

    transport.close();
  });
  res.redirect('/');
});

// router.get('/index2', (req, res) => {
//   res.render('index2');
// });


module.exports = router;
