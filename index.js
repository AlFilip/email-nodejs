const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 3010
const user = process.env.SMTP_LOGIN
const pass = process.env.SMTP_PASS
const recipient = process.env.SMTP_TO


let transporter = nodemailer.createTransport({
    service: "gmail",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        user, // generated ethereal user
        pass, // generated ethereal password
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/send', async function (req, res) {
    try {
        const {name, contacts, message} = req.body
        await transporter.sendMail({
            from: '"My Portfolio 👻"', // sender address
            to: recipient, // list of receivers
            subject: "Message from portfolio", // Subject line
            text: 'req.body.message', // plain text body
            html: ` <div>
                    <h2>Имя отправителя: ${name}</h2>
                    <div><span>Текст Сообщения: <br> </span> ${message}</div>
                    <hr/>
                    <div style="margin-top: 20px">Контакты отправителя: ${contacts}</div>
                </div>`, // html body
        });
        res.send({messageStatus: 'OK'})
    } catch (e) {
        res.send(e)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})