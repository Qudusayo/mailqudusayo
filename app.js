const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

//View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Static folders
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.render('layouts/main');
})

app.post('/send', (req, res) => {
    name = req.body.name;
    subject = req.body.subject;
    email = req.body.email;
    message = req.body.message;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'chatqudusayo@gmail.com',
          pass: 'ppaassww00rrdd.'
        },
        tls:{
            rejectUnauthorized: false
        }
    });
            
    var mailOptions = {
        from: 'qqudusayo@gmail.com',
        to: 'qqudusayo@gmail.com',
        subject: `${subject}`,
        html: `<h1 style="text-align: center;">Welcome: ${name}</h1><p style="text-align:center; ">${message}</p><br><p>From ${email}</p>`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.render('layouts/main', {msg: 'Email has been sent'})
        }
    });      

});

app.listen(8000, () => console.log('Server Started'))