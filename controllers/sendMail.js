const nodemailer = require("nodemailer");
const { response } = require('express');

const sendMail = async (req, res = response) => {

    const { name, email, msj } = req.body;

    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER, 
                pass: process.env.GMAIL_PASS, 
            },
        });

        await transporter.sendMail({
            from: 'yo',
            to: process.env.GMAIL_USER,
            subject: `PORTFOLIO: ${name}`,
            html: `
            Nombre: ${name} ... <br>
            Contacto: ${email} ... <br>
            Mensaje: ${msj}
            ` 
        });

        res.json({
            status: 'Email enviado'
        });

    } catch (error) {
        console.log(error) 
        return res.status(500).json({
            status: 'Email no enviado. Hable con el administrador.' 
        })
    }
}

module.exports = sendMail;