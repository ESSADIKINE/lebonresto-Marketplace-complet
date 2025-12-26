import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor(private readonly configService: ConfigService) {
        const host = this.configService.get('SMTP_HOST');
        const port = Number(this.configService.get('SMTP_PORT'));
        let secure = this.configService.get('SMTP_SECURE') === 'true';

        // Auto-fix secure based on standard ports if variable is potentially wrong
        if (port === 465) secure = true;
        if (port === 587) secure = false;

        const user = this.configService.get('SMTP_USER');


        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: {
                user,
                pass: this.configService.get('SMTP_PASS'),
            },
        });
    }

    async sendOtp(to: string, otp: string, purpose: string = 'Verification') {
        const subject = `Your OTP for ${purpose}`;
        const text = `Your OTP is: ${otp}`;
        const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>${subject}</h2>
        <p>Your OTP code is: <strong>${otp}</strong></p>
        <p>It will expire in 10 minutes.</p>
      </div>`;

        try {
            await this.transporter.sendMail({
                from: `"Lebonresto" <${this.configService.get('SMTP_USER')}>`,
                to,
                subject,
                text,
                html,
            });
            console.log(`[EmailService] Email sent to ${to}`);
        } catch (error: any) {
            if (error.responseCode === 535) {
                console.error(`[EmailService] 🛑 AUTH ERROR: Gmail requires an APP PASSWORD, not your login password.`);
                console.error(`[EmailService] 👉 Generate one here: https://myaccount.google.com/apppasswords`);
            } else {
                console.error('[EmailService] Error sending email:', error);
            }
            throw error;
        }
    }
}
