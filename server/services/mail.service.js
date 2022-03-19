const mailer = require('nodemailer')

class MailService{

    constructor(){
        this.transporter = mailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }

    async sendActivationMail({email, code}) {
        
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Email activation Auth', 
            text: '',
            html: `
                <div>
                    <h1>Activation Link Bellow</h1>
                    <h2>${code}</h2>
                </div>
            `
        }) 
    }

}

module.exports = new MailService()