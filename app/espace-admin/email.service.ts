import { Injectable } from '@angular/core';
import * as nodemailer from 'nodemailer';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // Configuration du service SMTP
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@example.com',
        pass: 'your-password'
      }
    });
  }

  sendAccountActivatedEmail(email: string): void {
    const mailOptions = {
      from: 'your-email@example.com',
      to: email,
      subject: 'Votre compte a été activé',
      text: 'Votre compte a été activé avec succès. Vous pouvez maintenant vous connecter.'
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending account activation email:', error);
      } else {
        console.log('Account activation email sent:', info.response);
      }
    });
  }
}
