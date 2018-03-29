const express = require('express')
const nodemailer = require("nodemailer")
const bodyParser = require("body-parser")
const app = express()

const mail_host = process.env.mail_host || 'localhost';
const mail_port = process.env.mail_port || 25;


let transport = nodemailer.createTransport({
    host: mail_host,
    port: mail_port,
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Welcome to node sendmail app! Please post email to /email endpoint.')
})
/**
 * req body should look like 
 * {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
    }
 */
app.post('/email', (req, res) => {
    transport.sendMail(req.body, (error, info) => {
        if (error) {
            return console.error(error);
        }
        res.send("Message sent: " +info.messageId);
    })
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))