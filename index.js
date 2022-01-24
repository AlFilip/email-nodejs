const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
const port = 3010
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: "gmail",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        user: 't9371100211@gmail.com', // generated ethereal user
        pass: 'plwmmpnbachaioof', // generated ethereal password
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/send', async function (req, res) {
    try {
        const {name, contacts, message} = req.body
        const info = await transporter.sendMail({
            from: '"My Portfolio 👻"', // sender address
            to: "t9371100211@gmail.com", // list of receivers
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